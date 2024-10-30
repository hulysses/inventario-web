import axios from 'axios';
import { User } from '@/types/User';
import { useEffect, useState } from 'react';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<number | null>(null);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

    const fields = [
        { name: 'nome', label: 'Nome', type: 'text', placeholder: 'Digite o nome' },
        { name: 'email', label: 'E-mail', type: 'text', placeholder: 'Digite o e-mail' },
        { name: 'senha', label: 'Senha', type: 'text', placeholder: 'Digite a senha' },
        {
            name: 'isAdmin', label: 'É administrador?', type: 'radio', options: [
                { value: '1', label: 'Sim' },
                { value: '0', label: 'Não' }
            ]
        }
    ];

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setIsSheetOpen(true);
    };

    const handleCreate = () => {
        setEditingUser(null);
        setIsSheetOpen(true);
    };

    const deleteUser = async () => {
        if (userToDelete === null) return;

        try {
            await axios.delete(`http://localhost:3000/users?id=${userToDelete}`);
            fetchUsers();
            return true;
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            return false;
        } finally {
            setIsConfirmDialogOpen(false);
            setUserToDelete(null);
        }
    };

    const confirmDelete = (userId: number) => {
        setUserToDelete(userId);
        setIsConfirmDialogOpen(true);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return {
        users,
        editingUser,
        fields,
        fetchUsers,
        handleCreate,
        handleEdit,
        deleteUser,
        confirmDelete,
        isSheetOpen,
        isConfirmDialogOpen,
        setIsConfirmDialogOpen,
        setIsSheetOpen
    }
}