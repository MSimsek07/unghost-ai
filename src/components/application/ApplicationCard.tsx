
import type { Application } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ApplicationStatusBadge } from './ApplicationStatusBadge';
import { CalendarDays, Mail, Briefcase } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { tr } from 'date-fns/locale';

interface ApplicationCardProps {
  application: Application;
  onDelete: (id: string) => void;
}

export function ApplicationCard({ application, onDelete }: ApplicationCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-headline">{application.companyName}</CardTitle>
          <ApplicationStatusBadge status={application.status} />
        </div>
        <CardDescription className="flex items-center gap-2 pt-1">
          <Briefcase className="h-4 w-4 text-muted-foreground" />
          {application.position}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarDays className="mr-2 h-4 w-4" />
          Başvuru Tarihi: {format(parseISO(application.applicationDate), 'dd MMMM yyyy', { locale: tr })}
        </div>
        {application.recruiterEmail && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Mail className="mr-2 h-4 w-4" />
            İK E-posta: {application.recruiterEmail}
          </div>
        )}
        {application.notes && (
          <p className="text-sm text-muted-foreground pt-2 border-t mt-2">Notlar: {application.notes.substring(0,100)}{application.notes.length > 100 ? "..." : ""}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/dashboard/applications/${application.id}`}>Detaylar</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/dashboard/applications/${application.id}/edit`}>Düzenle</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
