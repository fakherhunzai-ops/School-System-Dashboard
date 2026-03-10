export const availableTeachers = [
  {
    id: 1,
    name: "Ms. Sarah Johnson",
    subject: "Mathematics",
    avatar: "https://i.pravatar.cc/150?img=1",
    email: "sarah.johnson@attendflow.edu"
  },
  {
    id: 2,
    name: "Mr. David Chen",
    subject: "English Language",
    avatar: "https://i.pravatar.cc/150?img=13",
    email: "david.chen@attendflow.edu"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    subject: "Science",
    avatar: "https://i.pravatar.cc/150?img=5",
    email: "emily.rodriguez@attendflow.edu"
  },
  {
    id: 4,
    name: "Mr. James Wilson",
    subject: "History",
    avatar: "https://i.pravatar.cc/150?img=12",
    email: "james.wilson@attendflow.edu"
  },
  {
    id: 5,
    name: "Ms. Lisa Anderson",
    subject: "Physical Education",
    avatar: "https://i.pravatar.cc/150?img=9",
    email: "lisa.anderson@attendflow.edu"
  },
  {
    id: 6,
    name: "Mr. Robert Taylor",
    subject: "Art",
    avatar: "https://i.pravatar.cc/150?img=14",
    email: "robert.taylor@attendflow.edu"
  }
];

export const timeSlots = [
  // Monday slots
  { teacherId: 1, date: "2024-05-13", startTime: "09:00", endTime: "09:30", available: true },
  { teacherId: 1, date: "2024-05-13", startTime: "10:00", endTime: "10:30", available: false },
  { teacherId: 1, date: "2024-05-13", startTime: "14:00", endTime: "14:30", available: true },
  { teacherId: 1, date: "2024-05-13", startTime: "15:00", endTime: "15:30", available: true },
  
  // Tuesday slots
  { teacherId: 1, date: "2024-05-14", startTime: "09:00", endTime: "09:30", available: true },
  { teacherId: 1, date: "2024-05-14", startTime: "11:00", endTime: "11:30", available: true },
  { teacherId: 1, date: "2024-05-14", startTime: "13:00", endTime: "13:30", available: false },
  { teacherId: 1, date: "2024-05-14", startTime: "15:00", endTime: "15:30", available: true },
  
  // Wednesday slots
  { teacherId: 1, date: "2024-05-15", startTime: "10:00", endTime: "10:30", available: true },
  { teacherId: 1, date: "2024-05-15", startTime: "14:00", endTime: "14:30", available: true },
  { teacherId: 1, date: "2024-05-15", startTime: "16:00", endTime: "16:30", available: true },
  
  // Thursday slots
  { teacherId: 1, date: "2024-05-16", startTime: "09:00", endTime: "09:30", available: false },
  { teacherId: 1, date: "2024-05-16", startTime: "11:00", endTime: "11:30", available: true },
  { teacherId: 1, date: "2024-05-16", startTime: "14:00", endTime: "14:30", available: true },
  
  // Friday slots
  { teacherId: 1, date: "2024-05-17", startTime: "09:00", endTime: "09:30", available: true },
  { teacherId: 1, date: "2024-05-17", startTime: "10:00", endTime: "10:30", available: true },
  { teacherId: 1, date: "2024-05-17", startTime: "13:00", endTime: "13:30", available: true },
  
  // Teacher 2 slots
  { teacherId: 2, date: "2024-05-13", startTime: "10:00", endTime: "10:30", available: true },
  { teacherId: 2, date: "2024-05-13", startTime: "14:00", endTime: "14:30", available: true },
  { teacherId: 2, date: "2024-05-14", startTime: "09:00", endTime: "09:30", available: false },
  { teacherId: 2, date: "2024-05-14", startTime: "15:00", endTime: "15:30", available: true },
  { teacherId: 2, date: "2024-05-15", startTime: "11:00", endTime: "11:30", available: true },
  { teacherId: 2, date: "2024-05-16", startTime: "10:00", endTime: "10:30", available: true },
  { teacherId: 2, date: "2024-05-17", startTime: "14:00", endTime: "14:30", available: true },
  
  // Teacher 3 slots
  { teacherId: 3, date: "2024-05-13", startTime: "09:00", endTime: "09:30", available: true },
  { teacherId: 3, date: "2024-05-13", startTime: "13:00", endTime: "13:30", available: true },
  { teacherId: 3, date: "2024-05-14", startTime: "10:00", endTime: "10:30", available: true },
  { teacherId: 3, date: "2024-05-14", startTime: "14:00", endTime: "14:30", available: false },
  { teacherId: 3, date: "2024-05-15", startTime: "09:00", endTime: "09:30", available: true },
  { teacherId: 3, date: "2024-05-16", startTime: "15:00", endTime: "15:30", available: true },
  { teacherId: 3, date: "2024-05-17", startTime: "11:00", endTime: "11:30", available: true },
  
  // Teacher 4 slots
  { teacherId: 4, date: "2024-05-13", startTime: "11:00", endTime: "11:30", available: true },
  { teacherId: 4, date: "2024-05-14", startTime: "09:00", endTime: "09:30", available: true },
  { teacherId: 4, date: "2024-05-14", startTime: "13:00", endTime: "13:30", available: true },
  { teacherId: 4, date: "2024-05-15", startTime: "10:00", endTime: "10:30", available: false },
  { teacherId: 4, date: "2024-05-16", startTime: "14:00", endTime: "14:30", available: true },
  { teacherId: 4, date: "2024-05-17", startTime: "09:00", endTime: "09:30", available: true },
];

