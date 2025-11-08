import { Heart, Sparkles } from 'lucide-react';
import { Memory } from '../lib/supabase';
import { formatTimeAgo } from '../utils/helpers';

type MemoriesGalleryProps = {
  memories: Memory[];
};

type MemoryCardProps = {
  memory: Memory;
};

const emotionEmojis: Record<string, string> = {
  happy: '😊',
  sad: '😢',
  excited: '🎉',
  anxious: '😰',
  calm: '😌',
  curious: '🤔',
  lonely: '😔',
  loved: '🥰',
  playful: '😆',
  tired: '😴',
};

const MemoryCard = ({ memory }: MemoryCardProps) => {
  const emoji = emotionEmojis[memory.emotion] || '💭';
  const significanceColor =
    memory.significance > 70 ? 'from-yellow-400 to-orange-500' :
    memory.significance > 40 ? 'from-purple-400 to-pink-500' :
    'from-blue-400 to-cyan-500';

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{emoji}</span>
          <div>
            <h3 className="text-lg font-bold text-white">{memory.title}</h3>
            <p className="text-xs text-white/60">{formatTimeAgo(memory.created_at)}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Sparkles size={16} className={`bg-gradient-to-r ${significanceColor} bg-clip-text text-transparent`} />
          <span className="text-sm font-bold text-white">{memory.significance}</span>
        </div>
      </div>
      <p className="text-sm text-white/80 leading-relaxed line-clamp-3">
        {memory.content}
      </p>
      <div className="mt-3 inline-block">
        <span className="text-xs bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full">
          {memory.emotion}
        </span>
      </div>
    </div>
  );
};

export const MemoriesGallery = ({ memories }: MemoriesGalleryProps) => {
  if (memories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 space-y-4">
        <Heart className="w-16 h-16 text-white/30" />
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold text-white">No Memories Yet</h3>
          <p className="text-white/60 max-w-md">
            Have meaningful conversations with your pet to create lasting memories.
            Emotional moments are automatically preserved!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Precious Memories</h2>
        <p className="text-white/70">Relive your special moments together</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {memories.map((memory) => (
          <MemoryCard key={memory.id} memory={memory} />
        ))}
      </div>

      {memories.length > 0 && (
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
          <p className="text-sm text-white/70">
            <span className="font-bold text-white">{memories.length}</span> {memories.length === 1 ? 'memory' : 'memories'} collected
          </p>
        </div>
      )}
    </div>
  );
};
