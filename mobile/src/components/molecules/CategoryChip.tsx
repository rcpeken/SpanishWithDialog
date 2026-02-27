import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Text } from '../atoms/Text';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

interface CategoryChipProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

export const CategoryChip: React.FC<CategoryChipProps> = ({
  label,
  isActive,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        isActive ? styles.activeChip : styles.inactiveChip,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        variant="label"
        color={isActive ? colors.text.primary : colors.text.secondary}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
  },
  activeChip: {
    backgroundColor: colors.primary.main,
  },
  inactiveChip: {
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.border.dark,
  },
});
