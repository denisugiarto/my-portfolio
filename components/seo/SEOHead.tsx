import Head from 'next/head';
import { SEOSettings } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';

interface SEOHeadProps {
  seoSettings?: SEOSettings | null;
  defaultTitle?: string;
  defaultDescription?: string;
  currentUrl?: string;
}

export default function SEOHead({
  seoSettings,
  defaultTitle = 'My Portfolio',
  defaultDescription = 'Full-stack developer portfolio showcasing modern web applications and innovative solutions.',
  currentUrl = '',
}: SEOHeadProps) {
  const title = seoSettings?.metaTitle || seoSettings?.title || defaultTitle;
  const description = seoSettings?.metaDescription || defaultDescription;
  const keywords = seoSettings?.keywords?.join(', ') || '';
  
  const ogTitle = seoSettings?.ogTitle || title;
  const ogDescription = seoSettings?.ogDescription || description;
  const ogImage = seoSettings?.ogImage ? urlFor(seoSettings.ogImage).width(1200).height(630).url() : '';
  
  const twitterTitle = seoSettings?.twitterTitle || ogTitle;
  const twitterDescription = seoSettings?.twitterDescription || ogDescription;
  const twitterImage = seoSettings?.twitterImage ? urlFor(seoSettings.twitterImage).width(1200).height(630).url() : ogImage;
  
  const canonicalUrl = seoSettings?.canonicalUrl || currentUrl;
  const noIndex = seoSettings?.noIndex || false;
  const noFollow = seoSettings?.noFollow || false;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {(noIndex || noFollow) && (
        <meta
          name="robots"
          content={`${noIndex ? 'noindex' : 'index'}${noIndex && noFollow ? ',' : ''}${noFollow ? 'nofollow' : 'follow'}`}
        />
      )}
      
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type" content="website" />
      {currentUrl && <meta property="og:url" content={currentUrl} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImage && <meta property="og:image:width" content="1200" />}
      {ogImage && <meta property="og:image:height" content="630" />}
      
      <meta name="twitter:card" content={seoSettings?.twitterCard || 'summary_large_image'} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      {twitterImage && <meta name="twitter:image" content={twitterImage} />}
      
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {seoSettings?.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: seoSettings.structuredData }}
        />
      )}
    </Head>
  );
}