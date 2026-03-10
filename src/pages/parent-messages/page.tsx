
import { useState } from 'react';
import ParentSidebar from '../../components/feature/ParentSidebar';
import TopBar from '../../components/feature/TopBar';
import ResponsiveLayout from '../../components/feature/ResponsiveLayout';
import ConversationList from './components/ConversationList';
import ChatWindow from './components/ChatWindow';
import { parentMessagesData } from '../../mocks/parentMessages';

export default function ParentMessages() {
  const [selectedConversation, setSelectedConversation] = useState(
    parentMessagesData.conversations[0]
  );
  const [showChat, setShowChat] = useState(false);

  const handleSelectConversation = (conversation: typeof selectedConversation) => {
    setSelectedConversation(conversation);
    setShowChat(true);
  };

  const handleBackToList = () => {
    setShowChat(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ParentSidebar />
      <ResponsiveLayout>
        <TopBar title="Messages" />
        
        <div className="h-[calc(100vh-4rem)] flex">
          {/* Conversation List - Hidden on mobile when chat is open */}
          <div className={`${
            showChat ? 'hidden lg:block' : 'block'
          } w-full lg:w-80 xl:w-96 border-r border-gray-200 bg-white flex-shrink-0`}>
            <ConversationList
              conversations={parentMessagesData.conversations}
              selectedConversation={selectedConversation}
              onSelectConversation={handleSelectConversation}
            />
          </div>

          {/* Chat Window - Full screen on mobile, side-by-side on desktop */}
          <div className={`${
            showChat ? 'block' : 'hidden lg:block'
          } flex-1 bg-white`}>
            <ChatWindow
              conversation={selectedConversation}
              onBack={handleBackToList}
            />
          </div>
        </div>
      </ResponsiveLayout>
    </div>
  );
}
