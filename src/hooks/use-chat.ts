
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

const mockMessages: Record<string, Omit<Message, 'id' | 'timestamp'>[]> = {
    'student-user_professional-counselor1': [
        { role: 'student', content: 'Hello Dr. Sharma, I am feeling a bit overwhelmed with my studies.' },
        { role: 'professional', content: 'Hello! Thank you for reaching out. Can you tell me a bit more about what feels overwhelming?' },
    ],
    'student-user_professional-peer1': [
        { role: 'peer', content: 'Hey, feel free to reach out if you need to talk.' },
    ],
    'student-789_professional-sharma': [
        { role: 'student', content: 'I\'m feeling really anxious about my exams.' },
        { role: 'professional', content: 'I understand, exam periods can be very stressful. Have you been able to sleep and eat properly?' },
        { role: 'student', content: 'Not really, I\'m having trouble sleeping.' },
    ],
    'student-abc_peer-supporter-1': [
        { role: 'student', content: "Hi, I'm feeling really overwhelmed and was hoping to talk." },
        { role: 'peer', content: "Of course, I'm here to listen. What's been on your mind?" },
    ],
    'student-xyz_peer-supporter-1': [
        { role: 'student', content: "Thanks for offering to help. I'm struggling with exam stress." }
    ]
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
      if (querySnapshot.empty && mockMessages[conversationId]) {
          const mocked = mockMessages[conversationId].map((msg, index) => ({
              ...msg,
              id: `mock-${index}`,
              timestamp: Timestamp.now(),
          }));
          setMessages(mocked);
      } else {
        const msgs = querySnapshot.docs
            .map((doc) => ({
                id: doc.id,
                ...doc.data(),
            } as Message))
            .reverse(); // Reverse to show oldest first
        setMessages(msgs);
      }
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
