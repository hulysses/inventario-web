// hooks/useLoginForm.ts
import axios from 'axios';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
    emailAddress: z.string()
        .nonempty("O campo e-mail é obrigatório.")
        .email("Por favor, insira um e-mail válido."),
    password: z.string()
        .nonempty("O campo senha é obrigatório.")
});

export const useLoginForm = (setIsLoggedIn: (loggedIn: boolean) => void, navigate: (path: string) => void) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailAddress: '',
            password: ''
        }
    });

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post('http://localhost:3000/', {
                email: data.emailAddress,
                password: data.password
            });

            const { user } = response.data;
            localStorage.setItem('authToken', user.id);
            localStorage.setItem('user', user);
            setIsLoggedIn(true);
            navigate('/home');
        } catch (error: any) {
            if (error.response) {
                toast.error('Usuário ou senha inválidos.');
            } else {
                toast.error('Erro na conexão. Tente novamente mais tarde.');
            }
        }
    };

    return { form, handleSubmit };
};
