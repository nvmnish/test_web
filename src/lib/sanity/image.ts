import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import { projectId, dataset } from './client';

const client = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: '2024-03-01',
});

const builder = createImageUrlBuilder(client);

export function urlForImage(source: any): string | null {
  if (!source) return null;
  if (typeof source === 'string') return source;
  if (source.asset) {
    try {
      return builder.image(source).auto('format').fit('max').url();
    } catch {
      return null;
    }
  }
  return null;
}
