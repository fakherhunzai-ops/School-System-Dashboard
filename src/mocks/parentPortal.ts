export interface ChildInfo {
  id: string;
  name: string;
  grade: string;
  section: string;
  rollNumber: string;
  teacher: string;
  avatar: string;
  attendanceRate: number;
  presentDays: number;
  totalDays: number;
  overallGrade: string;
  pendingTasks: number;
  attendanceCalendar: Record<string, 'present' | 'absent' | 'late' | 'excused' | 'holiday' | 'weekend' | 'future'>;
}

export interface MonthAttendance {
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused' | 'holiday' | 'weekend' | 'future';
}

export interface AttendanceStat {
  label: string;
  value: number;
  total: number;
  color: string;
}

const attendanceCalendarData: Record<string, 'present' | 'absent' | 'late' | 'excused' | 'holiday' | 'weekend' | 'future'> = {
  '2025-01-01': 'holiday',
  '2025-01-02': 'present',
  '2025-01-03': 'present',
  '2025-01-04': 'weekend',
  '2025-01-05': 'weekend',
  '2025-01-06': 'present',
  '2025-01-07': 'present',
  '2025-01-08': 'absent',
  '2025-01-09': 'present',
  '2025-01-10': 'late',
  '2025-01-11': 'weekend',
  '2025-01-12': 'weekend',
  '2025-01-13': 'absent',
  '2025-01-14': 'present',
  '2025-01-15': 'absent',
  '2025-01-16': 'present',
  '2025-01-17': 'present',
  '2025-01-18': 'weekend',
  '2025-01-19': 'weekend',
  '2025-01-20': 'present',
  '2025-01-21': 'excused',
  '2025-01-22': 'present',
  '2025-01-23': 'present',
  '2025-01-24': 'late',
  '2025-01-25': 'weekend',
  '2025-01-26': 'weekend',
  '2025-01-27': 'present',
  '2025-01-28': 'present',
  '2025-01-29': 'excused',
  '2025-01-30': 'present',
  '2025-01-31': 'present',
};

export const children: ChildInfo[] = [
  { 
    id: '1', 
    name: 'Emma Wilson', 
    grade: 'Grade 5', 
    section: 'A', 
    rollNumber: '501', 
    teacher: 'Sarah Johnson', 
    avatar: 'EW',
    attendanceRate: 86,
    presentDays: 82,
    totalDays: 95,
    overallGrade: 'A-',
    pendingTasks: 3,
    attendanceCalendar: attendanceCalendarData
  },
  { 
    id: '2', 
    name: 'Jack Wilson', 
    grade: 'Grade 3', 
    section: 'B', 
    rollNumber: '312', 
    teacher: 'Michael Chen', 
    avatar: 'JW',
    attendanceRate: 92,
    presentDays: 87,
    totalDays: 95,
    overallGrade: 'A',
    pendingTasks: 2,
    attendanceCalendar: attendanceCalendarData
  },
];

export const attendanceStats: AttendanceStat[] = [
  { label: 'Present', value: 82, total: 95, color: 'green' },
  { label: 'Absent', value: 6, total: 95, color: 'red' },
  { label: 'Late', value: 4, total: 95, color: 'amber' },
  { label: 'Excused', value: 3, total: 95, color: 'blue' },
];

