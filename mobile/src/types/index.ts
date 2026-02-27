// Conversation item from API content
export interface DialogueConversation {
  spanish: string;
  pronunciation: string;
  english: string;
}

// API Response Types
export interface Dialogue {
  id: string;
  spanish: string;
  pronounce: string;
  english: string;
  language: LanguageCode;
  category: Category;
  title: string;
  isCompleted?: boolean;
  conversations?: DialogueConversation[]; // All conversations from API content
}

export type LanguageCode = 'ES' | 'FR' | 'JP' | 'DE' | 'IT' | 'PT' | 'CN' | 'KR';

export type Category = 'travel' | 'business' | 'dining' | 'social' | 'shopping' | 'health';

export interface User {
  id: string;
  name: string;
  avatar?: string;
  preferredLanguages: LanguageCode[];
  completedDialogues: string[];
}

// Navigation Types
export type RootStackParamList = {
  MainTabs: undefined;
  DialogueDetail: { dialogueId: string; dialogue?: Dialogue };
  TopicDetail: { topicId: string; dialogue?: Dialogue };
  GeneratedDialogues: { topic: string; dialogues: ConversationLine[] };
  Settings: undefined;
};

export type MainTabParamList = {
  Discover: undefined;
  Library: undefined;
};

// API Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface DialogueFilters {
  category?: Category;
  language?: LanguageCode;
  search?: string;
}

// Topic Types (Library)
export type TopicIconName = 
  | 'cafe' 
  | 'briefcase' 
  | 'map' 
  | 'cart' 
  | 'airplane' 
  | 'restaurant'
  | 'chatbubbles'
  | 'medkit'
  | 'home'
  | 'school';

export type TopicIconColor = 
  | 'orange' 
  | 'blue' 
  | 'green' 
  | 'purple' 
  | 'red' 
  | 'teal';

export interface Topic {
  id: string;
  title: string;
  icon: TopicIconName;
  iconColor: TopicIconColor;
  dialogueCount: number;
  lastAccessed: string; // relative time like "Just now", "2 hrs ago"
  isFavorite?: boolean;
  isArchived?: boolean;
}

export type LibraryFilter = 'all' | 'recent' | 'favorites' | 'archived';

// Conversation Types (Study Mode)
export interface ConversationLine {
  id: string;
  spanish: string;
  pronunciation: string;
  english: string;
  speaker?: 'A' | 'B'; // For dialogue context
}

export interface TopicDetail {
  id: string;
  title: string;
  chapter: number;
  mode: 'study' | 'practice' | 'quiz';
  isSaved: boolean;
  conversations: ConversationLine[];
}

// Saved Dialog from API
export interface SavedDialog {
  id: number;
  deviceId: string;
  topic: string;
  content: string; // JSON string of ConversationLine[]
}
