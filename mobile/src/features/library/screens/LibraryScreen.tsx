import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenHeader } from '../../../components/molecules/ScreenHeader';
import { CategoryChip } from '../../../components/molecules/CategoryChip';
import { TopicCard } from '../../../components/molecules/TopicCard';
import { Text } from '../../../components/atoms/Text';
import { useLibraryStore } from '../../../store/useLibraryStore';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { LibraryFilter, Topic, RootStackParamList } from '../../../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type FilterOption = {
  key: LibraryFilter;
  label: string;
};

const FILTERS: FilterOption[] = [
  { key: 'all', label: 'All Topics' },
  { key: 'recent', label: 'Recent' },
  { key: 'favorites', label: 'Favorites' },
  { key: 'archived', label: 'Archived' },
];

export const LibraryScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const {
    filteredTopics,
    selectedFilter,
    isLoading,
    error,
    setFilter,
    fetchLibrary,
    deleteFromLibrary,
  } = useLibraryStore();

  // Fetch library data on mount
  useEffect(() => {
    fetchLibrary();
  }, []);

  const handleFilterPress = (filter: LibraryFilter) => {
    setFilter(filter);
  };

  const handleTopicPress = (topic: Topic) => {
    navigation.navigate('TopicDetail', { topicId: topic.id });
  };

  const handleSearchPress = () => {
    console.log('Search pressed');
    // TODO: Open search modal/screen
  };

  const handleDeleteTopic = (topic: Topic) => {
    Alert.alert(
      'Delete Dialogue',
      `"${topic.title}" will be permanently deleted. Are you sure?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteFromLibrary(topic.id);
            } catch (err) {
              Alert.alert('Error', 'Failed to delete dialogue.');
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />

      <View style={styles.content}>
        {/* Header */}
        <ScreenHeader
          title="My Library"
          showSearch
          onSearchPress={handleSearchPress}
        />

        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContent}
        >
          {FILTERS.map((filter) => (
            <CategoryChip
              key={filter.key}
              label={filter.label}
              isActive={selectedFilter === filter.key}
              onPress={() => handleFilterPress(filter.key)}
            />
          ))}
        </ScrollView>

        {/* Topic List */}
        {isLoading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={colors.primary.main} />
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Text variant="body" color={colors.text.secondary}>
              {error}
            </Text>
          </View>
        ) : filteredTopics.length === 0 ? (
          <View style={styles.centerContainer}>
            <Text variant="body" color={colors.text.secondary}>
              No saved dialogues yet.{'\n'}Generate dialogues from Discover!
            </Text>
          </View>
        ) : (
          <ScrollView
            style={styles.list}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          >
            {filteredTopics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                onPress={() => handleTopicPress(topic)}
                onDelete={() => handleDeleteTopic(topic)}
              />
            ))}
          </ScrollView>
        )}
      </View>
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
  filterScroll: {
    flexGrow: 0,
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  filterContent: {
    paddingRight: spacing.lg,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 100, // Space for FAB
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
});
