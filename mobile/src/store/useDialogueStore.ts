import { create } from 'zustand';
import { Dialogue, Category, LanguageCode } from '../types';

interface DialogueState {
  dialogues: Dialogue[];
  filteredDialogues: Dialogue[];
  selectedCategory: Category | 'for-you' | null;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;

  // Actions
  setDialogues: (dialogues: Dialogue[]) => void;
  setCategory: (category: Category | 'for-you' | null) => void;
  setSearchQuery: (query: string) => void;
  toggleCompleted: (dialogueId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  filterDialogues: () => void;
}

// Mock data - Spanish only
const mockDialogues: Dialogue[] = [
  {
    id: '1',
    title: 'Check-in Counter',
    spanish: 'Buenos días, tengo una reservación para el vuelo a Madrid.',
    pronounce: 'BWEH-nohs DEE-ahs, TEHN-goh OO-nah reh-sehr-bah-SYOHN PAH-rah ehl BWEH-loh ah mah-DREED',
    english: 'Good morning, I have a reservation for the flight to Madrid.',
    language: 'ES',
    category: 'travel',
    isCompleted: false,
  },
  {
    id: '2',
    title: 'Ordering Coffee',
    spanish: '¿Me podría dar un café con leche y azúcar, por favor?',
    pronounce: 'meh poh-DREE-ah dahr oon kah-FEH kohn LEH-cheh ee ah-SOO-kahr, pohr fah-BOHR',
    english: 'Could you give me a coffee with milk and sugar, please?',
    language: 'ES',
    category: 'dining',
    isCompleted: false,
  },
  {
    id: '3',
    title: 'Asking Directions',
    spanish: 'Disculpe, ¿dónde está la estación de metro más cercana?',
    pronounce: 'dees-KOOL-peh, DOHN-deh ehs-TAH lah ehs-tah-SYOHN deh MEH-troh mahs sehr-KAH-nah',
    english: 'Excuse me, where is the nearest subway station?',
    language: 'ES',
    category: 'travel',
    isCompleted: false,
  },
  {
    id: '4',
    title: 'Meeting Someone',
    spanish: 'Mucho gusto. Me llamo Carlos. Encantado de conocerle.',
    pronounce: 'MOO-choh GOOS-toh. meh YAH-moh KAHR-lohs. ehn-kahn-TAH-doh deh koh-noh-SEHR-leh',
    english: 'Nice to meet you. My name is Carlos. Pleased to meet you.',
    language: 'ES',
    category: 'business',
    isCompleted: true,
  },
];

export const useDialogueStore = create<DialogueState>((set, get) => ({
  dialogues: mockDialogues,
  filteredDialogues: mockDialogues,
  selectedCategory: 'for-you',
  searchQuery: '',
  isLoading: false,
  error: null,

  setDialogues: (dialogues) => {
    set({ dialogues });
    get().filterDialogues();
  },

  setCategory: (category) => {
    set({ selectedCategory: category });
    get().filterDialogues();
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().filterDialogues();
  },

  toggleCompleted: (dialogueId) => {
    set((state) => ({
      dialogues: state.dialogues.map((d) =>
        d.id === dialogueId ? { ...d, isCompleted: !d.isCompleted } : d
      ),
    }));
    get().filterDialogues();
  },

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  filterDialogues: () => {
    const { dialogues, selectedCategory, searchQuery } = get();
    
    let filtered = [...dialogues];
    
    // Filter by category (skip for 'for-you' - show all)
    if (selectedCategory && selectedCategory !== 'for-you') {
      filtered = filtered.filter((d) => d.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.title.toLowerCase().includes(query) ||
          d.spanish.toLowerCase().includes(query) ||
          d.english.toLowerCase().includes(query)
      );
    }
    
    set({ filteredDialogues: filtered });
  },
}));
