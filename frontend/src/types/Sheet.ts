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
        [key: number]: Array<{ value: number, label: string }>;
    },
}