import { useState, useEffect, useCallback } from 'react';
import { supabase, Message, Pet, Memory } from '../lib/supabase';
import { analyzeEmotion } from '../services/emotionAnalysis';
import { generateResponse } from '../services/responseGeneration';

export const useConversation = (pet: Pet | null) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!pet) return;

    const loadMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('pet_id', pet.id)
        .order('created_at', { ascending: true });

      if (data) {
        setMessages(data as Message[]);
      }
    };

    loadMessages();
  }, [pet]);

  const sendMessage = useCallback(async (content: string) => {
    if (!pet || !content.trim()) return;

    setLoading(true);

    try {
      const emotionResult = analyzeEmotion(content);

      const { data: userMessage } = await supabase
        .from('messages')
        .insert({
          pet_id: pet.id,
          role: 'user',
          content: content.trim(),
          emotion: emotionResult.emotion,
          emotion_intensity: emotionResult.intensity,
        })
        .select()
        .single();

      if (userMessage) {
        setMessages(prev => [...prev, userMessage as Message]);
      }

      if (emotionResult.intensity > 0.6 && Math.random() > 0.5) {
        await createMemory(
          pet.id,
          `${emotionResult.emotion.charAt(0).toUpperCase() + emotionResult.emotion.slice(1)} conversation`,
          content,
          emotionResult.emotion,
          Math.floor(emotionResult.intensity * 100)
        );
      }

      await new Promise(resolve => setTimeout(resolve, 500));

      const response = generateResponse({
        pet,
        userEmotion: emotionResult.emotion,
        userMessage: content,
      });

      const { data: petMessage } = await supabase
        .from('messages')
        .insert({
          pet_id: pet.id,
          role: 'pet',
          content: response,
          emotion: null,
          emotion_intensity: 0.5,
        })
        .select()
        .single();

      if (petMessage) {
        setMessages(prev => [...prev, petMessage as Message]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  }, [pet]);

  const createMemory = async (
    petId: string,
    title: string,
    content: string,
    emotion: string,
    significance: number
  ) => {
    await supabase.from('memories').insert({
      pet_id: petId,
      title,
      content,
      emotion,
      significance,
    });
  };

  return {
    messages,
    sendMessage,
    loading,
  };
};

export const useMemories = (pet: Pet | null) => {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    if (!pet) return;

    const loadMemories = async () => {
      const { data } = await supabase
        .from('memories')
        .select('*')
        .eq('pet_id', pet.id)
        .order('significance', { ascending: false })
        .order('created_at', { ascending: false });

      if (data) {
        setMemories(data as Memory[]);
      }
    };

    loadMemories();
  }, [pet]);

  return { memories };
};
