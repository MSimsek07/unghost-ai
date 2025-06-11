
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { CheckCircle, Send, Brain, MessageSquare } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicNavbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6 text-primary">
              <span className="inline-block animate-in fade-in slide-in-from-bottom-12 duration-500 ease-out">
                İş Arayışınızda
              </span>{' '}
              <span className="inline-block text-accent animate-in fade-in slide-in-from-bottom-12 duration-500 ease-out delay-200">
                Yalnız Değilsiniz
              </span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500 ease-out delay-400">
              Unghost AI, Türkiye'deki teknoloji profesyonellerinin iş başvurularını etkin bir şekilde yönetmelerine,
              işe alım uzmanlarından geri bildirim almalarına ve kariyer hedeflerine ulaşmalarına yardımcı olur.
            </p>
            <div className="space-x-4 animate-in fade-in zoom-in-95 duration-500 ease-out delay-500">
              <Button size="lg" asChild className="transition-all duration-300 ease-out hover:brightness-110 hover:-translate-y-0.5">
                <Link href="/register">Hemen Başla</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Özellikleri Keşfet</Link>
              </Button>
            </div>
            <div className="mt-16 relative animate-in fade-in zoom-in-95 duration-700 ease-out delay-600">
               <Image 
                src="https://placehold.co/1000x500.png" 
                alt="Unghost AI Arayüzü" 
                width={1000} 
                height={500} 
                className="rounded-lg shadow-2xl mx-auto"
                data-ai-hint="application dashboard"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent animate-in fade-in duration-500 delay-700"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-background overflow-hidden">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-16 text-primary animate-in fade-in slide-in-from-bottom-10 duration-500 ease-out">
              Unghost AI <span className="text-accent">Neler Sunuyor?</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<CheckCircle className="w-10 h-10 text-accent" />}
                title="Başvuru Takibi"
                description="Tüm iş başvurularınızı tek bir yerden yönetin, durumlarını güncelleyin ve notlar ekleyin."
                className="animate-in fade-in slide-in-from-bottom-8 duration-500 ease-out delay-100"
              />
              <FeatureCard
                icon={<Send className="w-10 h-10 text-accent" />}
                title="Otomatik Takip"
                description="14 gün içinde yanıt alamadığınız başvurular için yapay zeka destekli takip e-postaları gönderin."
                className="animate-in fade-in slide-in-from-bottom-8 duration-500 ease-out delay-200"
              />
              <FeatureCard
                icon={<Brain className="w-10 h-10 text-accent" />}
                title="Yapay Zeka İpuçları"
                description="Başvuru durumunuza özel, kişiselleştirilmiş kariyer ipuçları ve stratejiler alın."
                className="animate-in fade-in slide-in-from-bottom-8 duration-500 ease-out delay-300"
              />
              <FeatureCard
                icon={<MessageSquare className="w-10 h-10 text-accent" />}
                title="Geri Bildirim Yönetimi"
                description="İşe alım uzmanlarından aldığınız geri bildirimleri kaydedin ve başvurularınızla ilişkilendirin."
                className="animate-in fade-in slide-in-from-bottom-8 duration-500 ease-out delay-400"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary/5 overflow-hidden">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6 text-primary animate-in fade-in slide-in-from-bottom-10 duration-500 ease-out">
              Kariyerinizde Bir Sonraki Adıma <span className="text-accent">Hazır Mısınız?</span>
            </h2>
            <p className="text-lg text-foreground/80 mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500 ease-out delay-150">
              Unghost AI ile iş arama sürecinizi optimize edin ve hayalinizdeki işe bir adım daha yaklaşın.
            </p>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground animate-in fade-in zoom-in-95 duration-500 ease-out delay-300">
              <Link href="/register">Ücretsiz Kayıt Olun</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t bg-background">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Unghost AI. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <div className={`group bg-card p-6 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out ${className}`}>
      <div className="flex justify-center mb-4">
        <div className="animate-float transition-transform duration-300 ease-out group-hover:scale-110">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold font-headline mb-2 text-primary">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
}
