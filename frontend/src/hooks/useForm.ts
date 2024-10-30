import * as z from 'zod';
import axios from "axios";
import { toast } from "sonner";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputField } from "@/types/Field";
import { zodResolver } from "@hookform/resolvers/zod";
import { validarCNPJ } from '@/helpers/registerHelper';

export const useFormData = (
    fields: InputField[],
    initialData: Record<string, string>,
    apiEndpoint: string,
    method: 'post' | 'put',
    onSuccess?: () => void
) => {
    const createCNPJSchema = () => z.string().refine(validarCNPJ, {
        message: "CNPJ inválido",
    });

    const createFormSchema = () => {
        const schemaObject: Record<string, z.ZodTypeAny> = {};
        fields.forEach((field) => {
            if (field.name === 'cnpj') {
                schemaObject[field.name] = createCNPJSchema();
            } else if (field.name === 'isAdmin') {
                schemaObject[field.name] = z
                    .number()
                    .transform((value) => value.toString())
            } else {
                schemaObject[field.name] = z.string().nonempty(`O campo ${field.label} é obrigatório.`);
            }
        });
        return z.object(schemaObject);
    };

    const validationSchema = createFormSchema();

    const form = useForm({
        resolver: zodResolver(validationSchema),
        defaultValues: fields.reduce((acc, field) => {
            acc[field.name] = initialData[field.name] || '';
            return acc;
        }, {} as Record<string, string>)
    });

    useEffect(() => {
        if (initialData) {
            Object.keys(initialData).forEach((key) => {
                form.setValue(key, initialData[key]);
            });
        }
    }, [initialData, form]);

    const submitFormData = async (data: any) => {
        try {
            const response = method === 'post' ? await axios.post(apiEndpoint, data) : await axios.put(apiEndpoint, data);
            form.reset();
            onSuccess && onSuccess();
            toast(response.data.message);
        } catch (error: any) {
            toast(error.response.data.message);
            console.error('Erro na requisição:', error.response ? error.response.data : error.message);
        }
    };

    const resetForm = () => {
        form.reset(fields.reduce((acc, field) => {
            acc[field.name] = '';
            return acc;
        }, {} as Record<string, string>));
    };

    return { form, submitFormData, resetForm };
};