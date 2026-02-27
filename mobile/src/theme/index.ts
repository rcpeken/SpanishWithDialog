export { colors } from './colors';
export { typography } from './typography';
export { spacing, borderRadius, iconSize } from './spacing';

import { colors } from './colors';
import { typography } from './typography';
import { spacing, borderRadius, iconSize } from './spacing';

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  iconSize,
} as const;

export type Theme = typeof theme;
