
export const classes = [
  { id: '1', name: 'Grade 5A', students: 28, teacher: 'Sarah Johnson' },
  { id: '2', name: 'Grade 5B', students: 26, teacher: 'Sarah Johnson' },
  { id: '3', name: 'Grade 6A', students: 30, teacher: 'Michael Chen' },
  { id: '4', name: 'Grade 6B', students: 29, teacher: 'Emily Davis' }
];

export const students = [
  { id: '1', name: 'Emma Wilson', rollNumber: '501', status: 'present', riskLevel: null, absences: 2 },
  { id: '2', name: 'Liam Martinez', rollNumber: '502', status: 'present', riskLevel: null, absences: 1 },
  { id: '3', name: 'Olivia Brown', rollNumber: '503', status: 'absent', riskLevel: 'level2', absences: 8 },
  { id: '4', name: 'Noah Davis', rollNumber: '504', status: 'present', riskLevel: null, absences: 3 },
  { id: '5', name: 'Ava Garcia', rollNumber: '505', status: 'late', riskLevel: null, absences: 4 },
  { id: '6', name: 'Ethan Rodriguez', rollNumber: '506', status: 'present', riskLevel: null, absences: 0 },
  { id: '7', name: 'Sophia Anderson', rollNumber: '507', status: 'excused', riskLevel: null, absences: 5 },
  { id: '8', name: 'Mason Taylor', rollNumber: '508', status: 'absent', riskLevel: 'level3', absences: 12 },
  { id: '9', name: 'Isabella Thomas', rollNumber: '509', status: 'present', riskLevel: null, absences: 2 },
  { id: '10', name: 'James Jackson', rollNumber: '510', status: 'present', riskLevel: null, absences: 1 },
  { id: '11', name: 'Mia White', rollNumber: '511', status: 'present', riskLevel: null, absences: 3 },
  { id: '12', name: 'Benjamin Harris', rollNumber: '512', status: 'late', riskLevel: 'level1', absences: 6 },
  { id: '13', name: 'Charlotte Martin', rollNumber: '513', status: 'present', riskLevel: null, absences: 2 },
  { id: '14', name: 'Lucas Thompson', rollNumber: '514', status: 'present', riskLevel: null, absences: 1 },
  { id: '15', name: 'Amelia Lee', rollNumber: '515', status: 'absent', riskLevel: 'level2', absences: 9 }
];

export const flaggedStudents = [
  {
    id: '3',
    name: 'Olivia Brown',
    class: 'Grade 5A',
    rollNumber: '503',
    riskLevel: 'level2',
    absences: 8,
    lastAbsence: '2025-01-15',
    followUpStatus: 'pending',
    parentContact: '+1 (555) 123-4567'
  },
  {
    id: '8',
    name: 'Mason Taylor',
    class: 'Grade 5A',
    rollNumber: '508',
    riskLevel: 'level3',
    absences: 12,
    lastAbsence: '2025-01-15',
    followUpStatus: 'contacted',
    parentContact: '+1 (555) 234-5678'
  },
  {
    id: '12',
    name: 'Benjamin Harris',
    class: 'Grade 5A',
    rollNumber: '512',
    riskLevel: 'level1',
    absences: 6,
    lastAbsence: '2025-01-14',
    followUpStatus: 'pending',
    parentContact: '+1 (555) 345-6789'
  },
  {
    id: '15',
    name: 'Amelia Lee',
    class: 'Grade 5A',
    rollNumber: '515',
    riskLevel: 'level2',
    absences: 9,
    lastAbsence: '2025-01-15',
    followUpStatus: 'escalated',
    parentContact: '+1 (555) 456-7890'
  }
];

export const attendanceHistory = [
  { date: '2025-01-15', status: 'absent' },
  { date: '2025-01-14', status: 'present' },
  { date: '2025-01-13', status: 'absent' },
  { date: '2025-01-10', status: 'late' },
  { date: '2025-01-09', status: 'present' },
  { date: '2025-01-08', status: 'absent' },
  { date: '2025-01-07', status: 'present' },
  { date: '2025-01-06', status: 'absent' }
];

export const communicationLog = [
  {
    id: '1',
    date: '2025-01-14',
    time: '10:30 AM',
    type: 'sms',
    message: 'Hi Mrs. Brown, Olivia was absent today. Please let us know if everything is okay.',
    status: 'sent',
    sentBy: 'Sarah Johnson'
  },
  {
    id: '2',
    date: '2025-01-13',
    time: '3:45 PM',
    type: 'call',
    message: 'Called parent to discuss attendance concerns. No answer, left voicemail.',
    status: 'logged',
    sentBy: 'Sarah Johnson'
  },
  {
    id: '3',
    date: '2025-01-10',
    time: '11:15 AM',
    type: 'email',
    message: 'Sent attendance report and requested meeting to discuss support options.',
    status: 'replied',
    sentBy: 'Sarah Johnson'
  }
];

export const followUpTasks = [
  {
    id: '1',
    student: 'Mason Taylor',
    class: 'Grade 5A',
    riskLevel: 'level3',
    task: 'Schedule parent meeting',
    dueDate: '2025-01-16',
    assignedTo: 'Sarah Johnson',
    status: 'pending',
    priority: 'high'
  },
  {
    id: '2',
    student: 'Amelia Lee',
    class: 'Grade 5A',
    riskLevel: 'level2',
    task: 'Follow up on medical documentation',
    dueDate: '2025-01-17',
    assignedTo: 'Emily Davis',
    status: 'contacted',
    priority: 'medium'
  },
  {
    id: '3',
    student: 'Olivia Brown',
    class: 'Grade 5A',
    riskLevel: 'level2',
    task: 'Send attendance improvement plan',
    dueDate: '2025-01-18',
    assignedTo: 'Sarah Johnson',
    status: 'pending',
    priority: 'medium'
  }
];

export const dashboardStats = {
  todayAttendance: { present: 245, absent: 12, late: 8, excused: 5, total: 270 },
  pendingFollowUps: 7,
  flaggedStudents: 15,
  completionRate: 94
};

export const messageTemplates = [
  {
    id: '1',
    name: 'First Absence',
    type: 'sms',
    content: 'Hi [Parent Name], [Student Name] was absent today. Please let us know if everything is okay. - [School Name]'
  },
  {
    id: '2',
    name: 'Multiple Absences',
    type: 'email',
    content: 'Dear [Parent Name],\n\nWe noticed that [Student Name] has been absent [X] times this month. We would like to schedule a meeting to discuss how we can support your family.\n\nBest regards,\n[Teacher Name]'
  },
  {
    id: '3',
    name: 'Late Arrival',
    type: 'sms',
    content: 'Hi [Parent Name], [Student Name] arrived late today. Please ensure timely arrival to avoid missing important lessons. Thank you!'
  }
];
