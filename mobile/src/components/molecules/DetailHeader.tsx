import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../atoms/Text';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';

interface DetailHeaderProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

export const DetailHeader: React.FC<DetailHeaderProps> = ({
  title,
  subtitle,
  onBack,
  isSaved = false,
  onToggleSave,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Ionicons name="chevron-back" size={24} color={colors.text.primary} />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text variant="h4" color={colors.text.primary} style={styles.title}>
          {title}
        </Text>
        {subtitle && (
          <Text variant="bodySmall" color={colors.text.secondary}>
            {subtitle}
          </Text>
        )}
      </View>

      {onToggleSave && (
        <TouchableOpacity style={styles.saveButton} onPress={onToggleSave}>
          <Ionicons
            name={isSaved ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={isSaved ? colors.primary.main : colors.text.primary}
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
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  saveButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
