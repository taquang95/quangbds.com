export interface Project {
  id: string;
  name: string;
  status: 'active' | 'sold-out';
  description: string;
  location: string;
  developer: string;
  highlights: string[];
  image: string;
  ctaText: string;
  priceEstimate?: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface WhyReason {
  id: string;
  title: string;
  text: string;
  highlightText?: string;
}

export interface ContactInfo {
  phone: string;
  phoneDisplay: string;
  facebookUrl: string;
  zaloGroupUrl: string;
  zaloChatUrl: string;
}
