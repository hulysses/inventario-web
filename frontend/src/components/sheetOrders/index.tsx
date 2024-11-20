import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SheetProps } from "@/types/Sheet";
import { useFormData } from "@/hooks/useForm";
import { useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statusOptions = [
  { value: "pendente", label: "Pendente" },
  { value: "concluido", label: "Concluído" },
];

export function Sheets({
  title,
  fields,
  apiEndpoint,
  method,
  initialData = {},
  open,
  onOpenChange,
  onSuccess,
  selectOptions,
}: SheetProps) {
  const { form, submitFormData, resetForm } = useFormData(
    fields,
    initialData,
    apiEndpoint as string,
    method as "post" | "put",
    onSuccess
  );

  const hasItems = initialData.itemsCount > 0;

  useEffect(() => {
    if (open && initialData) {
      Object.keys(initialData).forEach((key) => {
        form.setValue(key, initialData[key]);
      });
    }
  }, [open, initialData, form]);

  const handleSheetOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      resetForm();
    }
    onOpenChange(isOpen);
  };

  return (
    <Sheet open={open} onOpenChange={handleSheetOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitFormData)}
            className="space-y-4 mt-4"
          >
            {fields.map((field, index) => (
              <FormField
                key={index}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel className="font-bold">{field.label}</FormLabel>
                    <FormControl>
                      {field.type === "select" ? (
                        <Select
                          {...formField}
                          onValueChange={(value) => formField.onChange(value)}
                          value={formField.value}
                          disabled={
                            (method === "post" && field.name === "status") ||
                            (field.name === "status" && !hasItems)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={field.placeholder}
                            ></SelectValue>
                          </SelectTrigger>

                          <SelectContent>
                            {(field.name === "status"
                              ? statusOptions
                              : selectOptions[field.name]
                            )?.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : field.type === "data" ? (
                        <Input
                          {...formField}
                          type="date"
                          placeholder={field.placeholder}
                          className="border"
                        />
                      ) : (
                        <Input
                          {...formField}
                          type={field.type}
                          placeholder={field.placeholder}
                          className="border"
                          maxLength={field.length}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="submit"
              className="bg-orange hover:bg-orangeHover w-full font-semibold"
            >
              {method === "put" ? "Atualizar" : "Cadastrar"}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
