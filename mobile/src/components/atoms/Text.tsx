import React from 'react';
import { Text as RNText, TextStyle, StyleSheet } from 'react-native';
import { typography } from '../../theme/typography';
import { colors } from '../../theme/colors';

type TypographyVariant = keyof typeof typography;

interface TextProps {
  children: React.ReactNode;
  variant?: TypographyVariant;
  color?: string;
  style?: TextStyle | TextStyle[];
  numberOfLines?: number;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  color = colors.text.primary,
  style,
  numberOfLines,
}) => {
  return (
    <RNText
      style={[typography[variant], { color }, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
};
