import { useState } from 'react';
import { Input } from '../../../components/base/Input';
import { Button } from '../../../components/base/Button';
import type { Conversation } from '../../../mocks/parentMessages';

interface ChatWindowProps {
  conversation: Conversation;
  onBack: () => void;
}

/**
 * ChatWindow component renders a list of chat messages.
 * It gracefully handles an empty or undefined `messages` array
 * and ensures that each rendered element has a stable key.
 */
export default function ChatWindow({ conversation, onBack }: ChatWindowProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with Back Button */}
      <div className="p-4 sm:p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          {/* Back button - visible on mobile only */}
          <button
            onClick={onBack}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer flex-shrink-0"
            aria-label="Back to conversations"
          >
            <i className="ri-arrow-left-line text-xl text-gray-600"></i>
          </button>
          
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <i className="ri-user-line text-base sm:text-lg text-blue-600"></i>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
              {conversation.teacherName}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 truncate">{conversation.subject}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
        {conversation.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'parent' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[70%] rounded-lg p-3 sm:p-4 ${
                msg.sender === 'parent'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm sm:text-base break-words">{msg.content}</p>
              <p
                className={`text-xs mt-1 ${
                  msg.sender === 'parent' ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
        <div className="flex gap-2 sm:gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <span className="hidden sm:inline text-sm sm:text-base">Send</span>
            <i className="ri-send-plane-fill text-base sm:text-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
