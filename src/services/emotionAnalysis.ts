import { EMOTION_KEYWORDS, EMOTIONS } from '../utils/constants';

export type EmotionResult = {
  emotion: string;
  intensity: number;
};

export const analyzeEmotion = (text: string): EmotionResult => {
  const lowerText = text.toLowerCase();
  const emotionScores: Record<string, number> = {};

  Object.entries(EMOTION_KEYWORDS).forEach(([emotion, keywords]) => {
    let score = 0;
    keywords.forEach((keyword) => {
      if (lowerText.includes(keyword.toLowerCase())) {
        score += 1;
      }
    });
    if (score > 0) {
      emotionScores[emotion] = score;
    }
  });

  if (Object.keys(emotionScores).length === 0) {
    return {
      emotion: EMOTIONS.CALM,
      intensity: 0.3,
    };
  }

  const dominantEmotion = Object.entries(emotionScores).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0];

  const maxScore = Math.max(...Object.values(emotionScores));
  const intensity = Math.min(0.3 + maxScore * 0.2, 1.0);

  return {
    emotion: dominantEmotion,
    intensity,
  };
};
