import { siteContent } from '@/data/siteContent';

const { brand } = siteContent;

export function generateMetadata({
  title,
  description,
  image,
  path = '',
  type = 'website',
} = {}) {
  const fullTitle = title
    ? `${title} | ${brand.name}`
    : `${brand.name} — ${brand.tagline}`;

  const metaDescription = description || brand.description;
  const url             = `https://blackgoldrealtygroup.com${path}`;
  const ogImage         = image || 'https://blackgoldrealtygroup.com/og-image.jpg';

  return {
    title:       fullTitle,
    description: metaDescription,
    metadataBase: new URL('https://blackgoldrealtygroup.com'),
    openGraph: {
      title:       fullTitle,
      description: metaDescription,
      url,
      siteName:    brand.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
      type,
      locale: 'en_GH',
    },
    twitter: {
      card:        'summary_large_image',
      title:       fullTitle,
      description: metaDescription,
      images:      [ogImage],
    },
    alternates: { canonical: url },
    robots: {
      index:  true,
      follow: true,
    },
    keywords: [
      'luxury real estate Ghana',
      'houses for sale Accra',
      'East Legon property',
      'Cantonments homes',
      'Ghana diaspora property',
      'luxury homes Accra',
      'property investment Ghana',
      brand.name,
    ].join(', '),
  };
}