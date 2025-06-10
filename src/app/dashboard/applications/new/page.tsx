
"use client";
import { useState } from 'react';
import { ApplicationForm } from '@/components/application/ApplicationForm';
import type { Application, ApplicationFormData } from '@/types';
import { MOCK_USER_ID } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function NewApplicationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newApplication: Application = {
      ...data,
      id: Date.now().toString(), // Mock ID
      userId: MOCK_USER_ID,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const storedApps = localStorage.getItem('unghostApplications');
    const apps = storedApps ? JSON.parse(storedApps) : [];
    apps.push(newApplication);
    localStorage.setItem('unghostApplications', JSON.stringify(apps));

    setIsSubmitting(false);
    toast({
      title: "Başvuru Eklendi",
      description: `${data.companyName} şirketine yaptığınız ${data.position} başvurusu başarıyla eklendi.`,
    });
    router.push('/dashboard');
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold font-headline">Yeni İş Başvurusu Ekle</CardTitle>
          <CardDescription>İş başvurunuzun detaylarını girin.</CardDescription>
        </CardHeader>
        <CardContent>
          <ApplicationForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </CardContent>
      </Card>
    </div>
  );
}
