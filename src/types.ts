export interface MetricItem {
  number: number;
  suffix: string;
  description: string;
  barPercentage?: number;
}

export interface VideoTestimonial {
  id: string;
  clientName: string;
  videoSrc: string;
  poster: string;
}

export interface ComparisonRow {
  dimension: string;
  gls: string;
  others: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface PricingTier {
  id: string;
  title: string;
  tagline?: string;
  subtitle?: string;
  price: string;
  cadence: string;
  description: string;
  featureHeader?: string;
  features: string[];
  footerNote?: string;
  ctaText: string;
  idealFor: string;
}
