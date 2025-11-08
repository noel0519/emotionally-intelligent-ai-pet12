import { EVOLUTION_THRESHOLDS, PET_STAGES } from './constants';

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const getStatColor = (value: number): string => {
  if (value > 60) return 'bg-green-500';
  if (value > 30) return 'bg-yellow-500';
  return 'bg-red-500';
};

export const getStatTextColor = (value: number): string => {
  if (value > 60) return 'text-green-600';
  if (value > 30) return 'text-yellow-600';
  return 'text-red-600';
};

export const determineStage = (experience: number): string => {
  if (experience >= EVOLUTION_THRESHOLDS.adult) return PET_STAGES.ADULT;
  if (experience >= EVOLUTION_THRESHOLDS.teen) return PET_STAGES.TEEN;
  if (experience >= EVOLUTION_THRESHOLDS.child) return PET_STAGES.CHILD;
  if (experience >= EVOLUTION_THRESHOLDS.baby) return PET_STAGES.BABY;
  return PET_STAGES.EGG;
};

export const formatTimeAgo = (date: string): string => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

export const calculateDecay = (lastDecayAt: string): { hunger: number; energy: number; happiness: number } => {
  const now = new Date();
  const lastDecay = new Date(lastDecayAt);
  const hoursPassed = (now.getTime() - lastDecay.getTime()) / (1000 * 60 * 60);

  return {
    hunger: Math.floor(hoursPassed * 5),
    energy: Math.floor(hoursPassed * 3),
    happiness: Math.floor(hoursPassed * 2),
  };
};
