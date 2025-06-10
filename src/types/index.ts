export type ApplicationStatus = 'BASVURULDU' | 'MULAKAT_YAPILDI' | 'TEKLIF_ALINDI' | 'REDDEDILDI';

export interface Application {
  id: string;
  userId: string;
  companyName: string;
  position: string;
  applicationDate: string; // YYYY-MM-DD
  recruiterEmail?: string;
  notes?: string;
  status: ApplicationStatus;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}

export interface Feedback {
  id: string;
  applicationId: string;
  feedbackText: string;
  receivedDate: string; // YYYY-MM-DD
  createdAt: string; // ISO Date string
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

// Used for form inputs
export type ApplicationFormData = Omit<Application, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;
export type FeedbackFormData = Omit<Feedback, 'id' | 'applicationId' | 'createdAt'>;
