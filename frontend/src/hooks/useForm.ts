import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import * as z from 'zod';
import { validarCNPJ } from '@/helpers/registerHelper';
import { InputField } from "@/types/Field";

export const useFormData = (
    fields: InputField[], 
    initialData: Record<string, string>, 
    apiEndpoint: string, 
    method: 'post' | 'put', 
    onDialogOpen: (open: boolean) => void, 
    onCadastroSucesso: (sucesso: boolean) => void
) => {
    const [sheetOpen, setSheetOpen] = useState(false); 

    const createCNPJSchema = () => z.string().refine(validarCNPJ, {
        message: "CNPJ inválido",
    });

    const createFormSchema = () => {
        const schemaObject: Record<string, z.ZodTypeAny> = {};
        fields.forEach((field) => {
            schemaObject[field.name] = field.name === 'cnpj' ? createCNPJSchema() : z.string().nonempty(`O campo ${field.label} é obrigatório.`);
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
            method === 'post' ? await axios.post(apiEndpoint, data) : await axios.put(apiEndpoint, data);
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

    return { form, submitFormData, sheetOpen, setSheetOpen };
};