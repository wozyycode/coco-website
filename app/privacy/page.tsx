import { Navbar } from '@/components/Navbar';
import { MobileTabBar } from '@/components/MobileTabBar';
import { Footer } from '@/components/Footer';

export const metadata = { title: 'Gizlilik Politikası — Coco' };

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-16 md:pb-0 px-6 py-24 max-w-2xl mx-auto prose prose-invert">
        <h1 className="font-display font-semibold text-3xl mb-8">Gizlilik Politikası</h1>
        <div className="space-y-6 text-mist-dim leading-relaxed text-sm">
          <p>
            Coco, sunucunuzu korumak için gerekli minimum veriyi toplar: sunucu ID'leri, kanal/rol
            yapılandırma anlık görüntüleri (rollback için) ve güvenlik olay kayıtları.
          </p>
          <p>
            Mesaj içerikleri yalnızca yapay zekâ destekli tarama sırasında anlık olarak işlenir,
            hiçbir mesaj içeriği kalıcı olarak saklanmaz.
          </p>
          <p>
            Discord ile giriş yaptığınızda yalnızca kullanıcı adınız, avatarınız ve üyesi olduğunuz
            sunucu listesi alınır. Bu bilgi üçüncü taraflarla paylaşılmaz.
          </p>
        </div>
      </main>
      <Footer />
      <MobileTabBar />
    </>
  );
}
