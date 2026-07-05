import { Navbar } from '@/components/Navbar';
import { MobileTabBar } from '@/components/MobileTabBar';
import { Footer } from '@/components/Footer';

export const metadata = { title: 'Kullanım Şartları — Coco' };

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-16 md:pb-0 px-6 py-24 max-w-2xl mx-auto">
        <h1 className="font-display font-semibold text-3xl mb-8">Kullanım Şartları</h1>
        <div className="space-y-6 text-mist-dim leading-relaxed text-sm">
          <p>
            Coco'yu sunucunuza ekleyerek, botun güvenlik amaçlı olarak kanal, rol ve izin
            değişikliklerini otomatik olarak geri alabileceğini kabul etmiş olursunuz.
          </p>
          <p>
            Panik modu ve anti-nuke sistemleri, yalnızca yapılandırdığınız eşik değerlerine göre
            çalışır. Yanlış yapılandırma sonucu oluşabilecek aksaklıklardan sunucu yöneticisi
            sorumludur.
          </p>
          <p>
            Botu kötüye kullanım (spam, izinsiz veri toplama amaçlı entegrasyon vb.) tespit
            edilirse erişim önceden haber verilmeksizin kısıtlanabilir.
          </p>
        </div>
      </main>
      <Footer />
      <MobileTabBar />
    </>
  );
}
