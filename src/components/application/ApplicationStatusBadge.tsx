
import type { ApplicationStatus } from '@/types';
import { Badge } from '@/components/ui/badge';
import { APPLICATION_STATUSES, STATUS_ICONS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { Icon } from 'lucide-react';

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}

export function ApplicationStatusBadge({ status, className }: ApplicationStatusBadgeProps) {
  const IconComponent: Icon = STATUS_ICONS[status] || STATUS_ICONS.BASVURULDU;
  
  let badgeVariant: "default" | "secondary" | "destructive" | "outline" = "secondary";
  if (status === 'TEKLIF_ALINDI') badgeVariant = 'default'; // typically primary color
  else if (status === 'REDDEDILDI') badgeVariant = 'destructive';
  else if (status === 'MULAKAT_YAPILDI') badgeVariant = 'outline';


  return (
    <Badge variant={badgeVariant} className={cn("flex items-center gap-1.5", className)}>
      <IconComponent className="h-3.5 w-3.5" />
      <span>{APPLICATION_STATUSES[status]}</span>
    </Badge>
  );
}
