
"use client";
import { useState, useEffect } from 'react';
import type { Application } from '@/types';
import { ApplicationCard } from '@/components/application/ApplicationCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, ListFilter, Search } from 'lucide-react';
import { MOCK_USER_ID, APPLICATION_STATUSES } from '@/lib/constants';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import { useToast } from '@/hooks/use-toast';

// Mock data - replace with API calls
const initialMockApplications: Application[] = [
  { id: '1', userId: MOCK_USER_ID, companyName: 'Tech Solutions A.Ş.', position: 'Frontend Geliştirici', applicationDate: '2024-05-01', recruiterEmail: 'hr@techsolutions.com', notes: 'React ve TypeScript deneyimi vurgulandı.', status: 'BASVURULDU', createdAt: '2024-05-15T10:00:00.000Z', updatedAt: new Date().toISOString() },
  { id: '2', userId: MOCK_USER_ID, companyName: 'Innovatech Ltd.', position: 'Backend Geliştirici', applicationDate: '2024-04-15', status: 'MULAKAT_YAPILDI', notes: 'İlk mülakat olumlu geçti, teknik mülakat bekleniyor.', createdAt: '2024-05-14T10:00:00.000Z', updatedAt: new Date().toISOString() },
  { id: '3', userId: MOCK_USER_ID, companyName: 'CyberSoft', position: 'Full Stack Geliştirici', applicationDate: '2024-05-10', recruiterEmail: 'kariyer@cybersoft.com.tr', status: 'TEKLIF_ALINDI', createdAt: '2024-05-16T10:00:00.000Z', updatedAt: new Date().toISOString() },
  { id: '4', userId: MOCK_USER_ID, companyName: 'Data Dynamics', position: 'Veri Bilimci', applicationDate: '2024-03-20', status: 'REDDEDILDI', notes: 'Pozisyon için daha deneyimli bir aday tercih edildi.', createdAt: '2024-05-13T10:00:00.000Z', updatedAt: new Date().toISOString() },
];


export default function DashboardPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching data
    const storedApps = localStorage.getItem('unghostApplications');
    let applicationsData: Application[] = [];
    if (storedApps) {
      applicationsData = JSON.parse(storedApps);
    } else {
      applicationsData = initialMockApplications;
      localStorage.setItem('unghostApplications', JSON.stringify(initialMockApplications));
    }

    // Sort applications by createdAt in descending order
    const sortedApplications = applicationsData.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    setApplications(sortedApplications);

  }, []);

  const handleDeleteApplication = (id: string) => {
    // This function is passed to ApplicationCard but deletion is handled in the detail page for now
    // Or can be implemented here with an AlertDialog
    const updatedApplications = applications.filter(app => app.id !== id);
    setApplications(updatedApplications);
    localStorage.setItem('unghostApplications', JSON.stringify(updatedApplications));
    toast({ title: "Başvuru Silindi", description: "Başvuru başarıyla silindi." });
  };
  
  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold font-headline text-primary">Başvurularım</h1>
        <Button asChild>
          <Link href="/dashboard/applications/new">
            <PlusCircle className="mr-2 h-5 w-5" />
            Yeni Başvuru Ekle
          </Link>
        </Button>
      </div>

      <div className="mb-6 p-4 bg-card rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Şirket veya pozisyona göre ara..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <ListFilter className="h-5 w-5 text-muted-foreground" />
                <SelectValue placeholder="Duruma göre filtrele" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Tüm Durumlar</SelectItem>
              {Object.entries(APPLICATION_STATUSES).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredApplications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApplications.map(app => (
            <ApplicationCard key={app.id} application={app} onDelete={handleDeleteApplication} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">Henüz başvuru eklenmemiş veya filtrenizle eşleşen başvuru bulunamadı.</p>
          <Button variant="link" asChild className="mt-4">
            <Link href="/dashboard/applications/new">İlk başvurunuzu ekleyin!</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
