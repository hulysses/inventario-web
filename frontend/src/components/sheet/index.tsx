import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SheetProps } from "@/types/Sheet";
import { useEffect, useState } from "react";
import { useFormData } from "@/hooks/useForm";
import { isValidImageUrl } from "@/helpers/productHelper";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function Sheets({
  title,
  fields,
  apiEndpoint,
  method,
  initialData = {},
  open,
  onOpenChange,
  onSuccess,
}: SheetProps) {
  const { form, submitFormData, resetForm } = useFormData(
    fields,
    {
      ...initialData,
      clienteId: initialData.clienteId?.toString() || "",
    },
    apiEndpoint as string,
    method as "post" | "put",
    onSuccess
  );

  // Estado para controlar a validade da imagem
  const [isImageValid, setIsImageValid] = useState(false);

  // Controle para pesquisa
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (open && initialData) {
      Object.keys(initialData).forEach((key) => {
        if (form.getValues(key) !== initialData[key]) {
          form.setValue(key, initialData[key]);
        }
      });
    }
  }, [open, initialData, form]);

  const handleSheetOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      resetForm();
    }
    onOpenChange(isOpen);
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.imagem) {
        isValidImageUrl(value.imagem).then((isValid) =>
          setIsImageValid(isValid)
        );
      } else {
        setIsImageValid(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <Sheet open={open} onOpenChange={handleSheetOpenChange}>
      <SheetContent className="overflow-y-auto">
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
                      {field.type === "radio" ? (
                        <RadioGroup
                          onValueChange={formField.onChange}
                          value={formField.value}
                          className="flex flex-col space-y-1"
                        >
                          {field.options?.map((option) => (
                            <FormItem
                              className="flex items-center space-x-3 space-y-0"
                              key={option.value}
                            >
                              <FormControl>
                                <RadioGroupItem
                                  value={option.value.toString()}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {option.label}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      ) : field.type === "select" ? (
                        <Select
                          onValueChange={(value) => formField.onChange(value)}
                          value={formField.value ?? ""}
                        >
                          <SelectTrigger className="flex h-10 w-full rounded-sm px-3 py-1  focus:outline-none">
                            <SelectValue placeholder={field.placeholder} />
                          </SelectTrigger>
                          <SelectContent className="">
                            <div>
                              <Input
                                placeholder="Pesquisar..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border mb-1 flex h-10 w-full rounded-sm px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline-none"
                              />
                            </div>
                            {field.selectOptions
                              ?.filter((option) =>
                                option.label
                                  ?.toLowerCase()
                                  .includes(searchTerm.toLowerCase())
                              )
                              .map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      ) : field.type === "image" ? (
                        <div className="space-y-2">
                          <Input
                            {...formField}
                            type="url"
                            placeholder={field.placeholder}
                            className="border"
                          />
                          {isImageValid && formField.value && (
                            <div className="relative w-full h-40">
                              <img
                                src={formField.value}
                                alt="Pré-visualização"
                                className="rounded-md w-full h-full object-fill"
                              />
                            </div>
                          )}
                        </div>
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
