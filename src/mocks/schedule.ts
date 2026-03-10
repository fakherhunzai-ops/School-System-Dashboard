
export const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const timeSlots = [
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'
];

export interface ScheduleBlock {
  id: string;
  subject: string;
  className: string;
  room: string;
  startTime: string;
  endTime: string;
  day: string;
  students: number;
  color: string;
  type: 'class' | 'break' | 'free';
}

export const todaySchedule: ScheduleBlock[] = [
  { id: '1', subject: 'Mathematics', className: 'Grade 5A', room: 'Room 201', startTime: '8:00 AM', endTime: '8:45 AM', day: 'Wednesday', students: 28, color: 'blue', type: 'class' },
  { id: '2', subject: 'Mathematics', className: 'Grade 5B', room: 'Room 201', startTime: '9:00 AM', endTime: '9:45 AM', day: 'Wednesday', students: 26, color: 'blue', type: 'class' },
  { id: 'b1', subject: 'Morning Break', className: '', room: '', startTime: '9:45 AM', endTime: '10:15 AM', day: 'Wednesday', students: 0, color: 'gray', type: 'break' },
  { id: '3', subject: 'Science', className: 'Grade 5A', room: 'Lab 3', startTime: '10:15 AM', endTime: '11:00 AM', day: 'Wednesday', students: 28, color: 'green', type: 'class' },
  { id: '4', subject: 'English', className: 'Grade 6A', room: 'Room 305', startTime: '11:15 AM', endTime: '12:00 PM', day: 'Wednesday', students: 30, color: 'amber', type: 'class' },
  { id: 'b2', subject: 'Lunch Break', className: '', room: '', startTime: '12:00 PM', endTime: '12:45 PM', day: 'Wednesday', students: 0, color: 'gray', type: 'break' },
  { id: '5', subject: 'History', className: 'Grade 5A', room: 'Room 201', startTime: '12:45 PM', endTime: '1:30 PM', day: 'Wednesday', students: 28, color: 'rose', type: 'class' },
  { id: '6', subject: 'Art', className: 'Grade 5B', room: 'Art Studio', startTime: '1:45 PM', endTime: '2:30 PM', day: 'Wednesday', students: 26, color: 'teal', type: 'class' },
  { id: 'f1', subject: 'Free Period', className: '', room: '', startTime: '2:45 PM', endTime: '3:30 PM', day: 'Wednesday', students: 0, color: 'gray', type: 'free' },
];

