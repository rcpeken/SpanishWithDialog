import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../atoms/Text';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { ConversationLine } from '../../types';

interface ConversationCardProps {
  conversation: ConversationLine;
  showTranslation?: boolean;
  showPronunciation?: boolean;
}

export const ConversationCard: React.FC<ConversationCardProps> = ({
  conversation,
  showTranslation = true,
  showPronunciation = true,
}) => {
  const { spanish, pronunciation, english } = conversation;

  return (
    <View style={styles.card}>
      {/* Spanish Section */}
      <View style={styles.section}>
        <Text variant="labelSmall" color={colors.text.muted} style={styles.label}>
          SPANISH
        </Text>
        <Text variant="h4" color={colors.text.primary} style={styles.spanishText}>
          {spanish}
        </Text>
      </View>

      {/* Pronunciation Section */}
      {showPronunciation && (
        <View style={styles.section}>
          <Text variant="labelSmall" color={colors.text.muted} style={styles.label}>
            PRONUNCIATION
          </Text>
          <Text variant="body" color={colors.primary.light} style={styles.pronunciationText}>
            {pronunciation}
          </Text>
        </View>
      )}

      {/* English Section */}
      {showTranslation && (
        <View style={styles.section}>
          <Text variant="labelSmall" color={colors.text.muted} style={styles.label}>
            ENGLISH
          </Text>
          <Text variant="body" color={colors.text.secondary} style={styles.englishText}>
            {english}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.card,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.dark,
  },
  section: {
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: spacing.xs,
    letterSpacing: 1,
  },
  spanishText: {
    lineHeight: 28,
  },
  pronunciationText: {
    fontFamily: 'monospace',
    lineHeight: 24,
  },
  englishText: {
    fontStyle: 'italic',
    lineHeight: 22,
  },
});
