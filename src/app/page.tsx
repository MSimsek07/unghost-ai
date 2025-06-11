
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
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6 text-primary animate-in fade-in slide-in-from-bottom-12 duration-700 ease-out">
              İş Arayışınızda <span className="text-accent">Yalnız Değilsiniz</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-3xl mx-auto">
              Unghost AI, Türkiye'deki teknoloji profesyonellerinin iş başvurularını etkin bir şekilde yönetmelerine,
              işe alım uzmanlarından geri bildirim almalarına ve kariyer hedeflerine ulaşmalarına yardımcı olur.
            </p>
            <div className="space-x-4">
              <Button size="lg" asChild>
                <Link href="/register">Hemen Başla</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Özellikleri Keşfet</Link>
              </Button>
            </div>
            <div className="mt-16 relative">
               <Image 
                src="https://placehold.co/1000x500.png" 
                alt="Unghost AI Arayüzü" 
                width={1000} 
                height={500} 
                className="rounded-lg shadow-2xl mx-auto"
                data-ai-hint="application dashboard"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-16 text-primary">
              Unghost AI <span className="text-accent">Neler Sunuyor?</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<CheckCircle className="w-10 h-10 text-accent" />}
                title="Başvuru Takibi"
                description="Tüm iş başvurularınızı tek bir yerden yönetin, durumlarını güncelleyin ve notlar ekleyin."
              />
              <FeatureCard
                icon={<Send className="w-10 h-10 text-accent" />}
                title="Otomatik Takip"
                description="14 gün içinde yanıt alamadığınız başvurular için yapay zeka destekli takip e-postaları gönderin."
              />
              <FeatureCard
                icon={<Brain className="w-10 h-10 text-accent" />}
                title="Yapay Zeka İpuçları"
                description="Başvuru durumunuza özel, kişiselleştirilmiş kariyer ipuçları ve stratejiler alın."
              />
              <FeatureCard
                icon={<MessageSquare className="w-10 h-10 text-accent" />}
                title="Geri Bildirim Yönetimi"
                description="İşe alım uzmanlarından aldığınız geri bildirimleri kaydedin ve başvurularınızla ilişkilendirin."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6 text-primary">
              Kariyerinizde Bir Sonraki Adıma <span className="text-accent">Hazır Mısınız?</span>
            </h2>
            <p className="text-lg text-foreground/80 mb-10 max-w-2xl mx-auto">
              Unghost AI ile iş arama sürecinizi optimize edin ve hayalinizdeki işe bir adım daha yaklaşın.
            </p>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
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
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold font-headline mb-2 text-primary">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
}
