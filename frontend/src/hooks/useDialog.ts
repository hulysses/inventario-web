import { useState } from 'react';

export const useDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cadastroSucesso, setCadastroSucesso] = useState(false);

  const handleDialogOpen = (isOpen: boolean) => {
    setDialogOpen(isOpen);
  };

  const handleCadastroSucesso = (sucesso: boolean, fetchSuppliers: () => void) => {
    setCadastroSucesso(sucesso);
    if (sucesso) {
      fetchSuppliers();
    }
  };

  return {
    dialogOpen,
    setDialogOpen,
    cadastroSucesso,
    handleDialogOpen,
    handleCadastroSucesso,
  };
};
