import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Pet = {
  id: string;
  user_id: string | null;
  name: string;
  stage: string;
  hunger: number;
  energy: number;
  happiness: number;
  bond: number;
  playfulness: number;
  empathy: number;
  wisdom: number;
  experience: number;
  last_fed_at: string;
  last_played_at: string;
  last_rested_at: string;
  last_decay_at: string;
  created_at: string;
  updated_at: string;
};

export type Message = {
  id: string;
  pet_id: string;
  role: 'user' | 'pet';
  content: string;
  emotion: string | null;
  emotion_intensity: number;
  created_at: string;
};

export type Memory = {
  id: string;
  pet_id: string;
  title: string;
  content: string;
  emotion: string;
  significance: number;
  created_at: string;
};
