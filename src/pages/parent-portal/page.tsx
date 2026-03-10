
import { useState } from 'react';
import ParentSidebar from '../../components/feature/ParentSidebar';
import TopBar from '../../components/feature/TopBar';
import ResponsiveLayout from '../../components/feature/ResponsiveLayout';
import ChildSelector from './components/ChildSelector';
import AttendanceCalendar from './components/AttendanceCalendar';
import RecentActivityList from './components/RecentActivityList';
import { parentPortalData } from '../../mocks/parentPortal';

export default function ParentPortal() {
  const [selectedChild, setSelectedChild] = useState(parentPortalData.children[0]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ParentSidebar />
      <ResponsiveLayout>
        <TopBar title="Parent Dashboard" />
        
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Child Selector - Horizontal scroll on mobile */}
          <div className="mb-6 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <ChildSelector
              children={parentPortalData.children}
              selectedChild={selectedChild}
              onSelectChild={setSelectedChild}
            />
          </div>

          {/* Stats Grid - 3 col → 2 col (sm) → 1 col (mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-600">Attendance Rate</h3>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-calendar-check-line text-base sm:text-lg text-green-600"></i>
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                {selectedChild.attendanceRate}%
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                {selectedChild.presentDays} of {selectedChild.totalDays} days present
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-600">Overall Grade</h3>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-trophy-line text-base sm:text-lg text-blue-600"></i>
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                {selectedChild.overallGrade}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">Current term average</p>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-600">Pending Tasks</h3>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="ri-task-line text-base sm:text-lg text-orange-600"></i>
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                {selectedChild.pendingTasks}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">Homework & assignments</p>
            </div>
          </div>

          {/* Calendar and Activity Grid - 2 col → stacked on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Attendance Calendar
              </h3>
              <AttendanceCalendar attendanceData={selectedChild.attendanceCalendar} />
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Recent Activity
              </h3>
              <RecentActivityList activities={parentPortalData.recentActivities} />
            </div>
          </div>
        </div>
      </ResponsiveLayout>
    </div>
  );
}