export const existingBookings = [
  {
    id: 1,
    teacherId: 2,
    teacherName: "Mr. David Chen",
    teacherSubject: "English Language",
    teacherAvatar: "https://i.pravatar.cc/150?img=13",
    childName: "Emma Thompson",
    date: "2024-05-10",
    startTime: "14:00",
    endTime: "14:30",
    status: "upcoming",
    meetingType: "video",
    agenda: "Discuss Emma's reading progress and upcoming book report project",
    location: "Zoom Meeting",
    notes: ""
  },
  {
    id: 2,
    teacherId: 1,
    teacherName: "Ms. Sarah Johnson",
    teacherSubject: "Mathematics",
    teacherAvatar: "https://i.pravatar.cc/150?img=1",
    childName: "Emma Thompson",
    date: "2024-05-08",
    startTime: "10:00",
    endTime: "10:30",
    status: "upcoming",
    meetingType: "in-person",
    agenda: "Review midterm exam results and discuss study strategies",
    location: "Room 204",
    notes: ""
  },
  {
    id: 3,
    teacherId: 3,
    teacherName: "Dr. Emily Rodriguez",
    teacherSubject: "Science",
    teacherAvatar: "https://i.pravatar.cc/150?img=5",
    childName: "Liam Thompson",
    date: "2024-04-28",
    startTime: "15:00",
    endTime: "15:30",
    status: "completed",
    meetingType: "in-person",
    agenda: "Science fair project discussion",
    location: "Science Lab",
    notes: "Liam showed excellent understanding of the scientific method. Recommended advanced reading materials for his project on renewable energy."
  },
  {
    id: 4,
    teacherId: 4,
    teacherName: "Mr. James Wilson",
    teacherSubject: "History",
    teacherAvatar: "https://i.pravatar.cc/150?img=12",
    childName: "Emma Thompson",
    date: "2024-04-15",
    startTime: "11:00",
    endTime: "11:30",
    status: "completed",
    meetingType: "video",
    agenda: "Discuss history essay assignment",
    location: "Google Meet",
    notes: "Emma's essay on World War II showed strong research skills. Encouraged her to participate more in class discussions."
  },
  {
    id: 5,
    teacherId: 1,
    teacherName: "Ms. Sarah Johnson",
    teacherSubject: "Mathematics",
    teacherAvatar: "https://i.pravatar.cc/150?img=1",
    childName: "Liam Thompson",
    date: "2024-04-10",
    startTime: "09:00",
    endTime: "09:30",
    status: "completed",
    meetingType: "in-person",
    agenda: "Address concerns about algebra concepts",
    location: "Room 204",
    notes: "Liam is improving steadily. Recommended additional practice with quadratic equations. Will monitor progress over next two weeks."
  },
  {
    id: 6,
    teacherId: 2,
    teacherName: "Mr. David Chen",
    teacherSubject: "English Language",
    teacherAvatar: "https://i.pravatar.cc/150?img=13",
    childName: "Liam Thompson",
    date: "2024-03-22",
    startTime: "13:00",
    endTime: "13:30",
    status: "cancelled",
    meetingType: "in-person",
    agenda: "Quarterly progress review",
    location: "Room 108",
    notes: "Meeting cancelled due to teacher illness. Rescheduled for next week."
  }
];