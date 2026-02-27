import React, { useState, useMemo, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DetailHeader } from '../../../components/molecules/DetailHeader';
import { ToggleButton } from '../../../components/molecules/ToggleButton';
import { ConversationCard } from '../../../components/molecules/ConversationCard';
import { Text } from '../../../components/atoms/Text';
import { libraryService } from '../../../api/services/libraryService';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { RootStackParamList, ConversationLine, TopicDetail } from '../../../types';

type Props = NativeStackScreenProps<RootStackParamList, 'TopicDetail'>;

export const TopicDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { topicId, dialogue } = route.params;
  
  console.log('=== TOPIC DETAIL SCREEN ===');
  console.log('topicId:', topicId);
  console.log('dialogue:', JSON.stringify(dialogue, null, 2));
  
  // State
  const [showTranslations, setShowTranslations] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoadingFromLibrary, setIsLoadingFromLibrary] = useState(false);
  const [libraryDetail, setLibraryDetail] = useState<TopicDetail | null>(null);

  // If navigating from library (no dialogue passed), fetch saved dialog from API
  useEffect(() => {
    if (!dialogue) {
      fetchSavedDialog();
    }
  }, [topicId, dialogue]);

  const fetchSavedDialog = async () => {
    setIsLoadingFromLibrary(true);
    try {
      const dialogs = await libraryService.getLibraryDialogs();
      const savedDialog = dialogs.find((d) => String(d.id) === topicId);
      
      if (savedDialog) {
        let conversations: ConversationLine[] = [];
        try {
          const parsed = JSON.parse(savedDialog.content);
          conversations = parsed.map((conv: any, index: number) => ({
            id: `${savedDialog.id}-${index}`,
            spanish: conv.spanish,
            pronunciation: conv.pronunciation,
            english: conv.english,
          }));
        } catch (e) {
          console.error('Error parsing saved dialog content:', e);
        }

        setLibraryDetail({
          id: String(savedDialog.id),
          title: savedDialog.topic,
          chapter: 1,
          mode: 'study',
          isSaved: true,
          conversations,
        });
      }
    } catch (err) {
      console.error('Error fetching saved dialog:', err);
    } finally {
      setIsLoadingFromLibrary(false);
    }
  };

  // If dialogue is passed from Discover, use it; otherwise use library data
  const topicDetail = useMemo(() => {
    if (dialogue) {
      // Use conversations array from API if available
      const conversations = dialogue.conversations?.map((conv, index) => ({
        id: `${dialogue.id}-${index}`,
        spanish: conv.spanish,
        pronunciation: conv.pronunciation,
        english: conv.english,
      })) || [
        // Fallback to single conversation from dialogue fields
        {
          id: dialogue.id,
          spanish: dialogue.spanish,
          pronunciation: dialogue.pronounce,
          english: dialogue.english,
        },
      ];

      return {
        id: dialogue.id,
        title: dialogue.title || 'Dialogue',
        chapter: 1,
        mode: 'study' as const,
        isSaved: false,
        conversations,
      };
    }
    return libraryDetail;
  }, [dialogue, libraryDetail]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleToggleSave = () => {
    setIsSaved(!isSaved);
  };

  const toggleTranslations = () => {
    setShowTranslations(!showTranslations);
  };

  const subtitle = topicDetail
    ? `Chapter ${topicDetail.chapter} • ${
        topicDetail.mode.charAt(0).toUpperCase() + topicDetail.mode.slice(1)
      } Mode`
    : '';

  if (isLoadingFromLibrary) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar style="light" />
        <DetailHeader
          title="Loading..."
          subtitle=""
          onBack={handleBack}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary.main} />
        </View>
      </SafeAreaView>
    );
  }

  if (!topicDetail) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar style="light" />
        <DetailHeader
          title="Not Found"
          subtitle=""
          onBack={handleBack}
        />
        <View style={styles.loadingContainer}>
          <Text variant="body" color={colors.text.secondary}>
            Dialog not found.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />

      {/* Header */}
      <DetailHeader
        title={topicDetail.title}
        subtitle={subtitle}
        onBack={handleBack}
        isSaved={isSaved}
        onToggleSave={handleToggleSave}
      />

      {/* Toggle Button */}
      <View style={styles.toggleContainer}>
        <ToggleButton
          label={showTranslations ? 'Hide Translations' : 'Show Translations'}
          isActive={!showTranslations}
          onPress={toggleTranslations}
          icon="eye"
        />
      </View>

      {/* Conversations List */}
      <ScrollView
        style={styles.list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {topicDetail.conversations.map((conversation) => (
          <ConversationCard
            key={conversation.id}
            conversation={conversation}
            showTranslation={showTranslations}
            showPronunciation={true}
          />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleContainer: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: spacing['3xl'],
  },
});
