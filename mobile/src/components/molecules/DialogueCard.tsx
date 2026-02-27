import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../atoms/Text';
import { LanguageBadge } from '../atoms/LanguageBadge';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';
import { Dialogue } from '../../types';

interface DialogueCardProps {
  dialogue: Dialogue;
  onPress?: () => void;
  onToggleComplete?: () => void;
}

export const DialogueCard: React.FC<DialogueCardProps> = ({
  dialogue,
  onPress,
  onToggleComplete,
}) => {
  const { title, spanish, english, language, isCompleted } = dialogue;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <LanguageBadge language={language} />
        <View style={styles.headerRight}>
          <Text variant="h4" color={colors.text.primary} style={styles.title}>
            {title}
          </Text>
          <TouchableOpacity
            style={[
              styles.actionButton,
              isCompleted && styles.completedButton,
            ]}
            onPress={onToggleComplete}
          >
            {isCompleted ? (
              <Ionicons
                name="checkmark"
                size={18}
                color={colors.text.primary}
              />
            ) : (
              <Ionicons name="add" size={18} color={colors.text.primary} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Text variant="body" color={colors.text.primary} style={styles.phrase}>
          "{spanish}"
        </Text>
        <View style={styles.translationContainer}>
          <View style={styles.translationBar} />
          <Text
            variant="bodySmall"
            color={colors.text.secondary}
            style={styles.translation}
          >
            "{english}"
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.dark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: spacing.md,
  },
  title: {
    flex: 1,
  },
  actionButton: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.full,
    backgroundColor: colors.background.cardHover,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  completedButton: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  content: {
    paddingLeft: spacing.xs,
  },
  phrase: {
    marginBottom: spacing.sm,
    fontStyle: 'normal',
  },
  translationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  translationBar: {
    width: 3,
    backgroundColor: colors.primary.main,
    borderRadius: 2,
    marginRight: spacing.sm,
    alignSelf: 'stretch',
    minHeight: 16,
  },
  translation: {
    flex: 1,
    fontStyle: 'italic',
  },
});
