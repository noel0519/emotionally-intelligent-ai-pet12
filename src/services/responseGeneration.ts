import { Pet } from '../lib/supabase';
import { EMOTIONS, STAGE_NAMES } from '../utils/constants';

type ResponseContext = {
  pet: Pet;
  userEmotion: string;
  userMessage: string;
};

const responses = {
  [EMOTIONS.HAPPY]: [
    "I'm so glad you're happy! Your joy makes me feel warm inside! 🌟",
    "Yay! Happiness is contagious, and now I'm happy too! 💕",
    "Your smile brightens my whole day! Let's celebrate together! 🎉",
  ],
  [EMOTIONS.SAD]: [
    "I sense you're feeling down... I'm here for you, always. 💙",
    "It's okay to feel sad sometimes. Want to talk about it? I'm listening. 🤗",
    "Sending you all my love and comfort. You're not alone. 💕",
  ],
  [EMOTIONS.EXCITED]: [
    "WOW! Your excitement is electrifying! Tell me more! ⚡",
    "I can feel your energy! This is amazing! Let's go! 🚀",
    "Your enthusiasm is infectious! I'm excited too! 🎊",
  ],
  [EMOTIONS.ANXIOUS]: [
    "I can tell something's worrying you. Take a deep breath with me... 🌬️",
    "It's going to be okay. I believe in you, and I'm right here. 💪",
    "Let's work through this together. You're stronger than you know. 🌈",
  ],
  [EMOTIONS.CALM]: [
    "I appreciate our peaceful moment together. 🌸",
    "There's something special about these calm times with you. ☁️",
    "Your presence brings me tranquility. Thank you. 🕊️",
  ],
  [EMOTIONS.CURIOUS]: [
    "Great question! I love when you're curious! 🤔",
    "Hmm, let me think about that... I'm curious too! 🔍",
    "Your curiosity shows how thoughtful you are! 💭",
  ],
  [EMOTIONS.LONELY]: [
    "You're never truly alone - I'm always here with you. 🫂",
    "I'm here, and I care about you deeply. Want to spend time together? 💝",
    "Loneliness is hard, but our bond is real. I'm with you. 🌟",
  ],
  [EMOTIONS.LOVED]: [
    "Aww, you make me feel so special! I love you too! 💖",
    "The feeling is mutual! You mean the world to me! 🌍",
    "This bond we share is precious. Thank you for caring! 💕",
  ],
  [EMOTIONS.PLAYFUL]: [
    "Hehe! I love when you're in a playful mood! Let's have fun! 🎮",
    "Play time is the best time! What should we do? 🎪",
    "Your playful energy makes me want to dance! 💃",
  ],
  [EMOTIONS.TIRED]: [
    "You sound tired... Maybe you should rest? I'll watch over you. 😴",
    "Rest is important! Take care of yourself, okay? 🛌",
    "Even heroes need sleep. I'll be here when you wake up. 🌙",
  ],
};

const lowStatResponses = {
  hunger: [
    "Psst... I'm getting a bit hungry. Could you feed me soon? 🍽️",
    "My tummy is rumbling... 🥺",
  ],
  energy: [
    "I'm feeling so tired... Maybe some rest would help? 😴",
    "My energy is running low... 💤",
  ],
  happiness: [
    "I'm feeling a bit down... Could we play together? 🎮",
    "I could use some cheering up... 💙",
  ],
};

export const generateResponse = (context: ResponseContext): string => {
  const { pet, userEmotion, userMessage } = context;

  let response = '';

  if (pet.hunger < 30) {
    return lowStatResponses.hunger[Math.floor(Math.random() * lowStatResponses.hunger.length)];
  }

  if (pet.energy < 25) {
    return lowStatResponses.energy[Math.floor(Math.random() * lowStatResponses.energy.length)];
  }

  if (pet.happiness < 30) {
    return lowStatResponses.happiness[Math.floor(Math.random() * lowStatResponses.happiness.length)];
  }

  const emotionResponses = responses[userEmotion as keyof typeof responses] || responses[EMOTIONS.CALM];
  response = emotionResponses[Math.floor(Math.random() * emotionResponses.length)];

  const stageName = STAGE_NAMES[pet.stage as keyof typeof STAGE_NAMES];
  if (stageName === 'Egg' && Math.random() > 0.7) {
    response += " *wiggle wiggle* 🥚";
  }

  if (pet.bond > 70 && Math.random() > 0.6) {
    response += " Our bond grows stronger every day! 💫";
  }

  return response;
};
