export interface SubjectGrade {
  id: string;
  subject: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  grade: string;
  gradeColor: string;
  score: number;
  maxScore: number;
  trend: 'up' | 'down' | 'stable';
  teacher: string;
  recentScores: number[];
}

export interface AssignmentGrade {
  id: string;
  name: string;
  type: 'assignment' | 'test' | 'project' | 'quiz';
  dueDate: string;
  score: number;
  maxScore: number;
  status: 'graded' | 'pending' | 'missing';
  weight: number;
}

export interface TermReport {
  term: string;
  gpa: number;
  rank: number;
  totalStudents: number;
  remarks: string;
}

export const subjectGrades: SubjectGrade[] = [
  {
    id: '1',
    subject: 'Mathematics',
    icon: 'ri-calculator-line',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    grade: 'A',
    gradeColor: 'text-green-600',
    score: 92,
    maxScore: 100,
    trend: 'up',
    teacher: 'Sarah Johnson',
    recentScores: [95, 88, 92, 90],
  },
  {
    id: '2',
    subject: 'English Language',
    icon: 'ri-book-open-line',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    grade: 'A-',
    gradeColor: 'text-green-600',
    score: 88,
    maxScore: 100,
    trend: 'stable',
    teacher: 'Michael Chen',
    recentScores: [87, 89, 88, 88],
  },
  {
    id: '3',
    subject: 'Science',
    icon: 'ri-flask-line',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    grade: 'B+',
    gradeColor: 'text-blue-600',
    score: 85,
    maxScore: 100,
    trend: 'up',
    teacher: 'Lisa Park',
    recentScores: [82, 84, 86, 88],
  },
  {
    id: '4',
    subject: 'Social Studies',
    icon: 'ri-earth-line',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
    grade: 'A',
    gradeColor: 'text-green-600',
    score: 91,
    maxScore: 100,
    trend: 'up',
    teacher: 'David Brown',
    recentScores: [89, 92, 90, 93],
  },
  {
    id: '5',
    subject: 'Art & Design',
    icon: 'ri-palette-line',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    grade: 'A+',
    gradeColor: 'text-green-600',
    score: 97,
    maxScore: 100,
    trend: 'stable',
    teacher: 'Emily Ross',
    recentScores: [96, 98, 97, 97],
  },
  {
    id: '6',
    subject: 'Physical Education',
    icon: 'ri-run-line',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    grade: 'B+',
    gradeColor: 'text-blue-600',
    score: 84,
    maxScore: 100,
    trend: 'down',
    teacher: 'James Miller',
    recentScores: [88, 85, 82, 81],
  },
  {
    id: '7',
    subject: 'Music',
    icon: 'ri-music-2-line',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    grade: 'A-',
    gradeColor: 'text-green-600',
    score: 89,
    maxScore: 100,
    trend: 'up',
    teacher: 'Anna Lee',
    recentScores: [86, 88, 90, 91],
  },
  {
    id: '8',
    subject: 'Computer Science',
    icon: 'ri-computer-line',
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
    grade: 'A',
    gradeColor: 'text-green-600',
    score: 93,
    maxScore: 100,
    trend: 'up',
    teacher: 'Robert Kim',
    recentScores: [91, 92, 94, 95],
  },
];

export const recentAssignments: AssignmentGrade[] = [
  {
    id: '1',
    name: 'Algebra Quiz - Chapter 7',
    type: 'quiz',
    dueDate: 'Jan 28, 2025',
    score: 18,
    maxScore: 20,
    status: 'graded',
    weight: 10,
  },
  {
    id: '2',
    name: "Book Report: Charlotte's Web",
    type: 'assignment',
    dueDate: 'Jan 25, 2025',
    score: 45,
    maxScore: 50,
    status: 'graded',
    weight: 15,
  },
  {
    id: '3',
    name: 'Science Lab: Plant Growth',
    type: 'project',
    dueDate: 'Jan 22, 2025',
    score: 88,
    maxScore: 100,
    status: 'graded',
    weight: 20,
  },
  {
    id: '4',
    name: 'History Essay: Ancient Egypt',
    type: 'assignment',
    dueDate: 'Jan 30, 2025',
    score: 0,
    maxScore: 50,
    status: 'pending',
    weight: 15,
  },
  {
    id: '5',
    name: 'Mid-Term Math Exam',
    type: 'test',
    dueDate: 'Feb 5, 2025',
    score: 0,
    maxScore: 100,
    status: 'pending',
    weight: 25,
  },
  {
    id: '6',
    name: 'Art Portfolio Submission',
    type: 'project',
    dueDate: 'Jan 20, 2025',
    score: 48,
    maxScore: 50,
    status: 'graded',
    weight: 20,
  },
];

export const termReports: TermReport[] = [
  {
    term: 'Term 1 (Aug-Oct)',
    gpa: 3.6,
    rank: 12,
    totalStudents: 32,
    remarks:
      'Excellent start to the year. Shows strong aptitude in Mathematics and Art.',
  },
  {
    term: 'Term 2 (Nov-Jan)',
    gpa: 3.7,
    rank: 10,
    totalStudents: 32,
    remarks:
      'Continued improvement. Particularly strong in Science projects and English writing.',
  },
];

export const gpaTrend = [
  { month: 'Aug', gpa: 3.4 },
  { month: 'Sep', gpa: 3.5 },
  { month: 'Oct', gpa: 3.6 },
  { month: 'Nov', gpa: 3.5 },
  { month: 'Dec', gpa: 3.7 },
  { month: 'Jan', gpa: 3.7 },
];

// Combined export for easier consumption
export const gradesData = {
  subjects: subjectGrades,
  recentAssignments: recentAssignments,
  termReport: {
    term: 'Term 2 (Nov-Jan)',
    overallGrade: 'A-',
    gpa: 3.7,
    rank: 10,
    totalStudents: 32,
    attendance: '96%',
    teacherComments: 'Continued improvement. Particularly strong in Science projects and English writing. Shows excellent participation in class discussions and consistently completes homework on time.',
  },
  gpaTrend: gpaTrend,
};
