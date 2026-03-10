import { useState } from 'react';
import ParentSidebar from '../../components/feature/ParentSidebar';
import ResponsiveLayout from '../../components/feature/ResponsiveLayout';
import TopBar from '../../components/feature/TopBar';
import { homeworkData, subjects, statusOptions } from '../../mocks/homework';
import Badge from '../../components/base/Badge';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

export default function ParentHomework() {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [selectedSubject, setSelectedSubject] = useState('all');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ParentSidebar />
      <ResponsiveLayout>
        <TopBar title="Homework & Assignments" />
        
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Stats Grid - 4 col → 2 col (md) → 1 col (mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-600">Total Assignments</h3>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-file-list-line text-base sm:text-lg text-blue-600"></i>
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                {homeworkData.stats.total}
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-600">Pending</h3>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <i className="ri-time-line text-base sm:text-lg text-yellow-600"></i>
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                {homeworkData.stats.pending}
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-600">Completed</h3>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-checkbox-circle-line text-base sm:text-lg text-green-600"></i>
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                {homeworkData.stats.completed}
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-600">Overdue</h3>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-alert-line text-base sm:text-lg text-red-600"></i>
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                {homeworkData.stats.overdue}
              </p>
            </div>
          </div>

          {/* Filter Bar - Wrap on mobile */}
          <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Subjects</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="science">Science</option>
                  <option value="english">English</option>
                  <option value="history">History</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  View Mode
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('calendar')}
                    className={`flex-1 px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      viewMode === 'calendar'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <i className="ri-calendar-line mr-2"></i>
                    Calendar
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex-1 px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      viewMode === 'list'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <i className="ri-list-check mr-2"></i>
                    List
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar View - Horizontal scroll on mobile */}
          {viewMode === 'calendar' && (
            <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 overflow-x-auto">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
                Upcoming Deadlines
              </h3>
              <div className="min-w-[640px]">
                <div className="grid grid-cols-7 gap-2 sm:gap-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                  {homeworkData.calendar.map((day, index) => (
                    <div
                      key={index}
                      className={`min-h-[80px] sm:min-h-[100px] p-2 rounded-lg border ${
                        day.isToday
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="text-sm font-medium text-gray-900 mb-1">{day.date}</div>
                      {day.assignments.map((assignment, idx) => (
                        <div
                          key={idx}
                          className={`text-xs p-1 rounded mb-1 truncate ${
                            assignment.status === 'overdue'
                              ? 'bg-red-100 text-red-700'
                              : assignment.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                          title={assignment.title}
                        >
                          {assignment.title}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* List View - Assignment cards adapt */}
          {viewMode === 'list' && (
            <div className="space-y-3 sm:space-y-4">
              {homeworkData.assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 break-words">
                        {assignment.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500">{assignment.subject}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap self-start ${
                        assignment.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : assignment.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 sm:mb-4 break-words">
                    {assignment.description}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <i className="ri-calendar-line"></i>
                        Due: {assignment.dueDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="ri-user-line"></i>
                        {assignment.teacher}
                      </span>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ResponsiveLayout>
    </div>
  );
}