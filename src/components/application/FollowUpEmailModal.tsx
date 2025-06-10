
"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, Send, Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

interface FollowUpEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: string | null;
  body: string | null;
  isLoading: boolean;
  error: string | null;
  recruiterEmail?: string;
}

export function FollowUpEmailModal({ 
  isOpen, 
  onClose, 
  subject, 
  body, 
  isLoading, 
  error,
  recruiterEmail
}: FollowUpEmailModalProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    if (subject && body) {
      const emailContent = `Konu: ${subject}\n\n${body}`;
      navigator.clipboard.writeText(emailContent)
        .then(() => {
          toast({ title: "Kopyalandı!", description: "E-posta içeriği panoya kopyalandı." });
        })
        .catch(err => {
          toast({ title: "Hata", description: "Kopyalama başarısız oldu.", variant: "destructive" });
          console.error('Kopyalama hatası:', err);
        });
    }
  };

  const handleSend = () => {
    // Actual email sending is out of scope for this UI task
    toast({ title: "E-posta Gönderildi (Simülasyon)", description: recruiterEmail ? `${recruiterEmail} adresine takip e-postası gönderildi.` : "Takip e-postası gönderildi." });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Oluşturulan Takip E-postası</AlertDialogTitle>
          <AlertDialogDescription>
            Yapay zeka tarafından oluşturulan takip e-postasını aşağıda bulabilirsiniz.
            Göndermeden önce kontrol etmeyi unutmayın.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        {isLoading && (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-3">E-posta oluşturuluyor...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="text-destructive py-5">
            <p><strong>Hata:</strong> {error}</p>
          </div>
        )}

        {!isLoading && !error && subject && body && (
          <div className="space-y-4 my-4">
            <div>
              <label htmlFor="email-subject" className="text-sm font-medium text-muted-foreground">Konu</label>
              <Input id="email-subject" readOnly value={subject} className="mt-1 bg-muted/50"/>
            </div>
            <div>
              <label htmlFor="email-body" className="text-sm font-medium text-muted-foreground">İçerik</label>
              <Textarea id="email-body" readOnly value={body} rows={10} className="mt-1 bg-muted/50 resize-none" />
            </div>
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Kapat</AlertDialogCancel>
          {!isLoading && !error && subject && body && (
            <>
              <Button variant="outline" onClick={handleCopy}>
                <Copy className="mr-2 h-4 w-4" />
                Kopyala
              </Button>
              <AlertDialogAction onClick={handleSend} className="bg-accent hover:bg-accent/90">
                <Send className="mr-2 h-4 w-4" />
                Gönder (Simülasyon)
              </AlertDialogAction>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
