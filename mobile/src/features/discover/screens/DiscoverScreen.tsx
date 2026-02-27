import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserHeader } from '../../../components/molecules/UserHeader';
import { SearchBar } from '../../../components/molecules/SearchBar';
import { CategoryChip } from '../../../components/molecules/CategoryChip';
import { DialogueList } from '../../../components/organisms/DialogueList';
import { GenerateModal } from '../../../components/organisms/GenerateModal';
import { Text } from '../../../components/atoms/Text';
import { useAuthStore } from '../../../store/useAuthStore';
import { useDialogueStore } from '../../../store/useDialogueStore';
import { dialogueService } from '../../../api';
import { BASE_URL } from '../../../api/client';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { Category, RootStackParamList, Dialogue } from '../../../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type CategoryOption = {
  key: Category | 'for-you';
  label: string;
};

const CATEGORIES: CategoryOption[] = [
  { key: 'for-you', label: 'For You' },
  { key: 'travel', label: 'Travel' },
  { key: 'business', label: 'Business' },
  { key: 'dining', label: 'Dining' },
];

export const DiscoverScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useAuthStore();
  const {
    filteredDialogues,
    selectedCategory,
    searchQuery,
    setCategory,
    setSearchQuery,
    toggleCompleted,
    setDialogues,
  } = useDialogueStore();

  // Loading state for API
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Fetch suggestions from API on mount
  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const suggestions = await dialogueService.getSuggestions();
      console.log('=== API SUGGESTIONS ===');
      console.log('Received:', JSON.stringify(suggestions, null, 2));
      setDialogues(suggestions);
    } catch (err: any) {
      console.error('Error fetching suggestions:', JSON.stringify(err, null, 2));
      console.error('Error message:', err?.message);
      console.error('Error code:', err?.code);
      
      let message: string;
      if (err?.message?.includes('Network') || err?.message?.includes('fetch')) {
        message = `Could not connect to server.\nURL: ${BASE_URL}\n\nPlease check your internet connection and try again.`;
      } else if (err?.response?.status) {
        message = `Server error (${err.response.status}). Please try again later.`;
      } else {
        message = `Connection failed: ${err?.message || 'Unknown error'}\nURL: ${BASE_URL}`;
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryPress = (category: Category | 'for-you') => {
    setCategory(category);
  };

  const handleSearch = () => {
    // Search is already reactive through store
    console.log('Searching for:', searchQuery);
  };

  const handleDialoguePress = (dialogue: Dialogue) => {
    console.log('=== DIALOGUE PRESSED ===');
    console.log('Dialogue object:', JSON.stringify(dialogue, null, 2));
    // Navigate to topic detail with the dialogue
    navigation.navigate('TopicDetail', { topicId: dialogue.id, dialogue });
  };

  const handleGenerateMore = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleGenerate = async (topic: string) => {
    setIsGenerating(true);
    
    try {
      // Call API to generate dialogues
      const dialogues = await dialogueService.generateDialogues(topic);
      
      setIsModalVisible(false);
      setIsGenerating(false);
      
      // Navigate to generated dialogues screen
      navigation.navigate('GeneratedDialogues', {
        topic,
        dialogues,
      });
    } catch (error) {
      setIsGenerating(false);
      console.error('Error generating dialogues:', error);
      Alert.alert(
        'Error',
        'Failed to generate dialogues. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleViewAll = () => {
    console.log('View all dialogues');
    // TODO: Navigate to full list
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />
      
      <View style={styles.content}>
        {/* User Header */}
        <UserHeader
          user={user}
          onNotificationPress={() => console.log('Notifications')}
        />

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmit={handleSearch}
          />
        </View>

        {/* Category Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContent}
        >
          {CATEGORIES.map((category) => (
            <CategoryChip
              key={category.key}
              label={category.label}
              isActive={selectedCategory === category.key}
              onPress={() => handleCategoryPress(category.key)}
            />
          ))}
        </ScrollView>

        {/* Dialogue List */}
        <View style={styles.listSection}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary.main} />
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Ionicons name="cloud-offline-outline" size={48} color={colors.text.muted} />
              <Text variant="h3" color={colors.text.secondary} style={styles.errorTitle}>
                Connection Error
              </Text>
              <Text variant="body" color={colors.text.muted} style={styles.errorMessage}>
                {error}
              </Text>
              <TouchableOpacity style={styles.retryButton} onPress={fetchSuggestions}>
                <Ionicons name="refresh" size={20} color={colors.text.primary} />
                <Text variant="label" color={colors.text.primary} style={styles.retryText}>
                  Retry
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.generateFallbackButton}
                onPress={handleGenerateMore}
              >
                <Ionicons name="sparkles" size={20} color={colors.primary.main} />
                <Text variant="label" color={colors.primary.main} style={styles.retryText}>
                  Generate Dialogues Instead
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <DialogueList
              dialogues={filteredDialogues}
              title="Suggested for You"
              onViewAll={handleViewAll}
              onDialoguePress={handleDialoguePress}
              onToggleComplete={toggleCompleted}
              onGenerateMore={handleGenerateMore}
            />
          )}
        </View>
      </View>

      {/* Generate Modal */}
      <GenerateModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onGenerate={handleGenerate}
        isLoading={isGenerating}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  searchSection: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  categoryScroll: {
    flexGrow: 0,
    marginBottom: spacing.xl,
  },
  categoryContent: {
    paddingRight: spacing.lg,
  },
  listSection: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  errorTitle: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  errorMessage: {
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary.main,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  retryText: {
    marginLeft: spacing.sm,
  },
  generateFallbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary.main,
  },
});
