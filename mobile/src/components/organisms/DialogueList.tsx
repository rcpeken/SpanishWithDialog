import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../atoms/Text';
import { DialogueCard } from '../molecules/DialogueCard';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { Dialogue } from '../../types';

interface DialogueListProps {
  dialogues: Dialogue[];
  title: string;
  onViewAll?: () => void;
  onDialoguePress?: (dialogue: Dialogue) => void;
  onToggleComplete?: (dialogueId: string) => void;
  showGenerateButton?: boolean;
  onGenerateMore?: () => void;
}

export const DialogueList: React.FC<DialogueListProps> = ({
  dialogues,
  title,
  onViewAll,
  onDialoguePress,
  onToggleComplete,
  showGenerateButton = true,
  onGenerateMore,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="h3" color={colors.text.primary}>
          {title}
        </Text>
        {onViewAll && (
          <TouchableOpacity onPress={onViewAll}>
            <Text variant="label" color={colors.primary.main}>
              View All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        style={styles.list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {dialogues.map((dialogue) => (
          <DialogueCard
            key={dialogue.id}
            dialogue={dialogue}
            onPress={() => onDialoguePress?.(dialogue)}
            onToggleComplete={() => onToggleComplete?.(dialogue.id)}
          />
        ))}

        {showGenerateButton && (
          <TouchableOpacity
            style={styles.generateButton}
            onPress={onGenerateMore}
          >
            <Ionicons
              name="sparkles"
              size={20}
              color={colors.text.secondary}
              style={styles.sparkleIcon}
            />
            <Text variant="label" color={colors.text.secondary}>
              Generate more dialogues
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: spacing['3xl'],
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border.dark,
    borderRadius: 16,
    borderStyle: 'dashed',
  },
  sparkleIcon: {
    marginRight: spacing.sm,
  },
});
