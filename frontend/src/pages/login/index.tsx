import Logo from '../../assets/logo/logo.svg';

export const Login = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <img className="w-48 mb-5" src={Logo} alt="Logo Khiv" />
            <div className="bg-white p-7 rounded-sm shadow-md w-96">
                <h2 className="text-2xl font-bold text-blue-900">Login</h2>
                <p className="text-sm text-gray-500 mb-6">Digite seus dados de acesso</p>
            </div>
        </main>
    );
}
