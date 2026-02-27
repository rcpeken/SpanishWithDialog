import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Text } from './Text';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';
import { LanguageCode } from '../../types';

interface LanguageBadgeProps {
  language: LanguageCode;
  style?: ViewStyle;
}

export const LanguageBadge: React.FC<LanguageBadgeProps> = ({
  language,
  style,
}) => {
  const badgeColor = colors.language[language] || colors.primary.main;

  return (
    <View style={[styles.badge, { backgroundColor: badgeColor }, style]}>
      <Text variant="labelSmall" color={colors.text.primary}>
        {language}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
  },
});
