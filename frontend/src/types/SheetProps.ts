import { InputField } from "./Field";

export interface SheetProps {
    buttonText?: string,
    text?: string,
    title: string,
    fields: InputField[],
    apiEndpoint?: string,
    onDialogOpen: (isOpen: boolean) => void,
    onCadastroSucesso: (sucesso: boolean) => void
}