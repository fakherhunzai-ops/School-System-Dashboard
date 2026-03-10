export const notificationCategories = [
  {
    id: 'attendance',
    title: 'Attendance Alerts',
    description: 'Get notified about your child\'s attendance status',
    preferences: [
      {
        id: 'absent',
        label: 'Absent Notification',
        description: 'Receive alert when your child is marked absent',
        enabled: true,
      },
      {
        id: 'late',
        label: 'Late Arrival',
        description: 'Get notified when your child arrives late',
        enabled: true,
      },
      {
        id: 'excused',
        label: 'Excused Absence Confirmation',
        description: 'Confirmation when excused absence is recorded',
        enabled: false,
      },
    ],
  },
  {
    id: 'academic',
    title: 'Academic Updates',
    description: 'Stay informed about grades and assignments',
    preferences: [
      {
        id: 'grade-posted',
        label: 'Grade Posted',
        description: 'Notification when new grades are available',
        enabled: true,
      },
      {
        id: 'assignment-due-1day',
        label: 'Assignment Due (1 Day Before)',
        description: 'Reminder one day before assignment deadline',
        enabled: true,
      },
      {
        id: 'assignment-due-3days',
        label: 'Assignment Due (3 Days Before)',
        description: 'Early reminder three days before deadline',
        enabled: false,
      },
      {
        id: 'report-card',
        label: 'Report Card Available',
        description: 'Alert when report card is ready to view',
        enabled: true,
      },
      {
        id: 'missing-assignment',
        label: 'Missing Assignment Alert',
        description: 'Notification for overdue assignments',
        enabled: true,
      },
    ],
  },
  {
    id: 'communication',
    title: 'Communication',
    description: 'Manage teacher and school communication alerts',
    preferences: [
      {
        id: 'new-message',
        label: 'New Message from Teacher',
        description: 'Alert when you receive a new message',
        enabled: true,
      },
      {
        id: 'meeting-reminder-1hour',
        label: 'Meeting Reminder (1 Hour Before)',
        description: 'Reminder one hour before scheduled meeting',
        enabled: true,
      },
      {
        id: 'meeting-reminder-1day',
        label: 'Meeting Reminder (1 Day Before)',
        description: 'Reminder one day before scheduled meeting',
        enabled: true,
      },
      {
        id: 'meeting-confirmation',
        label: 'Meeting Confirmation',
        description: 'Confirmation when meeting is scheduled or changed',
        enabled: true,
      },
    ],
  },
  {
    id: 'announcements',
    title: 'School Announcements',
    description: 'Receive important school-wide updates',
    preferences: [
      {
        id: 'general',
        label: 'General Announcements',
        description: 'School-wide news and updates',
        enabled: true,
      },
      {
        id: 'events',
        label: 'Event Reminders',
        description: 'Notifications about upcoming school events',
        enabled: true,
      },
      {
        id: 'emergency',
        label: 'Emergency Alerts',
        description: 'Critical safety and emergency notifications',
        enabled: true,
      },
      {
        id: 'schedule-changes',
        label: 'Schedule Changes',
        description: 'Alerts about class schedule modifications',
        enabled: true,
      },
    ],
  },
];

export const deliveryMethods = [
  {
    id: 'push',
    label: 'Push Notification',
    description: 'In-app notifications',
    enabled: true,
  },
  {
    id: 'email',
    label: 'Email',
    description: 'Send to registered email address',
    enabled: true,
  },
  {
    id: 'sms',
    label: 'SMS',
    description: 'Text message to mobile phone',
    enabled: false,
  },
];

export const quietHours = {
  enabled: true,
  startTime: '22:00',
  endTime: '07:00',
};

export const notificationHistory = [
  {
    id: 1,
    type: 'attendance',
    title: 'Absent Notification',
    message: 'Emma Johnson was marked absent in Math class',
    timestamp: '2024-01-15T09:15:00',
    read: true,
  },
  {
    id: 2,
    type: 'academic',
    title: 'Grade Posted',
    message: 'New grade available for Science Project',
    timestamp: '2024-01-15T14:30:00',
    read: true,
  },
  {
    id: 3,
    type: 'communication',
    title: 'New Message from Teacher',
    message: 'Ms. Sarah Chen sent you a message',
    timestamp: '2024-01-14T16:45:00',
    read: true,
  },
  {
    id: 4,
    type: 'academic',
    title: 'Assignment Due Reminder',
    message: 'History Essay due tomorrow',
    timestamp: '2024-01-14T10:00:00',
    read: true,
  },
  {
    id: 5,
    type: 'announcements',
    title: 'School Event Reminder',
    message: 'Parent-Teacher Conference on Friday',
    timestamp: '2024-01-13T08:00:00',
    read: true,
  },
  {
    id: 6,
    type: 'communication',
    title: 'Meeting Reminder',
    message: 'Meeting with Mr. David Wilson in 1 hour',
    timestamp: '2024-01-12T13:00:00',
    read: true,
  },
  {
    id: 7,
    type: 'attendance',
    title: 'Late Arrival',
    message: 'Emma Johnson arrived 15 minutes late',
    timestamp: '2024-01-12T08:15:00',
    read: true,
  },
  {
    id: 8,
    type: 'academic',
    title: 'Missing Assignment Alert',
    message: 'Math Homework is overdue',
    timestamp: '2024-01-11T15:00:00',
    read: true,
  },
];
