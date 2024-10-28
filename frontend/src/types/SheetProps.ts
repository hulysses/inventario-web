import { InputField } from "./Field";

export interface SheetProps {
    title: string,
    fields: InputField[],
    initialData?: Partial<any>,
    apiEndpoint?: string,
    method?: 'post' | 'put',
    onDialogOpen?: (isOpen: boolean) => void,
    onCadastroSucesso?: (sucesso: boolean) => void,
    open: boolean,
    onOpenChange: (open: boolean) => void
}