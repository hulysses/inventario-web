export interface InputField {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    length?: number;
    options?: { value: string; label: string }[];
}