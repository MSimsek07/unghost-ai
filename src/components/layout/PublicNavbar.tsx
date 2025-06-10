
"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Gem } from 'lucide-react'; // Using Gem as a placeholder logo icon

export function PublicNavbar() {
  return (
    <header className="py-4 px-6 sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Gem className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold font-headline text-primary">Unghost AI</span>
        </Link>
        <nav className="space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Giriş Yap</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Kayıt Ol</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