export const januaryAttendance: MonthAttendance[] = [
  { date: '2025-01-01', status: 'holiday' },
  { date: '2025-01-02', status: 'present' },
  { date: '2025-01-03', status: 'present' },
  { date: '2025-01-04', status: 'weekend' },
  { date: '2025-01-05', status: 'weekend' },
  { date: '2025-01-06', status: 'present' },
  { date: '2025-01-07', status: 'present' },
  { date: '2025-01-08', status: 'absent' },
  { date: '2025-01-09', status: 'present' },
  { date: '2025-01-10', status: 'late' },
  { date: '2025-01-11', status: 'weekend' },
  { date: '2025-01-12', status: 'weekend' },
  { date: '2025-01-13', status: 'absent' },
  { date: '2025-01-14', status: 'present' },
  { date: '2025-01-15', status: 'absent' },
  { date: '2025-01-16', status: 'present' },
  { date: '2025-01-17', status: 'present' },
  { date: '2025-01-18', status: 'weekend' },
  { date: '2025-01-19', status: 'weekend' },
  { date: '2025-01-20', status: 'present' },
  { date: '2025-01-21', status: 'excused' },
  { date: '2025-01-22', status: 'present' },
  { date: '2025-01-23', status: 'present' },
  { date: '2025-01-24', status: 'late' },
  { date: '2025-01-25', status: 'weekend' },
  { date: '2025-01-26', status: 'weekend' },
  { date: '2025-01-27', status: 'present' },
  { date: '2025-01-28', status: 'present' },
  { date: '2025-01-29', status: 'excused' },
  { date: '2025-01-30', status: 'present' },
  { date: '2025-01-31', status: 'present' },
];

export const recentActivity = [
  { id: '1', date: 'Jan 15, 2025', status: 'absent', note: 'Unexcused absence. Teacher attempted parent contact.' },
  { id: '2', date: 'Jan 13, 2025', status: 'absent', note: 'Absent due to illness. No medical note provided yet.' },
  { id: '3', date: 'Jan 10, 2025', status: 'late', note: 'Arrived 15 minutes late. Bus delay reported.' },
  { id: '4', date: 'Jan 8, 2025', status: 'absent', note: 'Family emergency. Excusal pending documentation.' },
  { id: '5', date: 'Jan 3, 2025', status: 'present', note: 'Full day attendance.' },
];

export const recentActivities = [
  { 
    id: '1', 
    type: 'grade' as const, 
    title: 'Math Test Grade Posted', 
    description: 'Emma scored 92% on the Algebra midterm exam', 
    timestamp: '2 hours ago',
    status: 'completed' as const
  },
  { 
    id: '2', 
    type: 'homework' as const, 
    title: 'Science Project Due', 
    description: 'Solar System Model project due tomorrow', 
    timestamp: '5 hours ago',
    status: 'pending' as const
  },
  { 
    id: '3', 
    type: 'message' as const, 
    title: 'Message from Ms. Johnson', 
    description: 'Please review the upcoming field trip permission form', 
    timestamp: '1 day ago',
    status: undefined
  },
  { 
    id: '4', 
    type: 'meeting' as const, 
    title: 'Parent-Teacher Conference', 
    description: 'Scheduled for Feb 5, 2025 at 3:00 PM', 
    timestamp: '2 days ago',
    status: undefined
  },
  { 
    id: '5', 
    type: 'attendance' as const, 
    title: 'Absence Recorded', 
    description: 'Emma was absent on Jan 15 due to illness', 
    timestamp: '3 days ago',
    status: undefined
  },
  { 
    id: '6', 
    type: 'homework' as const, 
    title: 'English Essay Submitted', 
    description: 'Book report on "To Kill a Mockingbird" submitted', 
    timestamp: '4 days ago',
    status: 'completed' as const
  },
];

export const monthlyTrend = [
  { month: 'Aug', rate: 96 },
  { month: 'Sep', rate: 94 },
  { month: 'Oct', rate: 91 },
  { month: 'Nov', rate: 88 },
  { month: 'Dec', rate: 85 },
  { month: 'Jan', rate: 86 },
];

export const upcomingEvents = [
  { id: '1', title: 'Parent-Teacher Conference', date: 'Feb 5, 2025', time: '3:00 PM', type: 'meeting' },
  { id: '2', title: 'Science Fair', date: 'Feb 12, 2025', time: '9:00 AM', type: 'event' },
  { id: '3', title: 'Mid-Term Exams Begin', date: 'Feb 20, 2025', time: 'All Day', type: 'exam' },
];

export const parentPortalData = {
  children,
  attendanceStats,
  januaryAttendance,
  recentActivity,
  recentActivities,
  monthlyTrend,
  upcomingEvents,
};
