'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  id: string;
  name: string;
  type: 'investor' | 'entrepreneur' | 'mentor';
  avatar: string;
  company?: string;
  title?: string;
  online: boolean;
  lastSeen?: string;
};

type Message = {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
  read: boolean;
};

type Chat = {
  id: string;
  name: string;
  type: 'private' | 'group';
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  isActive: boolean;
  created: string;
};

const users: User[] = [
  // Investors
  { id: '1', name: 'Sarah Johnson', type: 'investor', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', company: 'TechVentures Capital', title: 'Managing Partner', online: true },
  { id: '2', name: 'Michael Chen', type: 'investor', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', company: 'Innovation Fund', title: 'Investment Director', online: false, lastSeen: '2 hours ago' },
  { id: '3', name: 'Emma Rodriguez', type: 'investor', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', company: 'Growth Capital', title: 'Principal', online: true },
  
  // Entrepreneurs
  { id: '4', name: 'Alex Morgan', type: 'entrepreneur', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', company: 'TechStart Africa', title: 'Founder & CEO', online: true },
  { id: '5', name: 'Maria Garcia', type: 'entrepreneur', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face', company: 'AgriTech Solutions', title: 'Co-founder', online: false, lastSeen: '1 hour ago' },
  { id: '6', name: 'David Kim', type: 'entrepreneur', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', company: 'FinTech Innovations', title: 'Founder', online: true },
  
  // Mentors
  { id: '7', name: 'Dr. James Wilson', type: 'mentor', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face', company: 'Business School', title: 'Professor of Entrepreneurship', online: true },
  { id: '8', name: 'Lisa Thompson', type: 'mentor', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654d0b?w=150&h=150&fit=crop&crop=face', company: 'Legal Advisory', title: 'Senior Partner', online: false, lastSeen: '30 minutes ago' },
  { id: '9', name: 'Robert Green', type: 'mentor', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', company: 'Consulting Group', title: 'Senior Advisor', online: true },
];

const sampleChats: Chat[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    type: 'private',
    participants: [users[0]],
    lastMessage: { id: '1', senderId: '1', content: 'Thanks for the pitch deck! I\'ll review it and get back to you by Friday.', timestamp: '2:30 PM', type: 'text', read: false },
    unreadCount: 2,
    isActive: false,
    created: '2024-01-15'
  },
  {
    id: '2',
    name: 'Startup Founders Group',
    type: 'group',
    participants: [users[3], users[4], users[5]],
    lastMessage: { id: '2', senderId: '4', content: 'Has anyone tried the new funding platform?', timestamp: '1:45 PM', type: 'text', read: true },
    unreadCount: 0,
    isActive: false,
    created: '2024-01-10'
  },
  {
    id: '3',
    name: 'Dr. James Wilson',
    type: 'private',
    participants: [users[6]],
    lastMessage: { id: '3', senderId: '6', content: 'The mentorship session was very helpful. Thank you!', timestamp: '12:15 PM', type: 'text', read: true },
    unreadCount: 0,
    isActive: false,
    created: '2024-01-12'
  },
  {
    id: '4',
    name: 'Investor Network',
    type: 'group',
    participants: [users[0], users[1], users[2]],
    lastMessage: { id: '4', senderId: '1', content: 'Great deal flow this quarter!', timestamp: '11:30 AM', type: 'text', read: false },
    unreadCount: 1,
    isActive: false,
    created: '2024-01-08'
  }
];

export default function ChatsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'chats' | 'users'>('chats');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [selectedUserType, setSelectedUserType] = useState<'all' | 'investor' | 'entrepreneur' | 'mentor'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const filteredUsers = users.filter(user => {
    const matchesType = selectedUserType === 'all' || user.type === selectedUserType;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.company?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const filteredChats = sampleChats.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const startPrivateChat = (user: User) => {
    const existingChat = sampleChats.find(chat => 
      chat.type === 'private' && chat.participants.some(p => p.id === user.id)
    );
    
    if (existingChat) {
      setSelectedChat(existingChat);
      setActiveTab('chats');
    } else {
      // Create new private chat
      const newChat: Chat = {
        id: `chat_${user.id}_${Date.now()}`,
        name: user.name,
        type: 'private',
        participants: [user],
        unreadCount: 0,
        isActive: true,
        created: new Date().toISOString()
      };
      setSelectedChat(newChat);
      setActiveTab('chats');
    }
  };

  const openChat = (chat: Chat) => {
    setSelectedChat(chat);
    // Mark messages as read
    chat.unreadCount = 0;
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;
    
    // In a real app, this would send to backend
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const openGroupModal = () => {
    setShowGroupModal(true);
    setGroupName('');
    setSelectedMembers([]);
  };

  const closeGroupModal = () => {
    setShowGroupModal(false);
    setGroupName('');
    setSelectedMembers([]);
  };

  const toggleMember = (userId: string) => {
    setSelectedMembers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const createGroup = () => {
    if (!groupName.trim() || selectedMembers.length < 2) return;
    
    const groupMembers = users.filter(user => selectedMembers.includes(user.id));
    const newGroup: Chat = {
      id: `group_${Date.now()}`,
      name: groupName,
      type: 'group',
      participants: groupMembers,
      unreadCount: 0,
      isActive: true,
      created: new Date().toISOString()
    };
    
    // In a real app, this would create the group on the backend
    console.log('Creating group:', newGroup);
    setSelectedChat(newGroup);
    closeGroupModal();
  };

  const renderUsers = () => (
    <div className="chats-users">
      <div className="chats-users-header">
        <h3>Start a Conversation</h3>
        <div className="chats-user-filters">
          <select
            value={selectedUserType}
            onChange={(e) => setSelectedUserType(e.target.value as any)}
            className="chats-user-filter"
          >
            <option value="all">All Users</option>
            <option value="investor">Investors</option>
            <option value="entrepreneur">Entrepreneurs</option>
            <option value="mentor">Mentors</option>
          </select>
        </div>
      </div>
      
      <div className="chats-users-search">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="chats-search-input"
        />
      </div>

      <div className="chats-users-list">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="chats-user-item"
            onClick={() => startPrivateChat(user)}
          >
            <div className="chats-user-avatar">
              <img src={user.avatar} alt={user.name} />
              <div className={`chats-user-status ${user.online ? 'online' : 'offline'}`}></div>
            </div>
            <div className="chats-user-info">
              <div className="chats-user-name">{user.name}</div>
              <div className="chats-user-title">{user.title} at {user.company}</div>
              <div className="chats-user-status-text">
                {user.online ? 'Online' : `Last seen ${user.lastSeen}`}
              </div>
            </div>
            <div className="chats-user-type">
              <span className={`chats-type-badge ${user.type}`}>
                {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderChats = () => (
    <div className="chats-list">
      <div className="chats-list-header">
        <h3>Messages</h3>
        <button className="chats-new-group-btn" onClick={openGroupModal}>
          + New Group
        </button>
      </div>
      
      <div className="chats-search">
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="chats-search-input"
        />
      </div>

      <div className="chats-list-items">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className={`chats-list-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
            onClick={() => openChat(chat)}
          >
            <div className="chats-item-avatar">
              {chat.type === 'private' ? (
                <img src={chat.participants[0].avatar} alt={chat.name} />
              ) : (
                <div className="chats-group-avatar">
                  {chat.participants.slice(0, 2).map((p, i) => (
                    <img key={i} src={p.avatar} alt={p.name} />
                  ))}
                </div>
              )}
            </div>
            <div className="chats-item-content">
              <div className="chats-item-header">
                <div className="chats-item-name">{chat.name}</div>
                <div className="chats-item-time">
                  {chat.lastMessage?.timestamp}
                </div>
              </div>
              <div className="chats-item-message">
                {chat.lastMessage?.content}
              </div>
            </div>
            {chat.unreadCount > 0 && (
              <div className="chats-item-unread">
                {chat.unreadCount}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderChatWindow = () => {
    if (!selectedChat) {
      return (
        <div className="chats-empty">
          <div className="chats-empty-icon">💬</div>
          <h3>Select a conversation</h3>
          <p>Choose a chat from the sidebar or start a new conversation</p>
        </div>
      );
    }

    return (
      <div className="chats-window">
        <div className="chats-window-header">
          <div className="chats-window-user">
            <div className="chats-window-avatar">
              {selectedChat.type === 'private' ? (
                <img src={selectedChat.participants[0].avatar} alt={selectedChat.name} />
              ) : (
                <div className="chats-group-avatar">
                  {selectedChat.participants.slice(0, 2).map((p, i) => (
                    <img key={i} src={p.avatar} alt={p.name} />
                  ))}
                </div>
              )}
            </div>
            <div className="chats-window-info">
              <div className="chats-window-name">{selectedChat.name}</div>
              <div className="chats-window-status">
                {selectedChat.type === 'private' 
                  ? (selectedChat.participants[0].online ? 'Online' : `Last seen ${selectedChat.participants[0].lastSeen}`)
                  : `${selectedChat.participants.length} members`
                }
              </div>
            </div>
          </div>
          <div className="chats-window-actions">
            <button className="chats-action-btn">⋯</button>
          </div>
        </div>

        <div className="chats-messages">
          <div className="chats-message">
            <div className="chats-message-avatar">
              <img src={selectedChat.participants[0].avatar} alt={selectedChat.participants[0].name} />
            </div>
            <div className="chats-message-content">
              <div className="chats-message-text">
                {selectedChat.lastMessage?.content || 'Start the conversation!'}
              </div>
              <div className="chats-message-time">
                {selectedChat.lastMessage?.timestamp || 'Now'}
              </div>
            </div>
          </div>
        </div>

        <div className="chats-input">
          <div className="chats-input-container">
            <button className="chats-attach-btn">📎</button>
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="chats-message-input"
            />
            <button className="chats-send-btn" onClick={sendMessage}>
              ➤
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="chats-page">
      <div className="chats-sidebar">
        <div className="chats-tabs">
          <button
            className={`chats-tab ${activeTab === 'chats' ? 'active' : ''}`}
            onClick={() => setActiveTab('chats')}
          >
            💬 Chats
          </button>
          <button
            className={`chats-tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Users
          </button>
        </div>

        {activeTab === 'chats' ? renderChats() : renderUsers()}
      </div>

      <div className="chats-main">
        {renderChatWindow()}
      </div>

      {/* Group Creation Modal */}
      {showGroupModal && (
        <div className="chats-modal-overlay" onClick={closeGroupModal}>
          <div className="chats-modal" onClick={(e) => e.stopPropagation()}>
            <div className="chats-modal-header">
              <h3>Create New Group</h3>
              <button className="chats-modal-close" onClick={closeGroupModal}>
                ×
              </button>
            </div>
            
            <div className="chats-modal-body">
              <div className="chats-modal-field">
                <label>Group Name</label>
                <input
                  type="text"
                  placeholder="Enter group name..."
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="chats-modal-input"
                />
              </div>
              
              <div className="chats-modal-field">
                <label>Select Members ({selectedMembers.length} selected)</label>
                <div className="chats-modal-members">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className={`chats-modal-member ${selectedMembers.includes(user.id) ? 'selected' : ''}`}
                      onClick={() => toggleMember(user.id)}
                    >
                      <div className="chats-modal-member-avatar">
                        <img src={user.avatar} alt={user.name} />
                      </div>
                      <div className="chats-modal-member-info">
                        <div className="chats-modal-member-name">{user.name}</div>
                        <div className="chats-modal-member-title">{user.title} at {user.company}</div>
                      </div>
                      <div className="chats-modal-member-checkbox">
                        {selectedMembers.includes(user.id) && '✓'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="chats-modal-footer">
              <button className="chats-modal-cancel" onClick={closeGroupModal}>
                Cancel
              </button>
              <button 
                className="chats-modal-create" 
                onClick={createGroup}
                disabled={!groupName.trim() || selectedMembers.length < 2}
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}