export const weeklySchedule: Record<string, ScheduleBlock[]> = {
  Monday: [
    { id: 'm1', subject: 'Mathematics', className: 'Grade 5A', room: 'Room 201', startTime: '8:00 AM', endTime: '8:45 AM', day: 'Monday', students: 28, color: 'blue', type: 'class' },
    { id: 'm2', subject: 'English', className: 'Grade 5B', room: 'Room 202', startTime: '9:00 AM', endTime: '9:45 AM', day: 'Monday', students: 26, color: 'amber', type: 'class' },
    { id: 'm3', subject: 'Science', className: 'Grade 6A', room: 'Lab 3', startTime: '10:15 AM', endTime: '11:00 AM', day: 'Monday', students: 30, color: 'green', type: 'class' },
    { id: 'm4', subject: 'Mathematics', className: 'Grade 5B', room: 'Room 201', startTime: '11:15 AM', endTime: '12:00 PM', day: 'Monday', students: 26, color: 'blue', type: 'class' },
    { id: 'm5', subject: 'History', className: 'Grade 5A', room: 'Room 201', startTime: '12:45 PM', endTime: '1:30 PM', day: 'Monday', students: 28, color: 'rose', type: 'class' },
    { id: 'm6', subject: 'Art', className: 'Grade 6A', room: 'Art Studio', startTime: '1:45 PM', endTime: '2:30 PM', day: 'Monday', students: 30, color: 'teal', type: 'class' },
  ],
  Tuesday: [
    { id: 't1', subject: 'Science', className: 'Grade 5A', room: 'Lab 3', startTime: '8:00 AM', endTime: '8:45 AM', day: 'Tuesday', students: 28, color: 'green', type: 'class' },
    { id: 't2', subject: 'Mathematics', className: 'Grade 6A', room: 'Room 305', startTime: '9:00 AM', endTime: '9:45 AM', day: 'Tuesday', students: 30, color: 'blue', type: 'class' },
    { id: 't3', subject: 'English', className: 'Grade 5A', room: 'Room 201', startTime: '10:15 AM', endTime: '11:00 AM', day: 'Tuesday', students: 28, color: 'amber', type: 'class' },
    { id: 't4', subject: 'History', className: 'Grade 5B', room: 'Room 202', startTime: '11:15 AM', endTime: '12:00 PM', day: 'Tuesday', students: 26, color: 'rose', type: 'class' },
    { id: 't5', subject: 'Mathematics', className: 'Grade 5A', room: 'Room 201', startTime: '12:45 PM', endTime: '1:30 PM', day: 'Tuesday', students: 28, color: 'blue', type: 'class' },
    { id: 't6', subject: 'Science', className: 'Grade 5B', room: 'Lab 3', startTime: '1:45 PM', endTime: '2:30 PM', day: 'Tuesday', students: 26, color: 'green', type: 'class' },
  ],
  Wednesday: [
    { id: 'w1', subject: 'Mathematics', className: 'Grade 5A', room: 'Room 201', startTime: '8:00 AM', endTime: '8:45 AM', day: 'Wednesday', students: 28, color: 'blue', type: 'class' },
    { id: 'w2', subject: 'Mathematics', className: 'Grade 5B', room: 'Room 201', startTime: '9:00 AM', endTime: '9:45 AM', day: 'Wednesday', students: 26, color: 'blue', type: 'class' },
    { id: 'w3', subject: 'Science', className: 'Grade 5A', room: 'Lab 3', startTime: '10:15 AM', endTime: '11:00 AM', day: 'Wednesday', students: 28, color: 'green', type: 'class' },
    { id: 'w4', subject: 'English', className: 'Grade 6A', room: 'Room 305', startTime: '11:15 AM', endTime: '12:00 PM', day: 'Wednesday', students: 30, color: 'amber', type: 'class' },
    { id: 'w5', subject: 'History', className: 'Grade 5A', room: 'Room 201', startTime: '12:45 PM', endTime: '1:30 PM', day: 'Wednesday', students: 28, color: 'rose', type: 'class' },
    { id: 'w6', subject: 'Art', className: 'Grade 5B', room: 'Art Studio', startTime: '1:45 PM', endTime: '2:30 PM', day: 'Wednesday', students: 26, color: 'teal', type: 'class' },
  ],
  Thursday: [
    { id: 'th1', subject: 'English', className: 'Grade 5A', room: 'Room 201', startTime: '8:00 AM', endTime: '8:45 AM', day: 'Thursday', students: 28, color: 'amber', type: 'class' },
    { id: 'th2', subject: 'Science', className: 'Grade 5B', room: 'Lab 3', startTime: '9:00 AM', endTime: '9:45 AM', day: 'Thursday', students: 26, color: 'green', type: 'class' },
    { id: 'th3', subject: 'Mathematics', className: 'Grade 6A', room: 'Room 305', startTime: '10:15 AM', endTime: '11:00 AM', day: 'Thursday', students: 30, color: 'blue', type: 'class' },
    { id: 'th4', subject: 'Art', className: 'Grade 5A', room: 'Art Studio', startTime: '11:15 AM', endTime: '12:00 PM', day: 'Thursday', students: 28, color: 'teal', type: 'class' },
    { id: 'th5', subject: 'English', className: 'Grade 5B', room: 'Room 202', startTime: '12:45 PM', endTime: '1:30 PM', day: 'Thursday', students: 26, color: 'amber', type: 'class' },
    { id: 'th6', subject: 'History', className: 'Grade 6A', room: 'Room 305', startTime: '1:45 PM', endTime: '2:30 PM', day: 'Thursday', students: 30, color: 'rose', type: 'class' },
  ],
  Friday: [
    { id: 'f1', subject: 'Mathematics', className: 'Grade 5B', room: 'Room 201', startTime: '8:00 AM', endTime: '8:45 AM', day: 'Friday', students: 26, color: 'blue', type: 'class' },
    { id: 'f2', subject: 'Science', className: 'Grade 6A', room: 'Lab 3', startTime: '9:00 AM', endTime: '9:45 AM', day: 'Friday', students: 30, color: 'green', type: 'class' },
    { id: 'f3', subject: 'English', className: 'Grade 5A', room: 'Room 201', startTime: '10:15 AM', endTime: '11:00 AM', day: 'Friday', students: 28, color: 'amber', type: 'class' },
    { id: 'f4', subject: 'History', className: 'Grade 5B', room: 'Room 202', startTime: '11:15 AM', endTime: '12:00 PM', day: 'Friday', students: 26, color: 'rose', type: 'class' },
    { id: 'f5', subject: 'Art', className: 'Grade 5A', room: 'Art Studio', startTime: '12:45 PM', endTime: '1:30 PM', day: 'Friday', students: 28, color: 'teal', type: 'class' },
  ],
};

export const subjectColors: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  Mathematics: { bg: 'bg-blue-50', border: 'border-l-blue-500', text: 'text-blue-700', icon: 'ri-calculator-line' },
  Science: { bg: 'bg-green-50', border: 'border-l-green-500', text: 'text-green-700', icon: 'ri-flask-line' },
  English: { bg: 'bg-amber-50', border: 'border-l-amber-500', text: 'text-amber-700', icon: 'ri-book-open-line' },
  History: { bg: 'bg-rose-50', border: 'border-l-rose-500', text: 'text-rose-700', icon: 'ri-ancient-gate-line' },
  Art: { bg: 'bg-teal-50', border: 'border-l-teal-500', text: 'text-teal-700', icon: 'ri-palette-line' },
};
