import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { DetailHeader } from '../../../components/molecules/DetailHeader';
import { ConversationCard } from '../../../components/molecules/ConversationCard';
import { Text } from '../../../components/atoms/Text';
import { useLibraryStore } from '../../../store/useLibraryStore';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius } from '../../../theme/spacing';
import { RootStackParamList, ConversationLine } from '../../../types';

type Props = NativeStackScreenProps<RootStackParamList, 'GeneratedDialogues'>;

export const GeneratedDialoguesScreen: React.FC<Props> = ({ navigation, route }) => {
  const { topic, dialogues } = route.params;
  const { saveToLibrary } = useLibraryStore();
  
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const [selectMode, setSelectMode] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSaveAll = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      await saveToLibrary(topic, dialogues);
      setIsSaved(true);
      Alert.alert('Success', 'All dialogues saved to library!', [
        { text: 'OK', onPress: () => navigation.navigate('MainTabs') },
      ]);
    } catch (err) {
      console.error('Error saving dialogues:', err);
      Alert.alert('Error', 'Failed to save dialogues. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleSelect = (index: number) => {
    const newSelected = new Set(selectedIndices);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedIndices(newSelected);
  };

  const handleSaveSelected = async () => {
    if (isSaving) return;
    setIsSaving(true);
    const selectedDialogues = dialogues.filter((_, index) => selectedIndices.has(index));
    try {
      await saveToLibrary(topic, selectedDialogues);
      Alert.alert('Success', `${selectedDialogues.length} dialogues saved to library!`, [
        { text: 'OK', onPress: () => navigation.navigate('MainTabs') },
      ]);
    } catch (err) {
      console.error('Error saving selected dialogues:', err);
      Alert.alert('Error', 'Failed to save dialogues. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    setSelectedIndices(new Set());
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />

      {/* Header */}
      <DetailHeader
        title={topic}
        subtitle={`${dialogues.length} Dialogues Generated`}
        onBack={handleBack}
      />

      {/* Action Bar */}
      <View style={styles.actionBar}>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={toggleSelectMode}
        >
          <Ionicons
            name={selectMode ? 'checkmark-circle' : 'checkmark-circle-outline'}
            size={20}
            color={selectMode ? colors.primary.main : colors.text.secondary}
          />
          <Text
            variant="label"
            color={selectMode ? colors.primary.main : colors.text.secondary}
            style={styles.selectText}
          >
            {selectMode ? `${selectedIndices.size} Selected` : 'Select'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.saveButton,
            ((selectMode && selectedIndices.size === 0) || isSaving) && styles.saveButtonDisabled,
          ]}
          onPress={selectMode ? handleSaveSelected : handleSaveAll}
          disabled={(selectMode && selectedIndices.size === 0) || isSaving}
        >
          <Ionicons
            name="add-circle"
            size={20}
            color={colors.text.primary}
            style={styles.saveIcon}
          />
          <Text variant="label" color={colors.text.primary}>
            {isSaving
              ? 'Saving...'
              : selectMode
              ? 'Add Selected'
              : 'Add All to Library'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Dialogues List */}
      <ScrollView
        style={styles.list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {dialogues.map((dialogue, index) => (
          <TouchableOpacity
            key={dialogue.id || index}
            activeOpacity={selectMode ? 0.7 : 1}
            onPress={() => selectMode && handleToggleSelect(index)}
          >
            <View
              style={[
                styles.cardWrapper,
                selectMode && selectedIndices.has(index) && styles.cardSelected,
              ]}
            >
              {selectMode && (
                <View style={styles.checkbox}>
                  <Ionicons
                    name={
                      selectedIndices.has(index)
                        ? 'checkmark-circle'
                        : 'ellipse-outline'
                    }
                    size={24}
                    color={
                      selectedIndices.has(index)
                        ? colors.primary.main
                        : colors.text.muted
                    }
                  />
                </View>
              )}
              <View style={[styles.cardContent, selectMode && styles.cardContentWithCheckbox]}>
                <ConversationCard
                  conversation={dialogue}
                  showTranslation={true}
                  showPronunciation={true}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.dark,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectText: {
    marginLeft: spacing.xs,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary.main,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveIcon: {
    marginRight: spacing.xs,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: spacing['3xl'],
  },
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardSelected: {
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
  },
  checkbox: {
    paddingLeft: spacing.lg,
    paddingTop: spacing.xl,
  },
  cardContent: {
    flex: 1,
  },
  cardContentWithCheckbox: {
    flex: 1,
  },
});
