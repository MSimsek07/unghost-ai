
import { LoginForm } from "@/components/auth/LoginForm";
import { PublicNavbar } from "@/components/layout/PublicNavbar";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-grow flex items-center justify-center p-6 bg-gradient-to-br from-primary/5 via-background to-background">
        <LoginForm />
      </main>
    </div>
  );
}
