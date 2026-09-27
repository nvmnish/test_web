import { createClient } from '@sanity/client';

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

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // ensure latest content
});
