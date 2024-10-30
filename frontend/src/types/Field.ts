export interface InputField {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    length?: number;
    options?: { value: number; label: string }[];
}