import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '73kv437d',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-03-01',
  useCdn: false, // Bypass CDN for instant live updates
});

// Use named export to prevent deprecation warnings
const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
