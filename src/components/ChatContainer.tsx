import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Message } from '../lib/supabase';
import { MessageBubble } from './MessageBubble';

type ChatContainerProps = {
  messages: Message[];
  onSendMessage: (content: string) => void;
  loading: boolean;
};

export const ChatContainer = ({ messages, onSendMessage, loading }: ChatContainerProps) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-white/60 text-center">
              Start a conversation with your pet! 💬
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-white/5 backdrop-blur-sm border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            disabled={loading}
            className="flex-1 bg-white/10 backdrop-blur-md text-white placeholder-white/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50 transition-all"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl px-6 py-3 font-medium hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};
