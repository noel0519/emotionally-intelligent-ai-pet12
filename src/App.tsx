


import { useState } from 'react';
import { MessageCircle, Heart, Sparkles, BarChart3 } from 'lucide-react';
import { usePetState } from './hooks/usePetState';
import { useConversation, useMemories } from './hooks/useConversation';
import { PetDisplay } from './components/PetDisplay';
import { ChatContainer } from './components/ChatContainer';
import { CarePanel } from './components/CarePanel';
import { MemoriesGallery } from './components/MemoriesGallery';
import { StatsDisplay } from './components/StatsDisplay';

type Tab = 'chat' | 'care' | 'memories' | 'stats';

function App() {
  <div style={{color:'white', fontSize:'32px', padding:'40px'}}>
      TEST TEXT VISIBLE?
    </div>
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const { pet, loading: petLoading, performAction } = usePetState();
  const { messages, sendMessage, loading: chatLoading } = useConversation(pet);
  const { memories } = useMemories(pet);

  if (petLoading || !pet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce">🥚</div>
          <p className="text-white text-xl font-medium">Loading your pet...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'chat' as Tab, label: 'Chat', icon: MessageCircle },
    { id: 'care' as Tab, label: 'Care', icon: Heart },
    { id: 'memories' as Tab, label: 'Memories', icon: Sparkles },
    { id: 'stats' as Tab, label: 'Stats', icon: BarChart },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 pb-20">
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <PetDisplay pet={pet} />
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20 h-[600px] flex flex-col">
          <div className="flex-1 overflow-hidden">
            {activeTab === 'chat' && (
              <ChatContainer
                messages={messages}
                onSendMessage={sendMessage}
                loading={chatLoading}
              />
            )}
            {activeTab === 'care' && (
              <CarePanel pet={pet} onAction={performAction} />
            )}
            {activeTab === 'memories' && (
              <MemoriesGallery memories={memories} />
            )}
            {activeTab === 'stats' && (
              <div className="p-6 overflow-y-auto h-full">
                <StatsDisplay pet={pet} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="grid grid-cols-4 gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-1 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-white/20 text-white scale-105'
                      : 'text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={24} />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
