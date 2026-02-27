import { apiRequest, fetchRequest } from '../client';
import { getDeviceId } from '../../utils/deviceId';
import { ConversationLine } from '../../types';

const ENDPOINTS = {
  dialogs: '/library/dialogs',
  dialog: (id: number) => `/library/dialogs/${id}`,
};

// API Response type matching backend SavedDialog entity
export interface SavedDialogResponse {
  id: number;
  deviceId: string;
  topic: string;
  content: string; // JSON string of ConversationLine[]
}

// Request body for saving a dialog
export interface SaveDialogRequest {
  topic: string;
  content: string; // JSON stringified ConversationLine[]
}

export const libraryService = {
  // Get all saved dialogs for current device
  getLibraryDialogs: async (): Promise<SavedDialogResponse[]> => {
    const deviceId = await getDeviceId();
    
    try {
      return await fetchRequest<SavedDialogResponse[]>({
        method: 'GET',
        url: ENDPOINTS.dialogs,
        headers: { 'X-Device-Id': deviceId },
      });
    } catch (fetchErr) {
      console.warn('[getLibraryDialogs] fetch failed, trying axios:', fetchErr);
      return apiRequest<SavedDialogResponse[]>({
        method: 'GET',
        url: ENDPOINTS.dialogs,
        headers: { 'X-Device-Id': deviceId },
      });
    }
  },

  // Save a dialog to library
  saveDialog: async (topic: string, conversations: ConversationLine[]): Promise<SavedDialogResponse> => {
    const deviceId = await getDeviceId();
    const content = JSON.stringify(conversations);

    try {
      return await fetchRequest<SavedDialogResponse>({
        method: 'POST',
        url: ENDPOINTS.dialogs,
        headers: { 'X-Device-Id': deviceId },
        data: { topic, content },
      });
    } catch (fetchErr) {
      console.warn('[saveDialog] fetch failed, trying axios:', fetchErr);
      return apiRequest<SavedDialogResponse>({
        method: 'POST',
        url: ENDPOINTS.dialogs,
        headers: { 'X-Device-Id': deviceId },
        data: { topic, content } as SaveDialogRequest,
      });
    }
  },

  // Delete a dialog from library
  deleteDialog: async (id: number): Promise<void> => {
    try {
      return await fetchRequest<void>({
        method: 'DELETE',
        url: ENDPOINTS.dialog(id),
      });
    } catch (fetchErr) {
      console.warn('[deleteDialog] fetch failed, trying axios:', fetchErr);
      return apiRequest<void>({
        method: 'DELETE',
        url: ENDPOINTS.dialog(id),
      });
    }
  },
};
