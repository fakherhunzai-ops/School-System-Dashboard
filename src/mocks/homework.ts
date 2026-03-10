export const homeworkData = {
  stats: {
    total: 15,
    pending: 8,
    completed: 5,
    overdue: 2
  },
  calendar: [
    { date: '1', isToday: false, assignments: [] },
    { date: '2', isToday: false, assignments: [] },
    { date: '3', isToday: false, assignments: [] },
    { date: '4', isToday: false, assignments: [] },
    { date: '5', isToday: false, assignments: [] },
    { date: '6', isToday: false, assignments: [] },
    { date: '7', isToday: false, assignments: [] },
    { date: '8', isToday: false, assignments: [] },
    { date: '9', isToday: false, assignments: [] },
    { date: '10', isToday: false, assignments: [] },
    { date: '11', isToday: false, assignments: [] },
    { date: '12', isToday: false, assignments: [] },
    { date: '13', isToday: false, assignments: [{ title: 'Grammar Worksheet', status: 'completed' }] },
    { date: '14', isToday: false, assignments: [{ title: 'Reading Questions', status: 'completed' }] },
    { date: '15', isToday: false, assignments: [{ title: 'Vocabulary Quiz', status: 'completed' }] },
    { date: '16', isToday: false, assignments: [] },
    { date: '17', isToday: true, assignments: [{ title: 'Geometry Quiz', status: 'overdue' }] },
    { date: '18', isToday: false, assignments: [{ title: 'Algebra Practice', status: 'pending' }] },
    { date: '19', isToday: false, assignments: [{ title: 'Lab Report', status: 'pending' }] },
    { date: '20', isToday: false, assignments: [{ title: 'Book Report', status: 'pending' }] },
    { date: '21', isToday: false, assignments: [{ title: 'Fitness Log', status: 'pending' }] },
    { date: '22', isToday: false, assignments: [{ title: 'Physics Problems', status: 'pending' }] },
    { date: '23', isToday: false, assignments: [] },
    { date: '24', isToday: false, assignments: [{ title: 'Mid-Term Review', status: 'pending' }] },
    { date: '25', isToday: false, assignments: [{ title: 'WWII Timeline', status: 'pending' }] },
    { date: '26', isToday: false, assignments: [] },
    { date: '27', isToday: false, assignments: [] },
    { date: '28', isToday: false, assignments: [{ title: 'Self-Portrait', status: 'pending' }] },
    { date: '29', isToday: false, assignments: [] },
    { date: '30', isToday: false, assignments: [] },
    { date: '31', isToday: false, assignments: [] }
  ],
  assignments: [
    {
      id: 1,
      subject: 'Mathematics',
      title: 'Chapter 5: Algebra Practice Problems',
      description: 'Complete exercises 1-20 from the textbook. Show all work and calculations.',
      dueDate: 'Jan 18, 2024',
      teacher: 'Ms. Sarah Johnson',
      status: 'pending'
    },
    {
      id: 2,
      subject: 'English',
      title: 'Book Report: To Kill a Mockingbird',
      description: 'Write a 500-word book report analyzing the main themes and characters.',
      dueDate: 'Jan 20, 2024',
      teacher: 'Mr. David Chen',
      status: 'pending'
    },
    {
      id: 3,
      subject: 'Science',
      title: 'Lab Report: Chemical Reactions',
      description: 'Document your observations from the lab experiment and answer the analysis questions.',
      dueDate: 'Jan 19, 2024',
      teacher: 'Dr. Emily Rodriguez',
      status: 'pending'
    },
    {
      id: 4,
      subject: 'History',
      title: 'World War II Timeline Project',
      description: 'Create a detailed timeline of major events during WWII with descriptions.',
      dueDate: 'Jan 25, 2024',
      teacher: 'Mr. James Wilson',
      status: 'pending'
    },
    {
      id: 5,
      subject: 'Mathematics',
      title: 'Geometry Quiz Preparation',
      description: 'Review chapters 3-4 and complete the practice quiz online.',
      dueDate: 'Jan 17, 2024',
      teacher: 'Ms. Sarah Johnson',
      status: 'overdue'
    },
    {
      id: 6,
      subject: 'English',
      title: 'Vocabulary Quiz Chapter 8',
      description: 'Study vocabulary words 1-25 from chapter 8.',
      dueDate: 'Jan 15, 2024',
      teacher: 'Mr. David Chen',
      status: 'completed'
    },
    {
      id: 7,
      subject: 'Science',
      title: 'Physics Problem Set 3',
      description: 'Solve problems related to motion, force, and energy.',
      dueDate: 'Jan 22, 2024',
      teacher: 'Dr. Emily Rodriguez',
      status: 'pending'
    },
    {
      id: 8,
      subject: 'Art',
      title: 'Self-Portrait Drawing',
      description: 'Create a self-portrait using charcoal or pencil techniques learned in class.',
      dueDate: 'Jan 28, 2024',
      teacher: 'Ms. Lisa Martinez',
      status: 'pending'
    },
    {
      id: 9,
      subject: 'History',
      title: 'Chapter 7 Reading Questions',
      description: 'Answer questions 1-15 at the end of chapter 7.',
      dueDate: 'Jan 14, 2024',
      teacher: 'Mr. James Wilson',
      status: 'completed'
    },
    {
      id: 10,
      subject: 'Physical Education',
      title: 'Fitness Log Week 3',
      description: 'Record your daily physical activities and exercise for the week.',
      dueDate: 'Jan 21, 2024',
      teacher: 'Coach Mike Thompson',
      status: 'pending'
    },
    {
      id: 11,
      subject: 'Mathematics',
      title: 'Mid-Term Exam Review',
      description: 'Complete the comprehensive review packet covering chapters 1-5.',
      dueDate: 'Jan 24, 2024',
      teacher: 'Ms. Sarah Johnson',
      status: 'pending'
    },
    {
      id: 12,
      subject: 'English',
      title: 'Grammar Worksheet Set 4',
      description: 'Complete exercises on sentence structure and punctuation.',
      dueDate: 'Jan 13, 2024',
      teacher: 'Mr. David Chen',
      status: 'completed'
    }
  ]
};

export const subjects = [
  'All Subjects',
  'Mathematics',
  'English',
  'Science',
  'History',
  'Art',
  'Physical Education',
  'Reading'
];

export const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'graded', label: 'Graded' }
];
