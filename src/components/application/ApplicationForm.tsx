
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ApplicationFormData, ApplicationStatus } from "@/types";
import { APPLICATION_STATUS_OPTIONS } from "@/lib/constants";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

const formSchema = z.object({
  companyName: z.string().min(1, { message: "Şirket adı gereklidir." }),
  position: z.string().min(1, { message: "Pozisyon adı gereklidir." }),
  applicationDate: z.string({ required_error: "Başvuru tarihi gereklidir." }),
  recruiterEmail: z.string().email({ message: "Geçerli bir e-posta girin." }).optional().or(z.literal('')),
  notes: z.string().optional(),
  status: z.custom<ApplicationStatus>((val) => APPLICATION_STATUS_OPTIONS.map(o => o.value).includes(val as ApplicationStatus), {
    message: "Geçerli bir durum seçin.",
  }),
});

interface ApplicationFormProps {
  initialData?: ApplicationFormData;
  onSubmit: (data: ApplicationFormData) => Promise<void>;
  isSubmitting: boolean;
}

export function ApplicationForm({ initialData, onSubmit, isSubmitting }: ApplicationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      companyName: "",
      position: "",
      applicationDate: format(new Date(), 'yyyy-MM-dd'),
      recruiterEmail: "",
      notes: "",
      status: "BASVURULDU",
    },
  });

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values as ApplicationFormData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Şirket Adı</FormLabel>
                <FormControl>
                  <Input placeholder="Örn: Google" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pozisyon</FormLabel>
                <FormControl>
                  <Input placeholder="Örn: Yazılım Geliştirici" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="applicationDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Başvuru Tarihi</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(new Date(field.value), "PPP", { locale: tr })
                        ) : (
                          <span>Bir tarih seçin</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : '')}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      locale={tr}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Durum</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Başvuru durumunu seçin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {APPLICATION_STATUS_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="recruiterEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>İşe Alım Uzmanı E-postası (Opsiyonel)</FormLabel>
              <FormControl>
                <Input placeholder="ornek.ik@sirket.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notlar (Opsiyonel)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Başvuruyla ilgili önemli notlarınızı buraya ekleyebilirsiniz..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? 'Değişiklikleri Kaydet' : 'Başvuruyu Kaydet'}
        </Button>
      </form>
    </Form>
  );
}
