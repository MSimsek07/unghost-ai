
"use client";
import { useEffect, useState } from 'react';
import { getApplicationTipsAction } from '@/app/actions/applicationActions';
import type { Application } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface AiTipsDisplayProps {
  application: Application;
}

export function AiTipsDisplay({ application }: AiTipsDisplayProps) {
  const [tips, setTips] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTips() {
      if (!application) return;
      setIsLoading(true);
      setError(null);
      try {
        const result = await getApplicationTipsAction({
          status: application.status,
          companyName: application.companyName,
          position: application.position,
        });
        if (result.success) {
          setTips(result.tips || "Şu anda bu durum için özel bir ipucu bulunmamaktadır.");
        } else {
          setError(result.error || "Bilinmeyen bir hata oluştu.");
        }
      } catch (e) {
        setError("İpuçları getirilirken bir ağ hatası oluştu.");
        console.error(e);
      }
      setIsLoading(false);
    }
    fetchTips();
  }, [application]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-headline">
          <Lightbulb className="h-5 w-5 text-accent" />
          Yapay Zeka Destekli İpuçları
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="ml-2">İpuçları yükleniyor...</p>
          </div>
        )}
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Hata</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {tips && !isLoading && !error && (
          <div className="prose prose-sm max-w-none text-foreground/90 whitespace-pre-line">
            <p>{tips}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
