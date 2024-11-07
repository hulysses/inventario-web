import * as z from 'zod';
import axios from "axios";
import { toast } from "sonner";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputField } from "@/types/Field";
import { zodResolver } from "@hookform/resolvers/zod";
import { validarCNPJ, identificarCpfCnpj, validarEmail, isValidImageUrl } from '@/helpers/registerHelper';

export const useFormData = (
    fields: InputField[],
    initialData: Record<string, string>,
    apiEndpoint: string,
    method: 'post' | 'put',
    onSuccess?: () => void
) => {

    // Função para criar validação dos campos
    const createFormSchema = () => {
        const schemaObject: Record<string, z.ZodTypeAny> = {};
        fields.forEach((field) => {
            switch (field.name) {
                case 'cnpj':
                    schemaObject[field.name] = z.string().refine(validarCNPJ, { message: "CNPJ inválido" });
                    break;
                case 'cpf_cnpj':
                    schemaObject[field.name] = z.string().refine(identificarCpfCnpj, { message: "CPF/CNPJ inválido" });
                    break;
                case 'email':
                    schemaObject[field.name] = z.string().refine(validarEmail, { message: "E-mail inválido" });
                    break;
                case 'isAdmin':
                    schemaObject[field.name] = z.number().transform((value) => value.toString())
                    break;
                case 'endereco':
                    schemaObject[field.name] = z.string();
                    break;
                case 'imagem':
                    schemaObject[field.name] = z.string().refine(async (url) => await isValidImageUrl(url), { message: "A URL não é uma imagem válida." });;
                    break;
                default:
                    schemaObject[field.name] = z.string().nonempty(`O campo ${field.label} é obrigatório.`);
            }
        });
        return z.object(schemaObject);
    };

    // Função para criar o formulário
    const form = useForm({
        resolver: zodResolver(createFormSchema()),
        defaultValues: fields.reduce((acc, field) => {
            acc[field.name] = initialData[field.name] || '';
            return acc;
        }, {} as Record<string, string>)
    });

    //Hook para definir valores iniciais dos campos 
    useEffect(() => {
        if (initialData) {
            Object.keys(initialData).forEach((key) => {
                form.setValue(key, initialData[key]);
            });
        }
    }, [initialData, form]);

    // Função para submeter os dados do formulário ao backend
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

    //Funçaão para resetar os dados  do formulário
    const resetForm = () => {
        form.reset(fields.reduce((acc, field) => {
            acc[field.name] = '';
            return acc;
        }, {} as Record<string, string>));
    };

    return { form, submitFormData, resetForm };
};