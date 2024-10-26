import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { InputField } from "@/types/Field";
import { SheetProps } from "@/types/SheetProps";
import { zodResolver } from "@hookform/resolvers/zod";
import { validarCNPJ } from '@/helpers/registerHelper';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const createCNPJSchema = () => z.string().refine(validarCNPJ, {
    message: "CNPJ inválido",
});

const createFormSchema = (fields: InputField[]) => {
    const schemaObject: Record<string, z.ZodTypeAny> = {};

    fields.forEach((field) => {
        schemaObject[field.name] = field.name === 'cnpj' ? createCNPJSchema() : z.string().nonempty(`O campo ${field.label} é obrigatório.`);
    });

    return z.object(schemaObject);
};

const submitFormData = async (
    apiEndpoint: string,
    data: any,
    form: any,
    setSheetOpen: any,
    onDialogOpen: any,
    onCadastroSucesso: any
) => {
    try {
        await axios.post(apiEndpoint, data);
        setSheetOpen(false);
        form.reset();

        onDialogOpen(true);
        onCadastroSucesso(true);
    } catch (error: any) {
        setSheetOpen(true);
        onDialogOpen(true);
        onCadastroSucesso(false);
        console.error('Erro na requisição:', error.response ? error.response.data : error.message);
    }
};

export function Sheets({
    buttonText,
    text,
    title,
    fields,
    apiEndpoint,
    initialData = {},
    onDialogOpen = () => { },
    onCadastroSucesso = () => { }
}: SheetProps) {
    const [sheetOpen, setSheetOpen] = useState(false);
    const validationSchema = createFormSchema(fields);

    const form = useForm({
        resolver: zodResolver(validationSchema),
        defaultValues: fields.reduce((acc, field) => {
            acc[field.name] = initialData[field.name] || '';
            return acc;
        }, {} as Record<string, string>)
    });

    return (
        <div>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                {buttonText && (
                    <SheetTrigger asChild>
                        <Button className="bg-orange hover:bg-orangeHover text-white font-semibold mx-auto">
                            <Plus className="w-5 mr-1" />
                            {buttonText}
                        </Button>
                    </SheetTrigger>
                )}
                {text && (
                    <SheetTrigger asChild>
                        <Button
                            className="justify-start w-full bg-inherit shadow-none text-black relative flex cursor-default 
                                select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors 
                                hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none 
                                data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0">
                            {text}
                        </Button>
                    </SheetTrigger>
                )}
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>{title}</SheetTitle>
                    </SheetHeader>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(data => submitFormData(apiEndpoint as string, data, form, setSheetOpen, onDialogOpen, onCadastroSucesso))} className="space-y-4 mt-4">
                            {fields.map((field, index) => (
                                <FormField
                                    key={index}
                                    control={form.control}
                                    name={field.name}
                                    render={({ field: formField }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold">{field.label}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...formField}
                                                    type={field.type}
                                                    placeholder={field.placeholder}
                                                    className="border"
                                                    maxLength={field.length}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                            <Button type="submit" className="bg-orange hover:bg-orangeHover w-full font-semibold">
                                Cadastrar
                            </Button>
                        </form>
                    </Form>
                </SheetContent>
            </Sheet>
        </div>
    )
}