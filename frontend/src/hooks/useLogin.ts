import * as z from 'zod';
import axios from 'axios';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

//Esquema  de validacao dos dados e campos formulário
const formSchema = z.object({
    emailAddress: z.string()
        .nonempty("O campo e-mail é obrigatório.")
        .email("Por favor, insira um e-mail válido."),
    password: z.string()
        .nonempty("O campo senha é obrigatório.")
});

export const useLoginForm = (
    setIsLoggedIn: (loggedIn: boolean) => void, // Função para atualizar o estado de login
    navigate: (path: string) => void, 
    setIsAdmin: (isAdmin: boolean) => void      // Função para atualizar o estado de administrador
) => {
    // Inicializa o formulario com o esquema de validacao
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailAddress: '',
            password: ''
        }
    });

    // Funcao para lidar com a submissao do formulario
    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            // Realiza a requisicao POST para o endpoint de login
            const response = await axios.post('http://localhost:3000/', {
                email: data.emailAddress,
                password: data.password
            });

            const { user } = response.data;

            // Armazena o token de autenticação e a informação de administrador no localStorage
            localStorage.setItem('authToken', user.id);
            localStorage.setItem('isAdmin', JSON.stringify(user.isAdmin));

            setIsLoggedIn(true);
            setIsAdmin(user.isAdmin);
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
