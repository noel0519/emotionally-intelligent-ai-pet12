export const PET_STAGES = {
  EGG: 'egg',
  BABY: 'baby',
  CHILD: 'child',
  TEEN: 'teen',
  ADULT: 'adult',
} as const;

export const STAGE_EMOJIS = {
  [PET_STAGES.EGG]: '🥚',
  [PET_STAGES.BABY]: '🐣',
  [PET_STAGES.CHILD]: '🐥',
  [PET_STAGES.TEEN]: '🐤',
  [PET_STAGES.ADULT]: '🦜',
} as const;

export const STAGE_NAMES = {
  [PET_STAGES.EGG]: 'Egg',
  [PET_STAGES.BABY]: 'Baby',
  [PET_STAGES.CHILD]: 'Child',
  [PET_STAGES.TEEN]: 'Teen',
  [PET_STAGES.ADULT]: 'Adult',
} as const;

export const EVOLUTION_THRESHOLDS = {
  [PET_STAGES.EGG]: 0,
  [PET_STAGES.BABY]: 100,
  [PET_STAGES.CHILD]: 300,
  [PET_STAGES.TEEN]: 600,
  [PET_STAGES.ADULT]: 1000,
} as const;

export const DECAY_RATES = {
  hunger: 5,
  energy: 3,
  happiness: 2,
} as const;

export const ACTION_EFFECTS = {
  feed: {
    hunger: 30,
    happiness: 5,
    experience: 10,
  },
  play: {
    energy: -15,
    happiness: 25,
    bond: 5,
    experience: 20,
  },
  rest: {
    energy: 40,
    happiness: 10,
    experience: 5,
  },
} as const;

export const EMOTIONS = {
  HAPPY: 'happy',
  SAD: 'sad',
  EXCITED: 'excited',
  ANXIOUS: 'anxious',
  CALM: 'calm',
  CURIOUS: 'curious',
  LONELY: 'lonely',
  LOVED: 'loved',
  PLAYFUL: 'playful',
  TIRED: 'tired',
} as const;

export const EMOTION_KEYWORDS = {
  [EMOTIONS.HAPPY]: ['happy', 'joy', 'great', 'wonderful', 'amazing', 'good', 'love', 'yay', '😊', '😄', '❤️'],
  [EMOTIONS.SAD]: ['sad', 'unhappy', 'down', 'depressed', 'upset', 'crying', 'hurt', '😢', '😭', '💔'],
  [EMOTIONS.EXCITED]: ['excited', 'pumped', 'hyped', 'thrilled', 'wow', 'omg', 'awesome', '🎉', '✨', '🔥'],
  [EMOTIONS.ANXIOUS]: ['anxious', 'worried', 'nervous', 'scared', 'afraid', 'stress', 'anxiety', '😰', '😨'],
  [EMOTIONS.CALM]: ['calm', 'peaceful', 'relaxed', 'serene', 'tranquil', 'chill', 'zen', '😌', '🧘'],
  [EMOTIONS.CURIOUS]: ['curious', 'wonder', 'interesting', 'question', 'why', 'how', 'what', '🤔', '❓'],
  [EMOTIONS.LONELY]: ['lonely', 'alone', 'isolated', 'miss', 'nobody', 'empty', '😔'],
  [EMOTIONS.LOVED]: ['loved', 'appreciated', 'valued', 'cherished', 'special', 'care', '🥰', '💕'],
  [EMOTIONS.PLAYFUL]: ['play', 'fun', 'game', 'playful', 'silly', 'joke', 'laugh', '😆', '🎮'],
  [EMOTIONS.TIRED]: ['tired', 'exhausted', 'sleepy', 'fatigue', 'worn out', 'drained', '😴', '💤'],
} as const;
