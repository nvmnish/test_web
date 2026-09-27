import { createClient, type SanityClient } from '@sanity/client';

const getEnvVar = (name: string): string | undefined => {
  if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
    return (import.meta as any).env[name];
  }
  if (typeof process !== 'undefined' && process.env) {
    return process.env[name];
  }
  return undefined;
};

export const projectId = getEnvVar('PUBLIC_SANITY_PROJECT_ID') || 'dzwbnapy';
export const dataset = getEnvVar('PUBLIC_SANITY_DATASET') || 'production';
export const apiVersion = '2024-03-01';

export function getSanityClient({ isPreview = false }: { isPreview?: boolean } = {}): SanityClient {
  const serverToken = isPreview
    ? getEnvVar('SANITY_AUTH_TOKEN') ||
      getEnvVar('SANITY_API_TOKEN') ||
      getEnvVar('SANITY_READ_TOKEN')
    : undefined;

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // ensures fresh query results on each request
    perspective: isPreview ? 'drafts' : 'published',
    token: serverToken,
  });
}

// Default published client
export const sanityClient = getSanityClient({ isPreview: false });
