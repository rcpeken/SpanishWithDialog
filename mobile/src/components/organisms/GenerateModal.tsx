import React, { useState } from 'react';
import {
  View,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface GenerateModalProps {
  visible: boolean;
  onClose: () => void;
  onGenerate: (topic: string) => void;
  isLoading?: boolean;
}

const SUGGESTIONS = [
  'At the Restaurant',
  'Shopping for Clothes',
  'Doctor\'s Appointment',
  'Hotel Check-in',
  'Asking for Help',
  'Making Friends',
];

export const GenerateModal: React.FC<GenerateModalProps> = ({
  visible,
  onClose,
  onGenerate,
  isLoading = false,
}) => {
  const [topic, setTopic] = useState('');

  const handleGenerate = () => {
    if (topic.trim()) {
      onGenerate(topic.trim());
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    setTopic(suggestion);
  };

  const handleClose = () => {
    setTopic('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.keyboardView}
            >
              <View style={styles.container}>
                {/* Handle bar */}
                <View style={styles.handleBar} />

                {/* Header */}
                <View style={styles.header}>
                  <View style={styles.headerIcon}>
                    <Ionicons
                      name="sparkles"
                      size={24}
                      color={colors.primary.main}
                    />
                  </View>
                  <Text variant="h3" color={colors.text.primary}>
                    Generate Dialogues
                  </Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={handleClose}
                  >
                    <Ionicons
                      name="close"
                      size={24}
                      color={colors.text.secondary}
                    />
                  </TouchableOpacity>
                </View>

                {/* Description */}
                <Text
                  variant="body"
                  color={colors.text.secondary}
                  style={styles.description}
                >
                  Enter a topic and we'll generate 20 Spanish dialogues for you
                  to practice.
                </Text>

                {/* Input */}
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="create-outline"
                    size={20}
                    color={colors.text.muted}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    value={topic}
                    onChangeText={setTopic}
                    placeholder="e.g., Ordering at a Coffee Shop"
                    placeholderTextColor={colors.text.muted}
                    autoFocus
                    editable={!isLoading}
                  />
                  {topic.length > 0 && !isLoading && (
                    <TouchableOpacity onPress={() => setTopic('')}>
                      <Ionicons
                        name="close-circle"
                        size={20}
                        color={colors.text.muted}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                {/* Suggestions */}
                <View style={styles.suggestionsSection}>
                  <Text
                    variant="labelSmall"
                    color={colors.text.muted}
                    style={styles.suggestionsLabel}
                  >
                    SUGGESTIONS
                  </Text>
                  <View style={styles.suggestionsGrid}>
                    {SUGGESTIONS.map((suggestion, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.suggestionChip}
                        onPress={() => handleSuggestionPress(suggestion)}
                        disabled={isLoading}
                      >
                        <Text variant="bodySmall" color={colors.text.secondary}>
                          {suggestion}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Generate Button */}
                <TouchableOpacity
                  style={[
                    styles.generateButton,
                    (!topic.trim() || isLoading) && styles.generateButtonDisabled,
                  ]}
                  onPress={handleGenerate}
                  disabled={!topic.trim() || isLoading}
                >
                  {isLoading ? (
                    <>
                      <ActivityIndicator
                        color={colors.text.primary}
                        style={styles.loadingIcon}
                      />
                      <Text variant="button" color={colors.text.primary}>
                        Generating...
                      </Text>
                    </>
                  ) : (
                    <>
                      <Ionicons
                        name="sparkles"
                        size={20}
                        color={colors.text.primary}
                        style={styles.buttonIcon}
                      />
                      <Text variant="button" color={colors.text.primary}>
                        Generate Dialogues
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  keyboardView: {
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.background.secondary,
    borderTopLeftRadius: borderRadius['2xl'],
    borderTopRightRadius: borderRadius['2xl'],
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing['4xl'],
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: colors.border.light,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  headerIcon: {
    marginRight: spacing.sm,
  },
  closeButton: {
    marginLeft: 'auto',
    padding: spacing.xs,
  },
  description: {
    marginBottom: spacing.xl,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.dark,
    marginBottom: spacing.xl,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.text.primary,
    ...typography.body,
  },
  suggestionsSection: {
    marginBottom: spacing.xl,
  },
  suggestionsLabel: {
    marginBottom: spacing.sm,
    letterSpacing: 1,
  },
  suggestionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  suggestionChip: {
    backgroundColor: colors.background.card,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border.dark,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.main,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
  },
  generateButtonDisabled: {
    opacity: 0.5,
  },
  buttonIcon: {
    marginRight: spacing.sm,
  },
  loadingIcon: {
    marginRight: spacing.sm,
  },
});
