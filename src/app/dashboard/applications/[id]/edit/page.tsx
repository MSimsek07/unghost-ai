
"use client";
import { useState, useEffect } from 'react';
import { ApplicationForm } from '@/components/application/ApplicationForm';
import type { Application, ApplicationFormData } from '@/types';
import { useRouter, useParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditApplicationPage() {
  const [application, setApplication] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const storedApps = localStorage.getItem('unghostApplications');
        const apps: Application[] = storedApps ? JSON.parse(storedApps) : [];
        const appToEdit = apps.find(app => app.id === id);
        if (appToEdit) {
          setApplication(appToEdit);
        } else {
          toast({ title: "Hata", description: "Başvuru bulunamadı.", variant: "destructive" });
          router.push('/dashboard');
        }
        setIsLoading(false);
      }, 500);
    }
  }, [id, router, toast]);

  const handleSubmit = async (data: ApplicationFormData) => {
    if (!application) return;
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedApplication: Application = {
      ...application,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    const storedApps = localStorage.getItem('unghostApplications');
    let apps: Application[] = storedApps ? JSON.parse(storedApps) : [];
    apps = apps.map(app => app.id === id ? updatedApplication : app);
    localStorage.setItem('unghostApplications', JSON.stringify(apps));

    setIsSubmitting(false);
    toast({
      title: "Başvuru Güncellendi",
      description: `${data.companyName} şirketine yaptığınız ${data.position} başvurusu başarıyla güncellendi.`,
    });
    router.push(`/dashboard/applications/${id}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-1/4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!application) {
    return <div className="container mx-auto py-8 text-center">Başvuru yüklenemedi.</div>;
  }
  
  // Prepare initialData by excluding non-form fields
  const { id: appId, userId, createdAt, updatedAt, ...initialFormData } = application;


  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold font-headline">Başvuruyu Düzenle</CardTitle>
          <CardDescription>{application.companyName} - {application.position}</CardDescription>
        </CardHeader>
        <CardContent>
          <ApplicationForm 
            initialData={initialFormData as ApplicationFormData} 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting} 
          />
        </CardContent>
      </Card>
    </div>
  );
}
