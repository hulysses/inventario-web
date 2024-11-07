import { useEffect, useState } from 'react';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SheetProps } from "@/types/Sheet";
import { useFormData } from '@/hooks/useForm';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export function Sheets({
    title,
    fields,
    apiEndpoint,
    method,
    initialData = {},
    open,
    onOpenChange,
    onSuccess
}: SheetProps) {
    const { form, submitFormData, resetForm } = useFormData(
        fields,
        initialData,
        apiEndpoint as string,
        method as 'post' | 'put',
        onSuccess
    );

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

    const [searchTerm, setSearchTerm] = useState('');

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
                                                    <SelectTrigger className='flex h-10 w-full rounded-sm px-3 py-1  focus:outline-none'>
                                                        <SelectValue placeholder={field.placeholder} ></SelectValue>
                                                    </SelectTrigger>
                                                    <SelectContent className=''>
                                                        <div>
                                                            <Input
                                                                placeholder="Pesquisar..."
                                                                value={searchTerm}
                                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                                className="border mb-1 flex h-10 w-full rounded-sm px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline-none"
                                                            />
                                                        </div>
                                                        {field.selectOptions
                                                            ?.filter(option =>
                                                                option.label.toLowerCase().includes(searchTerm.toLowerCase())
                                                            )
                                                            .map((option) => (
                                                                <SelectItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </SelectItem>
                                                            ))}
                                                    </SelectContent>
                                                </Select>
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
