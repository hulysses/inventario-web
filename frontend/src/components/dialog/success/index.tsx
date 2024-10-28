import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { SuccessDialogProps } from "@/types/SuccessDialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog";


export function SuccessDialog({ isOpen, onClose, isSuccess }: SuccessDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isSuccess ? "Operação Realizada" : "Erro na Operação"}</DialogTitle>
                    <DialogDescription>
                        {isSuccess ? (
                            <div className="flex items-center text-green-600">
                                <CheckCircle className="mr-2 h-5 w-5" />
                                Operação realizada com sucesso!
                            </div>
                        ) : (
                            <div className="flex items-center text-red-600">
                                <XCircle className="mr-2 h-5 w-4" />
                                Houve um erro na operação.
                            </div>
                        )}
                    </DialogDescription>
                </DialogHeader>
                <Button onClick={onClose}>Fechar</Button>
            </DialogContent>
        </Dialog>
    )
}