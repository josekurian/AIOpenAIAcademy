import type {Metadata} from 'next';

// Set to the real public origin at build time. Never invent a deployment domain.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title, description,
    ...(siteUrl ? {alternates: {canonical: `${siteUrl}${path}`}} : {}),
    openGraph: {title, description, type: 'website', siteName: 'HybridGenAI Academy', images: [{url: '/opengraph-image', width: 1200, height: 630, alt: 'HybridGenAI Academy — OpenAI learning guide'}], ...(siteUrl ? {url: `${siteUrl}${path}`} : {})},
    twitter: {card: 'summary_large_image', title, description, images: ['/opengraph-image']},
  };
}
