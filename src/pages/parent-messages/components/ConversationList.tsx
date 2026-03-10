import { Badge } from '../../../components/base/Badge';
import type { Conversation } from '../../../mocks/parentMessages';

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

export default function ConversationList({
  conversations,
  selectedConversation,
  onSelectConversation,
}: ConversationListProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Messages</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => {
          const isSelected = selectedConversation.id === conversation.id;
          return (
            <button
              key={conversation.id}
              onClick={() => onSelectConversation(conversation)}
              className={`w-full p-3 sm:p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors text-left cursor-pointer ${
                isSelected ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <i className="ri-user-line text-base sm:text-lg text-blue-600"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                      {conversation.teacherName}
                    </h3>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {conversation.lastMessageTime}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1 truncate">
                    {conversation.subject}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-1">
                    {conversation.lastMessage}
                  </p>
                  {conversation.unreadCount > 0 && (
                    <span className="inline-block mt-2 px-2 py-0.5 bg-blue-600 text-white text-xs font-medium rounded-full">
                      {conversation.unreadCount} new
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
