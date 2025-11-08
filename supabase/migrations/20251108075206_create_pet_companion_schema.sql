/*
  # Pet Companion App Schema

  1. New Tables
    - `pets`
      - `id` (uuid, primary key) - Unique pet identifier
      - `user_id` (uuid) - Owner identifier for future auth
      - `name` (text) - Pet name
      - `stage` (text) - Evolution stage: egg, baby, child, teen, adult
      - `hunger` (integer) - Hunger level (0-100)
      - `energy` (integer) - Energy level (0-100)
      - `happiness` (integer) - Happiness level (0-100)
      - `bond` (integer) - Bond level (0-100)
      - `playfulness` (integer) - Personality trait (0-100)
      - `empathy` (integer) - Personality trait (0-100)
      - `wisdom` (integer) - Personality trait (0-100)
      - `experience` (integer) - Total experience points for evolution
      - `last_fed_at` (timestamptz) - Last feeding time
      - `last_played_at` (timestamptz) - Last play time
      - `last_rested_at` (timestamptz) - Last rest time
      - `last_decay_at` (timestamptz) - Last stat decay calculation
      - `created_at` (timestamptz) - Pet creation time
      - `updated_at` (timestamptz) - Last update time

    - `messages`
      - `id` (uuid, primary key) - Unique message identifier
      - `pet_id` (uuid, foreign key) - Associated pet
      - `role` (text) - Message sender: user or pet
      - `content` (text) - Message text
      - `emotion` (text) - Detected emotion from message
      - `emotion_intensity` (real) - Emotion strength (0-1)
      - `created_at` (timestamptz) - Message timestamp

    - `memories`
      - `id` (uuid, primary key) - Unique memory identifier
      - `pet_id` (uuid, foreign key) - Associated pet
      - `title` (text) - Memory title
      - `content` (text) - Memory description
      - `emotion` (text) - Associated emotion
      - `significance` (integer) - Importance level (0-100)
      - `created_at` (timestamptz) - Memory creation time

  2. Security
    - Enable RLS on all tables
    - Add policies for public access (will be restricted when auth is added)
*/

CREATE TABLE IF NOT EXISTS pets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  name text NOT NULL DEFAULT 'My Pet',
  stage text NOT NULL DEFAULT 'egg',
  hunger integer NOT NULL DEFAULT 50,
  energy integer NOT NULL DEFAULT 80,
  happiness integer NOT NULL DEFAULT 70,
  bond integer NOT NULL DEFAULT 0,
  playfulness integer NOT NULL DEFAULT 50,
  empathy integer NOT NULL DEFAULT 50,
  wisdom integer NOT NULL DEFAULT 50,
  experience integer NOT NULL DEFAULT 0,
  last_fed_at timestamptz DEFAULT now(),
  last_played_at timestamptz DEFAULT now(),
  last_rested_at timestamptz DEFAULT now(),
  last_decay_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id uuid NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  role text NOT NULL,
  content text NOT NULL,
  emotion text,
  emotion_intensity real DEFAULT 0.5,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS memories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id uuid NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  emotion text NOT NULL,
  significance integer NOT NULL DEFAULT 50,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to pets"
  ON pets FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to pets"
  ON pets FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update to pets"
  ON pets FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete from pets"
  ON pets FOR DELETE
  USING (true);

CREATE POLICY "Allow public read access to messages"
  ON messages FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to messages"
  ON messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public read access to memories"
  ON memories FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to memories"
  ON memories FOR INSERT
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_messages_pet_id ON messages(pet_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_memories_pet_id ON memories(pet_id);
CREATE INDEX IF NOT EXISTS idx_memories_significance ON memories(significance DESC);