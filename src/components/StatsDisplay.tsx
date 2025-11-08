import { Pet } from '../lib/supabase';
import { getStatColor, getStatTextColor } from '../utils/helpers';

type StatsDisplayProps = {
  pet: Pet;
};

type StatBarProps = {
  label: string;
  value: number;
  icon: string;
};

const StatBar = ({ label, value, icon }: StatBarProps) => {
  const colorClass = getStatColor(value);
  const textColorClass = getStatTextColor(value);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white flex items-center gap-2">
          <span>{icon}</span>
          {label}
        </span>
        <span className={`text-sm font-bold ${textColorClass}`}>{value}</span>
      </div>
      <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
        <div
          className={`${colorClass} h-full rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

const PersonalityBar = ({ label, value }: { label: string; value: number }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white">{label}</span>
        <span className="text-sm font-bold text-purple-300">{value}</span>
      </div>
      <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-purple-400 to-pink-400 h-full rounded-full transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export const StatsDisplay = ({ pet }: StatsDisplayProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white mb-4">Vital Stats</h3>
        <StatBar label="Hunger" value={pet.hunger} icon="🍔" />
        <StatBar label="Energy" value={pet.energy} icon="⚡" />
        <StatBar label="Happiness" value={pet.happiness} icon="😊" />
        <StatBar label="Bond" value={pet.bond} icon="💕" />
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white mb-4">Personality</h3>
        <PersonalityBar label="Playfulness" value={pet.playfulness} />
        <PersonalityBar label="Empathy" value={pet.empathy} />
        <PersonalityBar label="Wisdom" value={pet.wisdom} />
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Progress</h3>
        <div className="space-y-2 text-white/80 text-sm">
          <div className="flex justify-between">
            <span>Total Experience</span>
            <span className="font-bold">{pet.experience} XP</span>
          </div>
          <div className="flex justify-between">
            <span>Next Evolution</span>
            <span className="font-bold">
              {pet.stage === 'adult' ? 'Max Level!' : `${pet.experience < 100 ? 100 : pet.experience < 300 ? 300 : pet.experience < 600 ? 600 : 1000} XP`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
