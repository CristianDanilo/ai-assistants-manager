import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Assistant } from '@/types/assistant';

interface AssistantState {
  assistants: Assistant[];
  // Acciones
  addAssistant: (assistant: Assistant) => void;
  updateAssistant: (id: string, assistant: Assistant) => void;
  deleteAssistant: (id: string) => void;
  getAssistantById: (id: string) => Assistant | undefined; 
}

export const useAssistantStore = create<AssistantState>()(
  persist(
    (set, get) => ({
      assistants: [],

      addAssistant: (assistant) =>
        set((state) => ({
          assistants: [...state.assistants, assistant],
        })),

      updateAssistant: (id, updatedAssistant) =>
        set((state) => ({
          assistants: state.assistants.map((a) => (a.id === id ? updatedAssistant : a)),
        })),

      deleteAssistant: (id) =>
        set((state) => ({
          assistants: state.assistants.filter((a) => a.id !== id),
        })),

      getAssistantById: (id) => {
        return get().assistants.find((a) => a.id === id);
      },
    }),
    {
      name: 'assistant-storage', // Nombre de la llave en LocalStorage
    }
  )
);
