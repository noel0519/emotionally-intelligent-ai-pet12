import { Pet } from '../lib/supabase';
import { STAGE_EMOJIS, STAGE_NAMES } from '../utils/constants';

type PetDisplayProps = {
  pet: Pet;
};

const stageSizes = {
  egg: 'text-8xl',
  baby: 'text-9xl',
  child: 'text-[10rem]',
  teen: 'text-[11rem]',
  adult: 'text-[12rem]',
};

export const PetDisplay = ({ pet }: PetDisplayProps) => {
  const emoji = STAGE_EMOJIS[pet.stage as keyof typeof STAGE_EMOJIS] || '🥚';
  const stageName = STAGE_NAMES[pet.stage as keyof typeof STAGE_NAMES] || 'Egg';
  const sizeClass = stageSizes[pet.stage as keyof typeof stageSizes] || 'text-8xl';

  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4">
      <div className={`${sizeClass} transform transition-all duration-700 hover:scale-110 animate-bounce-slow`}>
        {emoji}
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">{pet.name}</h2>
        <p className="text-lg text-white/80">{stageName}</p>
        <div className="text-sm text-white/60">
          Level {pet.experience} XP
        </div>
      </div>
    </div>
  );
};
