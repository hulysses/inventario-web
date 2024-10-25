import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { InputField } from "@/types/Field";
import { SheetProps } from "@/types/SheetProps";
import {
    Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger
} from "@/components/ui/sheet";

const createValidationSchema = (fields: InputField[]) => {
    const schemaObject: Record<string, any> = {};
    fields.forEach((field) => {
        schemaObject[field.name] = z.string().nonempty(`O campo ${field.label} é obrigatório.`);
    });
    return z.object(schemaObject);
};

const handleSubmit = async (data: Record<string, string>) => {
    console.log("Dados submetidos:", data);
};

export function Sheets({ buttonText, text, title, fields }: SheetProps) {
    const validationSchema = createValidationSchema(fields);
    const form = useForm({
        resolver: zodResolver(validationSchema),
        defaultValues: fields.reduce((acc, field) => {
            acc[field.name] = '';
            return acc;
        }, {} as Record<string, string>)
    });

    return (
        <Sheet>
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
                    <Button className="justify-start w-full bg-inherit shadow-none text-black relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0">
                        {text}
                    </Button>
                </SheetTrigger>
            )}
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-4">
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
    )
}