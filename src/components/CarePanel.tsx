import { Coffee, Gamepad2, Heart } from 'lucide-react';
import { Pet } from '../lib/supabase';
import { formatTimeAgo } from '../utils/helpers';

type CarePanelProps = {
  pet: Pet;
  onAction: (action: 'feed' | 'play' | 'rest') => void;
};

type ActionButtonProps = {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
  lastUsed?: string;
  gradient: string;
};

const ActionButton = ({ icon, label, description, onClick, lastUsed, gradient }: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 w-full`}
    >
      <div className="flex flex-col items-center space-y-3">
        <div className="text-4xl">{icon}</div>
        <h3 className="text-xl font-bold">{label}</h3>
        <p className="text-sm text-white/80 text-center">{description}</p>
        {lastUsed && (
          <p className="text-xs text-white/60">Last: {formatTimeAgo(lastUsed)}</p>
        )}
      </div>
    </button>
  );
};

export const CarePanel = ({ pet, onAction }: CarePanelProps) => {
  return (
    <div className="space-y-6 p-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Care for Your Pet</h2>
        <p className="text-white/70">Show your love with actions!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ActionButton
          icon={<Heart className="w-10 h-10" />}
          label="Feed"
          description="Increase hunger +30"
          onClick={() => onAction('feed')}
          lastUsed={pet.last_fed_at}
          gradient="from-red-500 to-orange-500"
        />
        <ActionButton
          icon={<Gamepad2 className="w-10 h-10" />}
          label="Play"
          description="Boost happiness +25"
          onClick={() => onAction('play')}
          lastUsed={pet.last_played_at}
          gradient="from-green-500 to-emerald-500"
        />
        <ActionButton
          icon={<Coffee className="w-10 h-10" />}
          label="Rest"
          description="Restore energy +40"
          onClick={() => onAction('rest')}
          lastUsed={pet.last_rested_at}
          gradient="from-blue-500 to-cyan-500"
        />
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 space-y-3">
        <h3 className="text-lg font-bold text-white">Tips</h3>
        <ul className="space-y-2 text-sm text-white/80">
          <li className="flex items-start gap-2">
            <span className="text-purple-400">•</span>
            <span>Stats decay over time, so check on your pet regularly!</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400">•</span>
            <span>Each action earns experience points for evolution</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400">•</span>
            <span>Playing increases your bond and unlocks special interactions</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
