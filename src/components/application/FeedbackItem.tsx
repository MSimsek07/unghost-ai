
import type { Feedback } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, CalendarDays } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { tr } from 'date-fns/locale';

interface FeedbackItemProps {
  feedback: Feedback;
}

export function FeedbackItem({ feedback }: FeedbackItemProps) {
  return (
    <Card className="bg-secondary/50">
      <CardHeader className="pb-2">
        <CardDescription className="flex items-center text-xs text-muted-foreground">
          <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
          Alınma Tarihi: {format(parseISO(feedback.receivedDate), 'dd MMMM yyyy', { locale: tr })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground/90 whitespace-pre-line">{feedback.feedbackText}</p>
      </CardContent>
    </Card>
  );
}
