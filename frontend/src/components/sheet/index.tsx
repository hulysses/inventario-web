import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SheetProps } from "@/types/SheetProps";
import { useFormData } from '@/hooks/useForm';
import { useEffect } from 'react';

export function Sheets({
    title,
    fields,
    apiEndpoint,
    method,
    initialData = {},
    onDialogOpen = () => { },
    onCadastroSucesso = () => { },
    open,
    onOpenChange
}: SheetProps) {
    const { form, submitFormData } = useFormData(
        fields, 
        initialData, 
        apiEndpoint as string, 
        method as 'post' | 'put',
        onDialogOpen, 
        onCadastroSucesso
    );

    useEffect(() => {
        if (open && initialData) {
            Object.keys(initialData).forEach((key) => {
                form.setValue(key, initialData[key]);
            });
        }
    }, [open, initialData, form]);

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                </SheetHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(submitFormData)} 
                        className="space-y-4 mt-4">
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
                            {method === 'put' ? 'Atualizar' : 'Cadastrar'}
                        </Button>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
}