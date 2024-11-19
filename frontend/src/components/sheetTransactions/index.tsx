import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SheetProps } from "@/types/Sheet";
import { useFormData } from '@/hooks/useForm';
import { useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const cashOptions = [
    { value: "entrada", label: "Entrada" },
    { value: 'saida', label: "Saída" }
]

export function Sheets({
    title,
    fields,
    apiEndpoint,
    method,
    initialData = {},
    open,
    onOpenChange,
    onSuccess,
    selectOptions,
}: SheetProps) {

    const { form, submitFormData, resetForm } = useFormData(
        fields,
        initialData,
        apiEndpoint as string,
        method as 'post' | 'put',
        onSuccess
    );

    console.log(selectOptions)

    useEffect(() => {
        if (open && initialData) {
            Object.keys(initialData).forEach((key) => {
                form.setValue(key, initialData[key]);
            });
        }
    }, [open, initialData, form]);

    const handleSheetOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            resetForm();
        }
        onOpenChange(isOpen);
    };

    return (
        <Sheet open={open} onOpenChange={handleSheetOpenChange}>
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
                                            {field.type === 'radio' ? (
                                                <RadioGroup
                                                    onValueChange={formField.onChange}
                                                    value={formField.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    {field.options?.map((option) => (
                                                        <FormItem className="flex items-center space-x-3 space-y-0" key={option.value}>
                                                            <FormControl>
                                                                <RadioGroupItem value={option.value.toString()} />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                {option.label}
                                                            </FormLabel>
                                                        </FormItem>
                                                    ))}
                                                </RadioGroup>
                                            ) : field.type === 'select' ? (
                                                <Select
                                                    {...formField}
                                                    onValueChange={(value) => formField.onChange(value)}
                                                    value={formField.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            placeholder={field.placeholder}
                                                        ></SelectValue>
                                                    </SelectTrigger>

                                                    <SelectContent>
                                                        {field.name === 'transaction_type' ? (
                                                            cashOptions.map((option) => (
                                                                <SelectItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </SelectItem>
                                                            ))
                                                        ) : (
                                                            field.name === 'clientId' ? (
                                                                selectOptions?.clientOptions.map((option) => (
                                                                    <SelectItem key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </SelectItem>
                                                                ))
                                                            ) : field.name === 'supplierId' ? (
                                                                selectOptions?.supplierOptions.map((option) => (
                                                                    <SelectItem key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </SelectItem>
                                                                ))
                                                            ) : (
                                                                <SelectItem key="none" value="none">Nenhuma opção disponível</SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            ) : field.type === 'data' ? (
                                                <Input
                                                    {...formField}
                                                    type="date"
                                                    placeholder={field.placeholder}
                                                    className="border"
                                                />
                                            ) : (
                                                <Input
                                                    {...formField}
                                                    type={field.type}
                                                    placeholder={field.placeholder}
                                                    className="border"
                                                    maxLength={field.length}
                                                />
                                            )}
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
