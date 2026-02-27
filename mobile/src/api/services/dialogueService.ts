import { apiRequest, fetchRequest } from '../client';
import { Dialogue, DialogueFilters, ApiResponse, ConversationLine } from '../../types';

const ENDPOINTS = {
  dialogues: '/dialogues',
  dialogue: (id: string) => `/dialogues/${id}`,
  suggestions: '/suggestions', // Backend: @RequestMapping("/api/suggestions")
  scenario: '/scenario', // Backend: @RequestMapping("/api/scenario")
};

// API Response type for generated dialogues
export interface GenerateResponse {
  spanish: string;
  pronunciation: string;
  english: string;
}

// API Response type for suggestions from backend
// Backend returns: { id, topic, content (JSON string) }
export interface SuggestionResponse {
  id: number;
  topic: string;
  content: string; // JSON stringified array of { spanish, pronunciation, english }
}

// Parsed content item from suggestion
export interface ContentItem {
  spanish: string;
  pronunciation: string;
  english: string;
}

// Helper: transform SuggestionResponse[] to Dialogue[]
const transformSuggestions = (response: SuggestionResponse[]): Dialogue[] => {
  return response.map((item) => {
    let conversations: ContentItem[] = [];
    try {
      conversations = JSON.parse(item.content);
    } catch (e) {
      console.error('Error parsing content:', e);
    }

    const firstConvo = conversations[0] || { spanish: '', pronunciation: '', english: '' };

    return {
      id: String(item.id),
      title: item.topic,
      spanish: firstConvo.spanish,
      pronounce: firstConvo.pronunciation,
      english: firstConvo.english,
      language: 'ES' as const,
      category: 'travel' as const,
      isCompleted: false,
      conversations,
    };
  });
};

export const dialogueService = {
  // Get all dialogues with optional filters
  getDialogues: async (filters?: DialogueFilters): Promise<Dialogue[]> => {
    const params = new URLSearchParams();
    
    if (filters?.category) params.append('category', filters.category);
    if (filters?.language) params.append('language', filters.language);
    if (filters?.search) params.append('search', filters.search);
    
    return apiRequest<Dialogue[]>({
      method: 'GET',
      url: ENDPOINTS.dialogues,
      params,
    });
  },

  // Get single dialogue by ID
  getDialogue: async (id: string): Promise<Dialogue> => {
    return apiRequest<Dialogue>({
      method: 'GET',
      url: ENDPOINTS.dialogue(id),
    });
  },

  // Get suggested dialogues from backend
  // Uses fetch as primary (more reliable on RN), falls back to axios
  getSuggestions: async (): Promise<Dialogue[]> => {
    console.log('=== FETCHING SUGGESTIONS ===');
    
    try {
      // Primary: use fetch API (more reliable on React Native)
      const response = await fetchRequest<SuggestionResponse[]>({
        method: 'GET',
        url: ENDPOINTS.suggestions,
      });

      console.log('=== SUGGESTIONS (fetch) ===');
      console.log('Received:', response.length, 'items');
      return transformSuggestions(response);
    } catch (fetchErr) {
      console.warn('[getSuggestions] fetch failed, trying axios:', fetchErr);
      
      // Fallback: try axios
      const response = await apiRequest<SuggestionResponse[]>({
        method: 'GET',
        url: ENDPOINTS.suggestions,
      });

      console.log('=== SUGGESTIONS (axios) ===');
      console.log('Received:', response.length, 'items');
      return transformSuggestions(response);
    }
  },

  // Generate new dialogues using AI
  // Uses fetch as primary, falls back to axios
  generateDialogues: async (topic: string): Promise<ConversationLine[]> => {
    console.log('=== GENERATING DIALOGUES ===');
    console.log('Topic:', topic);

    let response: ContentItem[];
    
    try {
      // Primary: use fetch API
      response = await fetchRequest<ContentItem[]>({
        method: 'POST',
        url: ENDPOINTS.scenario,
        data: { topic },
      });
      console.log('=== GENERATE (fetch) OK ===');
    } catch (fetchErr) {
      console.warn('[generateDialogues] fetch failed, trying axios:', fetchErr);
      response = await apiRequest<ContentItem[]>({
        method: 'POST',
        url: ENDPOINTS.scenario,
        data: { topic },
      });
      console.log('=== GENERATE (axios) OK ===');
    }

    console.log('Received', response.length, 'conversations');

    return response.map((item, index) => ({
      id: `gen-${Date.now()}-${index}`,
      spanish: item.spanish,
      pronunciation: item.pronunciation,
      english: item.english,
    }));
  },

  // Mark dialogue as completed
  markCompleted: async (id: string): Promise<void> => {
    return apiRequest<void>({
      method: 'POST',
      url: `${ENDPOINTS.dialogue(id)}/complete`,
    });
  },
};
