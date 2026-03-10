
export interface Teacher {
  id: string;
  name: string;
  subject: string;
  avatar: string;
  avatarBg: string;
  avatarColor: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'parent' | 'teacher';
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  teacher: Teacher;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

export const teachers: Teacher[] = [
  { id: 't1', name: 'Sarah Johnson', subject: 'Mathematics', avatar: 'SJ', avatarBg: 'bg-blue-100', avatarColor: 'text-blue-600' },
  { id: 't2', name: 'Michael Chen', subject: 'English Language', avatar: 'MC', avatarBg: 'bg-amber-100', avatarColor: 'text-amber-600' },
  { id: 't3', name: 'Lisa Park', subject: 'Science', avatar: 'LP', avatarBg: 'bg-green-100', avatarColor: 'text-green-600' },
  { id: 't4', name: 'David Brown', subject: 'Social Studies', avatar: 'DB', avatarBg: 'bg-teal-100', avatarColor: 'text-teal-600' },
];

export const conversations: Conversation[] = [
  {
    id: 'c1',
    teacher: { id: 't1', name: 'Sarah Johnson', subject: 'Mathematics', avatar: 'SJ', avatarBg: 'bg-blue-100', avatarColor: 'text-blue-600' },
    lastMessage: 'Emma did great on the algebra quiz! She scored 18/20.',
    lastMessageTime: 'Jan 29, 10:30 AM',
    unreadCount: 2,
    messages: [
      {
        id: 'm1',
        senderId: 'p1',
        senderName: 'Robert Wilson',
        senderRole: 'parent',
        content:
          "Hi Ms. Johnson, I wanted to check on Emma's progress in math this term. She mentioned she found the last chapter a bit challenging.",
        timestamp: 'Jan 27, 9:15 AM',
        read: true,
      },
      {
        id: 'm2',
        senderId: 't1',
        senderName: 'Sarah Johnson',
        senderRole: 'teacher',
        content:
          "Hello Mr. Wilson! Thank you for reaching out. Emma has been doing well overall. She did struggle a bit with fractions initially, but she's been improving steadily. I'd recommend some extra practice at home with the worksheets I sent.",
        timestamp: 'Jan 27, 2:45 PM',
        read: true,
      },
      {
        id: 'm3',
        senderId: 'p1',
        senderName: 'Robert Wilson',
        senderRole: 'parent',
        content:
          "That's great to hear. We've been working through the worksheets together. Is there anything specific we should focus on before the mid-term?",
        timestamp: 'Jan 28, 8:30 AM',
        read: true,
      },
      {
        id: 'm4',
        senderId: 't1',
        senderName: 'Sarah Johnson',
        senderRole: 'teacher',
        content:
          "I'd suggest focusing on Chapter 6 and 7 — especially word problems involving fractions and decimals. Those topics will be heavily tested.",
        timestamp: 'Jan 28, 3:00 PM',
        read: true,
      },
      {
        id: 'm5',
        senderId: 't1',
        senderName: 'Sarah Johnson',
        senderRole: 'teacher',
        content: 'Emma did great on the algebra quiz! She scored 18/20. Really proud of her improvement.',
        timestamp: 'Jan 29, 10:30 AM',
        read: false,
      },
      {
        id: 'm6',
        senderId: 't1',
        senderName: 'Sarah Johnson',
        senderRole: 'teacher',
        content:
          "Also, just a reminder that the mid-term exam is on Feb 5th. Please make sure Emma reviews the study guide I handed out.",
        timestamp: 'Jan 29, 10:32 AM',
        read: false,
      },
    ],
  },
  {
    id: 'c2',
    teacher: { id: 't2', name: 'Michael Chen', subject: 'English Language', avatar: 'MC', avatarBg: 'bg-amber-100', avatarColor: 'text-amber-600' },
    lastMessage: 'The book report was well written. A few minor grammar corrections needed.',
    lastMessageTime: 'Jan 26, 4:15 PM',
    unreadCount: 0,
    messages: [
      {
        id: 'm7',
        senderId: 't2',
        senderName: 'Michael Chen',
        senderRole: 'teacher',
        content:
          "Good afternoon Mr. Wilson. I wanted to let you know that Emma's book report on Charlotte's Web was very well written. She has a great understanding of narrative structure.",
        timestamp: 'Jan 25, 4:00 PM',
        read: true,
      },
      {
        id: 'm8',
        senderId: 'p1',
        senderName: 'Robert Wilson',
        senderRole: 'parent',
        content: 'Thank you, Mr. Chen! She really enjoyed reading that book. Are there any areas she should work on?',
        timestamp: 'Jan 26, 9:00 AM',
        read: true,
      },
      {
        id: 'm9',
        senderId: 't2',
        senderName: 'Michael Chen',
        senderRole: 'teacher',
        content:
          "The book report was well written. A few minor grammar corrections needed — mainly subject-verb agreement in complex sentences. I've marked them on her paper. Overall, excellent work!",
        timestamp: 'Jan 26, 4:15 PM',
        read: true,
      },
    ],
  },
  {
    id: 'c3',
    teacher: { id: 't3', name: 'Lisa Park', subject: 'Science', avatar: 'LP', avatarBg: 'bg-green-100', avatarColor: 'text-green-600' },
    lastMessage: 'The science fair project proposal looks great! Approved.',
    lastMessageTime: 'Jan 24, 11:00 AM',
    unreadCount: 1,
    messages: [
      {
        id: 'm10',
        senderId: 'p1',
        senderName: 'Robert Wilson',
        senderRole: 'parent',
        content:
          "Hi Ms. Park, Emma is very excited about the upcoming science fair. She wants to do a project on plant growth under different light conditions. Would that be appropriate?",
        timestamp: 'Jan 23, 7:45 PM',
        read: true,
      },
      {
        id: 'm11',
        senderId: 't3',
        senderName: 'Lisa Park',
        senderRole: 'teacher',
        content:
          "The science fair project proposal looks great! Approved. That's a wonderful topic. She'll need to start the experiment soon to have enough data by the fair date. I can provide some guidance on setting up the experiment properly.",
        timestamp: 'Jan 24, 11:00 AM',
        read: false,
      },
    ],
  },
  {
    id: 'c4',
    teacher: { id: 't4', name: 'David Brown', subject: 'Social Studies', avatar: 'DB', avatarBg: 'bg-teal-100', avatarColor: 'text-teal-600' },
    lastMessage: "Emma's presentation on Ancient Egypt was one of the best in class!",
    lastMessageTime: 'Jan 20, 3:30 PM',
    unreadCount: 0,
    messages: [
      {
        id: 'm12',
        senderId: 't4',
        senderName: 'David Brown',
        senderRole: 'teacher',
        content:
          "Emma's presentation on Ancient Egypt was one of the best in class! She clearly put a lot of effort into her research. Well done!",
        timestamp: 'Jan 20, 3:30 PM',
        read: true,
      },
      {
        id: 'm13',
        senderId: 'p1',
        senderName: 'Robert Wilson',
        senderRole: 'parent',
        content: 'Thank you so much, Mr. Brown! She spent the whole weekend working on it. She really loves history.',
        timestamp: 'Jan 20, 6:00 PM',
        read: true,
      },
    ],
  },
];

export const parentMessagesData = {
  conversations,
  teachers,
};
