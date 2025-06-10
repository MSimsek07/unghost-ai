
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { PublicNavbar } from "@/components/layout/PublicNavbar";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-grow flex items-center justify-center p-6 bg-gradient-to-br from-primary/5 via-background to-background">
        <ResetPasswordForm />
      </main>
    </div>
  );
}
