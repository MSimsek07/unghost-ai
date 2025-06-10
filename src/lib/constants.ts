import type { ApplicationStatus } from '@/types';
import { FileText, MessagesSquare, Sparkles, FileX2, Icon } from 'lucide-react';

export const APPLICATION_STATUSES: Record<ApplicationStatus, string> = {
  BASVURULDU: 'Başvuruldu',
  MULAKAT_YAPILDI: 'Mülakat Yapıldı',
  TEKLIF_ALINDI: 'Teklif Alındı',
  REDDEDILDI: 'Reddedildi',
};

export const APPLICATION_STATUS_OPTIONS = (Object.keys(APPLICATION_STATUSES) as ApplicationStatus[]).map(status => ({
  value: status,
  label: APPLICATION_STATUSES[status],
}));

export const STATUS_ICONS: Record<ApplicationStatus, Icon> = {
  BASVURULDU: FileText,
  MULAKAT_YAPILDI: MessagesSquare,
  TEKLIF_ALINDI: Sparkles,
  REDDEDILDI: FileX2,
};

export const MOCK_USER_ID = 'mock-user-123';
