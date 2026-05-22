import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { UIProvider } from '@/context/UIContext';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import ScrollToTop from '@/components/common/ScrollToTop';
import LeadCaptureModal from '@/components/common/LeadCaptureModal';
import { siteContent } from '@/data/siteContent';

const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-inter',
  display:  'swap',
});

const playfair = Playfair_Display({
  subsets:  ['latin'],
  variable: '--font-playfair',
  display:  'swap',
  weight:   ['400', '600', '700'],
  style:    ['normal', 'italic'],
});

const cormorant = Cormorant_Garamond({
  subsets:  ['latin'],
  variable: '--font-cormorant',
  display:  'swap',
  weight:   ['300', '400', '500', '600', '700'],
  style:    ['normal', 'italic'],
});

export const metadata = {
  title: {
    default:  `${siteContent.brand.name} — ${siteContent.brand.tagline}`,
    template: `%s | ${siteContent.brand.name}`,
  },
  description: siteContent.brand.description,
  metadataBase: new URL('https://blackgoldrealtygroup.com'),
  openGraph: {
    siteName: siteContent.brand.name,
    locale:   'en_GH',
    type:     'website',
  },
  robots: { index: true, follow: true },
  icons: {
    icon:  '/icons/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
      </head>
      <body className="bg-obsidian-950 text-white antialiased">
        <UIProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
          <ScrollToTop />
          <LeadCaptureModal />
        </UIProvider>
      </body>
    </html>
  );
}