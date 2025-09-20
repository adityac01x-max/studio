
'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
  DocumentData,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { moderateChatContent } from '@/ai/flows/moderate-chat-content';
import { useToast } from './use-toast';

export type Message = {
  id: string;
  role: string; // Changed to string to allow any unique user ID
  content: string;
  timestamp: Timestamp;
};

export const useChat = (conversationId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!conversationId) return;

    setLoading(true);
    const q = query(
      collection(db, 'conversations', conversationId, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Message));
      setMessages(msgs);
      setLoading(false);
    }, (error) => {
        console.error("Error fetching messages:", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, [conversationId]);

  const sendMessage = useCallback(
    async (content: string, role: string) => {
      if (!conversationId || !content.trim()) return;

      try {
        // Moderate content before sending
        const moderationResult = await moderateChatContent({ message: content });

        if (moderationResult.isProblematic) {
          // Report the message instead of sending it
          await addDoc(collection(db, 'reported-messages'), {
            conversationId,
            messageContent: content,
            senderRole: role,
            reason: moderationResult.reason || 'Flagged by AI',
            timestamp: Timestamp.now(),
          });

          // Notify the user
          toast({
            variant: 'destructive',
            title: 'Message Flagged for Review',
            description: 'This message was found to violate community guidelines and has been reported. It will not be sent.',
          });
        } else {
          // Send the message as normal
          await addDoc(
            collection(db, 'conversations', conversationId, 'messages'),
            {
              content,
              role,
              timestamp: Timestamp.now(),
            }
          );
        }
      } catch (error) {
        console.error('Error sending message:', error);
         toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not send message. Please try again.',
          });
      }
    },
    [conversationId, toast]
  );

  return { messages, loading, sendMessage };
};
