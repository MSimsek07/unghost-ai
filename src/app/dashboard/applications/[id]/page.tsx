
"use client";
import { useState, useEffect, useMemo } from 'react';
import type { Application, Feedback, FeedbackFormData } from '@/types';
import { useRouter, useParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ApplicationStatusBadge } from '@/components/application/ApplicationStatusBadge';
import { AiTipsDisplay } from '@/components/application/AiTipsDisplay';
import { FeedbackForm } from '@/components/application/FeedbackForm';
import { FeedbackItem } from '@/components/application/FeedbackItem';
import { FollowUpEmailModal } from '@/components/application/FollowUpEmailModal';
import { getFollowUpEmailAction } from '@/app/actions/applicationActions';
import { MOCK_USER_ID } from '@/lib/constants';
import { CalendarDays, Edit, Trash2, Mail, MessageSquare, StickyNote, Briefcase, Loader2, Send } from 'lucide-react';
import { format, parseISO, differenceInDays } from 'date-fns';
import { tr } from 'date-fns/locale';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from '@/components/ui/separator';

export default function ApplicationDetailPage() {
  const [application, setApplication] = useState<Application | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
  const [followUpEmailContent, setFollowUpEmailContent] = useState<{subject: string | null, body: string | null}>({subject: null, body: null});
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      // Simulate API call to fetch application and its feedbacks
      setTimeout(() => {
        const storedApps = localStorage.getItem('unghostApplications');
        const apps: Application[] = storedApps ? JSON.parse(storedApps) : [];
        const appData = apps.find(app => app.id === id);

        if (appData) {
          setApplication(appData);
          // Mock fetching feedbacks for this application
          const storedFeedbacks = localStorage.getItem(`unghostFeedbacks_${id}`);
          setFeedbacks(storedFeedbacks ? JSON.parse(storedFeedbacks) : []);
        } else {
          toast({ title: "Hata", description: "Başvuru bulunamadı.", variant: "destructive" });
          router.push('/dashboard');
        }
        setIsLoading(false);
      }, 500);
    }
  }, [id, router, toast]);

  const handleFeedbackSubmit = async (data: FeedbackFormData) => {
    if (!application) return;
    setIsSubmittingFeedback(true);
    await new Promise(resolve => setTimeout(resolve, 700)); // Simulate API call

    const newFeedback: Feedback = {
      ...data,
      id: Date.now().toString(), // Mock ID
      applicationId: application.id,
      createdAt: new Date().toISOString(),
    };
    const updatedFeedbacks = [...feedbacks, newFeedback];
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem(`unghostFeedbacks_${application.id}`, JSON.stringify(updatedFeedbacks));
    
    setIsSubmittingFeedback(false);
    toast({ title: "Geri Bildirim Eklendi", description: "Geri bildirim başarıyla kaydedildi." });
  };

  const handleDeleteApplication = async () => {
    if (!application) return;
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const storedApps = localStorage.getItem('unghostApplications');
    let apps: Application[] = storedApps ? JSON.parse(storedApps) : [];
    apps = apps.filter(app => app.id !== application.id);
    localStorage.setItem('unghostApplications', JSON.stringify(apps));
    // Also remove associated feedbacks
    localStorage.removeItem(`unghostFeedbacks_${application.id}`);

    toast({ title: "Başvuru Silindi", description: `${application.companyName} başvurusu silindi.` });
    router.push('/dashboard');
  };

  const handleGenerateFollowUpEmail = async () => {
    if (!application || !application.recruiterEmail) return;
    setIsGeneratingEmail(true);
    setEmailError(null);
    setFollowUpEmailContent({subject: null, body: null});
    setIsFollowUpModalOpen(true);

    const result = await getFollowUpEmailAction({
      recruiterEmail: application.recruiterEmail,
      companyName: application.companyName,
      position: application.position,
      applicationDate: application.applicationDate,
    });

    if (result.success) {
      setFollowUpEmailContent({ subject: result.subject || null, body: result.body || null });
    } else {
      setEmailError(result.error || "Bilinmeyen bir hata oluştu.");
    }
    setIsGeneratingEmail(false);
  };

  const daysSinceApplication = useMemo(() => {
    if (application) {
      return differenceInDays(new Date(), parseISO(application.applicationDate));
    }
    return 0;
  }, [application]);

  const showFollowUpButton = application?.status === 'BASVURULDU' && daysSinceApplication >= 14 && application.recruiterEmail;


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-theme(space.28))]"> {/* Adjust height based on header/sidebar */}
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!application) {
    return <div className="container mx-auto py-8 text-center">Başvuru bilgileri yüklenemedi.</div>;
  }

  return (
    <div className="container mx-auto py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Application Details Column */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-2xl font-bold font-headline">{application.companyName}</CardTitle>
                <CardDescription className="flex items-center gap-2 pt-1 text-md">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  {application.position}
                </CardDescription>
              </div>
              <ApplicationStatusBadge status={application.status} className="px-3 py-1.5 text-sm" />
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground pt-3">
              <div className="flex items-center">
                <CalendarDays className="mr-1.5 h-4 w-4" />
                Başvuru: {format(parseISO(application.applicationDate), 'dd MMMM yyyy', { locale: tr })}
              </div>
              {application.recruiterEmail && (
                <div className="flex items-center">
                  <Mail className="mr-1.5 h-4 w-4" />
                  İK E-posta: {application.recruiterEmail}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {application.notes && (
              <div className="mt-2">
                <h4 className="font-semibold text-sm flex items-center mb-1">
                  <StickyNote className="mr-2 h-4 w-4 text-primary" /> Notlar:
                </h4>
                <p className="text-sm text-foreground/80 whitespace-pre-line bg-muted/50 p-3 rounded-md">{application.notes}</p>
              </div>
            )}
            <Separator className="my-6" />
            <div className="flex flex-wrap gap-2 justify-end">
              {showFollowUpButton && (
                <Button variant="outline" onClick={handleGenerateFollowUpEmail} disabled={isGeneratingEmail}>
                  <Send className="mr-2 h-4 w-4" />
                  {isGeneratingEmail ? "Oluşturuluyor..." : "Takip E-postası Oluştur"}
                </Button>
              )}
              <Button variant="outline" asChild>
                <Link href={`/dashboard/applications/${application.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" /> Düzenle
                </Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" /> Sil
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Bu başvuru kalıcı olarak silinecektir. Bu işlem geri alınamaz.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>İptal</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteApplication} className="bg-destructive hover:bg-destructive/90">
                      Evet, Sil
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-headline">
              <MessageSquare className="h-5 w-5 text-primary" />
              Geri Bildirimler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FeedbackForm onSubmit={handleFeedbackSubmit} isSubmitting={isSubmittingFeedback} />
            {feedbacks.length > 0 ? (
              <div className="space-y-3 pt-4">
                {feedbacks.sort((a,b) => parseISO(b.receivedDate).getTime() - parseISO(a.receivedDate).getTime()).map(fb => <FeedbackItem key={fb.id} feedback={fb} />)}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">Henüz geri bildirim eklenmemiş.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Tips Column */}
      <div className="lg:col-span-1">
        <AiTipsDisplay application={application} />
      </div>

      {/* Follow-up Email Modal */}
      <FollowUpEmailModal
        isOpen={isFollowUpModalOpen}
        onClose={() => setIsFollowUpModalOpen(false)}
        subject={followUpEmailContent.subject}
        body={followUpEmailContent.body}
        isLoading={isGeneratingEmail}
        error={emailError}
        recruiterEmail={application.recruiterEmail}
      />
    </div>
  );
}
