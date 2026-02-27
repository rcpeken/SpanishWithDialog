import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../atoms/Text';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';

interface ToggleButtonProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  label,
  isActive,
  onPress,
  icon = 'eye',
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, isActive && styles.activeButton, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons
        name={isActive ? icon : `${icon}-off` as keyof typeof Ionicons.glyphMap}
        size={18}
        color={isActive ? colors.text.primary : colors.text.secondary}
        style={styles.icon}
      />
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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.border.dark,
  },
  activeButton: {
    backgroundColor: colors.background.cardHover,
    borderColor: colors.border.light,
  },
  icon: {
    marginRight: spacing.sm,
  },
});
