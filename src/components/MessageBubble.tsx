import { Message } from '../lib/supabase';
import { formatTimeAgo } from '../utils/helpers';

type MessageBubbleProps = {
  message: Message;
};

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
            : 'bg-white/90 backdrop-blur-md text-gray-800'
        } shadow-lg transform transition-all hover:scale-105`}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs ${isUser ? 'text-white/70' : 'text-gray-500'}`}>
            {formatTimeAgo(message.created_at)}
          </span>
          {message.emotion && !isUser && (
            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
              {message.emotion}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
