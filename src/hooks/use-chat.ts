
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
  limit,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
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
      orderBy('timestamp', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs
        .map((doc) => ({
            id: doc.id,
            ...doc.data(),
        } as Message))
        .reverse(); // Reverse to show oldest first
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
        await addDoc(
          collection(db, 'conversations', conversationId, 'messages'),
          {
            content,
            role,
            timestamp: Timestamp.now(),
          }
        );
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
