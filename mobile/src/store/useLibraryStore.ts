import { create } from 'zustand';
import { Topic, LibraryFilter, ConversationLine } from '../types';
import { libraryService, SavedDialogResponse } from '../api/services/libraryService';

interface LibraryState {
  topics: Topic[];
  filteredTopics: Topic[];
  selectedFilter: LibraryFilter;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchLibrary: () => Promise<void>;
  saveToLibrary: (topic: string, conversations: ConversationLine[]) => Promise<void>;
  deleteFromLibrary: (topicId: string) => Promise<void>;
  setFilter: (filter: LibraryFilter) => void;
  setSearchQuery: (query: string) => void;
  toggleFavorite: (topicId: string) => void;
  archiveTopic: (topicId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  filterTopics: () => void;
}

// Map icon based on topic name
const getTopicIcon = (topic: string): { icon: Topic['icon']; iconColor: Topic['iconColor'] } => {
  const lower = topic.toLowerCase();
  if (lower.includes('coffee') || lower.includes('cafe') || lower.includes('café'))
    return { icon: 'cafe', iconColor: 'orange' };
  if (lower.includes('job') || lower.includes('interview') || lower.includes('business') || lower.includes('work'))
    return { icon: 'briefcase', iconColor: 'blue' };
  if (lower.includes('direction') || lower.includes('map') || lower.includes('travel') || lower.includes('trip'))
    return { icon: 'map', iconColor: 'green' };
  if (lower.includes('shop') || lower.includes('grocery') || lower.includes('store') || lower.includes('market'))
    return { icon: 'cart', iconColor: 'purple' };
  if (lower.includes('airport') || lower.includes('flight') || lower.includes('plane') || lower.includes('check-in'))
    return { icon: 'airplane', iconColor: 'red' };
  if (lower.includes('restaurant') || lower.includes('dinner') || lower.includes('food') || lower.includes('order'))
    return { icon: 'restaurant', iconColor: 'teal' };
  if (lower.includes('doctor') || lower.includes('hospital') || lower.includes('health') || lower.includes('medical'))
    return { icon: 'medkit', iconColor: 'red' };
  if (lower.includes('hotel') || lower.includes('house') || lower.includes('home') || lower.includes('room'))
    return { icon: 'home', iconColor: 'green' };
  if (lower.includes('school') || lower.includes('class') || lower.includes('study') || lower.includes('learn'))
    return { icon: 'school', iconColor: 'blue' };
  // Default
  return { icon: 'chatbubbles', iconColor: 'purple' };
};

// Transform API response to Topic format
const savedDialogToTopic = (dialog: SavedDialogResponse): Topic => {
  let dialogueCount = 0;
  try {
    const conversations = JSON.parse(dialog.content);
    dialogueCount = Array.isArray(conversations) ? conversations.length : 0;
  } catch {
    dialogueCount = 0;
  }

  const { icon, iconColor } = getTopicIcon(dialog.topic);

  return {
    id: String(dialog.id),
    title: dialog.topic,
    icon,
    iconColor,
    dialogueCount,
    lastAccessed: 'Saved',
    isFavorite: false,
    isArchived: false,
  };
};

export const useLibraryStore = create<LibraryState>((set, get) => ({
  topics: [],
  filteredTopics: [],
  selectedFilter: 'all',
  searchQuery: '',
  isLoading: false,
  error: null,

  fetchLibrary: async () => {
    set({ isLoading: true, error: null });
    try {
      const dialogs = await libraryService.getLibraryDialogs();
      const topics = dialogs.map(savedDialogToTopic);
      set({ topics, isLoading: false });
      get().filterTopics();
    } catch (err) {
      console.error('Error fetching library:', err);
      set({ error: 'Failed to load library', isLoading: false });
    }
  },

  saveToLibrary: async (topic, conversations) => {
    try {
      const saved = await libraryService.saveDialog(topic, conversations);
      const newTopic = savedDialogToTopic(saved);
      set((state) => ({
        topics: [newTopic, ...state.topics],
      }));
      get().filterTopics();
    } catch (err) {
      console.error('Error saving to library:', err);
      throw err; // Re-throw so caller can handle
    }
  },

  deleteFromLibrary: async (topicId) => {
    try {
      await libraryService.deleteDialog(Number(topicId));
      set((state) => ({
        topics: state.topics.filter((t) => t.id !== topicId),
      }));
      get().filterTopics();
    } catch (err) {
      console.error('Error deleting from library:', err);
      throw err;
    }
  },

  setFilter: (filter) => {
    set({ selectedFilter: filter });
    get().filterTopics();
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().filterTopics();
  },

  toggleFavorite: (topicId) => {
    set((state) => ({
      topics: state.topics.map((t) =>
        t.id === topicId ? { ...t, isFavorite: !t.isFavorite } : t
      ),
    }));
    get().filterTopics();
  },

  archiveTopic: (topicId) => {
    set((state) => ({
      topics: state.topics.map((t) =>
        t.id === topicId ? { ...t, isArchived: !t.isArchived } : t
      ),
    }));
    get().filterTopics();
  },

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  filterTopics: () => {
    const { topics, selectedFilter, searchQuery } = get();

    let filtered = [...topics];

    // Filter by category
    switch (selectedFilter) {
      case 'recent':
        filtered = filtered.slice(0, 3);
        break;
      case 'favorites':
        filtered = filtered.filter((t) => t.isFavorite);
        break;
      case 'archived':
        filtered = filtered.filter((t) => t.isArchived);
        break;
      case 'all':
      default:
        filtered = filtered.filter((t) => !t.isArchived);
        break;
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((t) =>
        t.title.toLowerCase().includes(query)
      );
    }

    set({ filteredTopics: filtered });
  },
}));
