import { Inter } from 'next/font/google';
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
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
      </head>
      <body className="bg-obsidian-950 text-white antialiased">
        <UIProvider>
          {/* Global Navigation */}
          <Navbar />

          {/* Page Content */}
          <main className="min-h-screen">{children}</main>

          {/* Global Footer */}
          <Footer />

          {/* Always-visible WhatsApp CTA */}
          <WhatsAppButton />

          {/* Scroll to top button */}
          <ScrollToTop />

          {/* Lead capture modal — global */}
          <LeadCaptureModal />
        </UIProvider>
      </body>
    </html>
  );
}