import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../atoms/Text';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';

interface ScreenHeaderProps {
  title: string;
  showSearch?: boolean;
  onSearchPress?: () => void;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  showSearch = false,
  onSearchPress,
  rightIcon,
  onRightPress,
}) => {
  return (
    <View style={styles.container}>
      <Text variant="h1" color={colors.text.primary}>
        {title}
      </Text>
      {(showSearch || rightIcon) && (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={showSearch ? onSearchPress : onRightPress}
        >
          <Ionicons
            name={showSearch ? 'search' : rightIcon!}
            size={24}
            color={colors.text.primary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: colors.background.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border.dark,
  },
});
