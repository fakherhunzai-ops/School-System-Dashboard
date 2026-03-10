import { useState } from "react";
import ParentSidebar from "../../components/feature/ParentSidebar";
import ResponsiveLayout from "../../components/feature/ResponsiveLayout";
import TopBar from "../../components/feature/TopBar";
import Card from "../../components/base/Card";
import Button from "../../components/base/Button";
import Badge from "../../components/base/Badge";
import Modal from "../../components/base/Modal";
import Input from "../../components/base/Input";
import { availableTeachers, timeSlots, existingBookings } from "../../mocks/meetings";

interface MeetingData {
  id: string;
  teacherName: string;
  subject: string;
  date: string;
  time: string;
  location: string;
}

interface TeacherData {
  id: string;
  name: string;
  subject: string;
  availableSlots: number;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface DaySlots {
  day: string;
  date: string;
  slots: TimeSlot[];
}

interface MeetingsData {
  upcomingMeetings: MeetingData[];
  teachers: TeacherData[];
  weeklySlots: DaySlots[];
}

const meetingsData: MeetingsData = {
  upcomingMeetings: [
    {
      id: "1",
      teacherName: "Ms. Sarah Johnson",
      subject: "Mathematics",
      date: "May 15, 2024",
      time: "2:00 PM - 2:30 PM",
      location: "Room 204 / Video Call"
    },
    {
      id: "2",
      teacherName: "Mr. David Chen",
      subject: "Science",
      date: "May 18, 2024",
      time: "3:30 PM - 4:00 PM",
      location: "Science Lab"
    }
  ],
  teachers: [
    { id: "1", name: "Ms. Sarah Johnson", subject: "Mathematics", availableSlots: 8 },
    { id: "2", name: "Mr. David Chen", subject: "Science", availableSlots: 5 },
    { id: "3", name: "Mrs. Emily Brown", subject: "English", availableSlots: 12 },
    { id: "4", name: "Mr. James Wilson", subject: "History", availableSlots: 6 },
    { id: "5", name: "Ms. Lisa Anderson", subject: "Art", availableSlots: 10 },
    { id: "6", name: "Mr. Robert Taylor", subject: "Physical Education", availableSlots: 7 }
  ],
  weeklySlots: [
    {
      day: "Mon",
      date: "May 13",
      slots: [
        { id: "mon-1", time: "9:00 AM", available: true },
        { id: "mon-2", time: "10:00 AM", available: false },
        { id: "mon-3", time: "2:00 PM", available: true },
        { id: "mon-4", time: "3:00 PM", available: true }
      ]
    },
    {
      day: "Tue",
      date: "May 14",
      slots: [
        { id: "tue-1", time: "9:00 AM", available: true },
        { id: "tue-2", time: "10:00 AM", available: true },
        { id: "tue-3", time: "2:00 PM", available: false },
        { id: "tue-4", time: "3:00 PM", available: true }
      ]
    },
    {
      day: "Wed",
      date: "May 15",
      slots: [
        { id: "wed-1", time: "9:00 AM", available: false },
        { id: "wed-2", time: "10:00 AM", available: true },
        { id: "wed-3", time: "2:00 PM", available: true },
        { id: "wed-4", time: "3:00 PM", available: false }
      ]
    },
    {
      day: "Thu",
      date: "May 16",
      slots: [
        { id: "thu-1", time: "9:00 AM", available: true },
        { id: "thu-2", time: "10:00 AM", available: true },
        { id: "thu-3", time: "2:00 PM", available: true },
        { id: "thu-4", time: "3:00 PM", available: true }
      ]
    },
    {
      day: "Fri",
      date: "May 17",
      slots: [
        { id: "fri-1", time: "9:00 AM", available: true },
        { id: "fri-2", time: "10:00 AM", available: false },
        { id: "fri-3", time: "2:00 PM", available: true },
        { id: "fri-4", time: "3:00 PM", available: false }
      ]
    }
  ]
};

interface BookingData {
  teacher: typeof availableTeachers[0] | null;
  date: string;
  startTime: string;
  endTime: string;
  meetingType: "in-person" | "video" | "";
  agenda: string;
}

export default function ParentMeetings() {
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ParentSidebar />
      <ResponsiveLayout>
        <TopBar title="Schedule Meetings" />
        
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Upcoming Meetings */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
              Upcoming Meetings
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {meetingsData.upcomingMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-user-line text-base sm:text-lg text-blue-600"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 break-words">
                        {meeting.teacherName}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 mb-2">{meeting.subject}</p>
                      <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <i className="ri-calendar-line"></i>
                          {meeting.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-time-line"></i>
                          {meeting.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-map-pin-line"></i>
                          {meeting.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:self-start">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
                        Join Meeting
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer">
                        Reschedule
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule New Meeting */}
          <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
              Schedule New Meeting
            </h2>

            {/* Teacher Selection - 3 col → 2 col (sm) → 1 col (mobile) */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-sm font-medium text-gray-700 mb-3 sm:mb-4">Select Teacher</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {meetingsData.teachers.map((teacher) => (
                  <button
                    key={teacher.id}
                    onClick={() => setSelectedTeacher(teacher.id)}
                    className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left cursor-pointer ${
                      selectedTeacher === teacher.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="ri-user-line text-blue-600"></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 truncate">
                          {teacher.name}
                        </h4>
                        <p className="text-xs text-gray-500 truncate">{teacher.subject}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">
                      {teacher.availableSlots} slots available
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Selection - Horizontal scroll on mobile */}
            {selectedTeacher && (
              <div className="mb-6 sm:mb-8">
                <h3 className="text-sm font-medium text-gray-700 mb-3 sm:mb-4">
                  Select Time Slot
                </h3>
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                  <div className="grid grid-cols-5 gap-2 sm:gap-4 min-w-[640px] sm:min-w-0">
                    {meetingsData.weeklySlots.map((day) => (
                      <div key={day.day} className="border border-gray-200 rounded-lg p-2 sm:p-3">
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 text-center">
                          {day.day}
                        </h4>
                        <p className="text-xs text-gray-500 mb-2 sm:mb-3 text-center">
                          {day.date}
                        </p>
                        <div className="space-y-1 sm:space-y-2">
                          {day.slots.map((slot) => (
                            <button
                              key={slot.id}
                              onClick={() => setSelectedSlot(slot.id)}
                              disabled={!slot.available}
                              className={`w-full px-2 py-1.5 sm:py-2 text-xs rounded transition-colors whitespace-nowrap cursor-pointer ${
                                !slot.available
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : selectedSlot === slot.id
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              {slot.time}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Meeting Details Form - Stack on mobile */}
            {selectedSlot && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meeting Purpose
                  </label>
                  <select className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Academic Progress</option>
                    <option>Behavioral Concerns</option>
                    <option>General Discussion</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any specific topics you'd like to discuss..."
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
                    Confirm Meeting
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTeacher(null);
                      setSelectedSlot(null);
                    }}
                    className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </ResponsiveLayout>
    </div>
  );
}