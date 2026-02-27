export const colors = {
  // Primary colors
  primary: {
    main: '#2563EB',
    light: '#3B82F6',
    dark: '#1D4ED8',
  },

  // Background colors
  background: {
    primary: '#0A0E1A',
    secondary: '#111827',
    card: '#1A2235',
    cardHover: '#242F47',
  },

  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#9CA3AF',
    muted: '#6B7280',
    accent: '#3B82F6',
  },

  // Status colors
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },

  // Language badge colors
  language: {
    ES: '#F59E0B', // Spanish - Gold
    FR: '#3B82F6', // French - Blue
    JP: '#10B981', // Japanese - Green
    DE: '#EF4444', // German - Red
    IT: '#8B5CF6', // Italian - Purple
    PT: '#EC4899', // Portuguese - Pink
    CN: '#F97316', // Chinese - Orange
    KR: '#06B6D4', // Korean - Cyan
  },

  // Border colors
  border: {
    light: '#374151',
    dark: '#1F2937',
  },

  // Gradient combinations
  gradients: {
    primary: ['#1E3A5F', '#0A0E1A'],
    card: ['#1A2235', '#111827'],
  },
} as const;

export type Colors = typeof colors;
