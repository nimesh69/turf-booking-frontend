import api from './axios';
import type { Conversation, Message } from '@/types/chat.types';

export const chatApi = {
  getConversations: () => api.get<Conversation[]>('/chats'),
  getMessages: (conversationId: string) =>
    api.get<Message[]>(`/chats/${conversationId}/messages`),
  sendMessage: (conversationId: string, content: string) =>
    api.post<Message>(`/chats/${conversationId}/messages`, { content }),
  startConversation: (userId: string) =>
    api.post<Conversation>('/chats', { userId }),
};
