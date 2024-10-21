import Logo from '../../assets/logo/logo.svg';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slice/userSlice';
import axios from 'axios';

const formSchema = z.object({
    emailAdress: z.string()
        .nonempty("O campo e-mail é obrigatório.")
        .email("Por favor, insira um e-mail válido."),
    password: z.string()
        .nonempty("O campo senha é obrigatório.")
});

export const Login = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailAdress: '',
            password: ''
        }
    });

    const dispatch = useDispatch();

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post('http://localhost:3000/', {
                email: data.emailAdress,
                password: data.password
            });

            if (response) {
                console.log(response);
                console.log(response.data)

                dispatch(login({ email: data.emailAdress }));
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-5 sm:p-10 md:p-24">
            <img className="w-32 sm:w-40 md:w-48 mb-5" src={Logo} alt="Logo Khiv" />
            <div className="bg-white p-7 rounded-sm shadow-md w-full max-w-400">
                <h2 className="text-2xl font-bold text-blue-900">Login</h2>
                <p className="text-sm text-gray-500 mb-5">Digite seus dados de acesso</p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="w-full">
                        <FormField
                            control={form.control}
                            name="emailAdress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold">E-mail</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="bg-whiteF"
                                            placeholder="Digite seu e-mail"
                                            type="email" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormLabel className="font-bold">Senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="bg-whiteF"
                                            placeholder="Digite sua senha"
                                            type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="bg-orange hover:bg-orangeHover font-bold w-full mt-5">
                            Entrar
                        </Button>
                    </form>
                </Form>
            </div>
        </main>
    );
};