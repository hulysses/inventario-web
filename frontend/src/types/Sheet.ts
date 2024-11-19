import { InputField } from "./Field";

export interface SheetProps {
    title: string,
    fields: InputField[],
    initialData?: Partial<any>,
    apiEndpoint?: string,
    method?: 'post' | 'put',
    open: boolean,
    onOpenChange: (open: boolean) => void,
    onSuccess: () => void,
    selectOptions?: {
        clientOptions: { value: string; label: string }[];
        supplierOptions: { value: string; label: string }[];
    };
}