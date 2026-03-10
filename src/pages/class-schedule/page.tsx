
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/feature/Sidebar';
import TopBar from '../../components/feature/TopBar';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Badge from '../../components/base/Badge';
import DailyView from './components/DailyView';
import WeeklyView from './components/WeeklyView';
import { todaySchedule, weeklySchedule, subjectColors } from '../../mocks/schedule';

export default function ClassSchedule() {
  const navigate = useNavigate();
  const [view, setView] = useState<'daily' | 'weekly'>('daily');
  const currentDay = 'Wednesday';
  const currentDate = 'January 15, 2025';

  const classCount = todaySchedule.filter(b => b.type === 'class').length;
  const totalStudents = todaySchedule
    .filter(b => b.type === 'class')
    .reduce((sum, b) => sum + b.students, 0);
  const subjects = [
    ...new Set(
      todaySchedule.filter(b => b.type === 'class').map(b => b.subject)
    ),
  ];

  const nextClass = todaySchedule.find(b => b.type === 'class');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-0 lg:ml-64">
        <TopBar
          title="Class Schedule"
          subtitle={`${currentDay}, ${currentDate}`}
          actions={
            <Button variant="primary" onClick={() => navigate('/attendance')}>
              <i className="ri-checkbox-circle-line mr-2"></i>
              Mark Attendance
            </Button>
          }
        />

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Stats Row - 4 cols on lg, 2 cols on md, 1 col on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
            <Card>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-book-2-line text-lg sm:text-xl text-blue-600"></i>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Today's Classes</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{classCount}</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-group-line text-lg sm:text-xl text-green-600"></i>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Total Students</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalStudents}</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-booklet-line text-lg sm:text-xl text-amber-600"></i>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Subjects</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{subjects.length}</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-timer-line text-lg sm:text-xl text-rose-600"></i>
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-gray-500">Next Class</p>
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {nextClass?.subject || 'None'}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {nextClass?.startTime} · {nextClass?.room}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Schedule Grid - stacks on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Main Schedule */}
            <div className="lg:col-span-3">
              <Card padding="none">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200 gap-3">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    {view === 'daily'
                      ? `${currentDay}'s Schedule`
                      : 'Weekly Schedule'}
                  </h3>
                  {/* Daily/Weekly Toggle - accessible on mobile */}
                  <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1 w-full sm:w-auto">
                    <button
                      onClick={() => setView('daily')}
                      className={`flex-1 sm:flex-none px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                        view === 'daily'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Daily
                    </button>
                    <button
                      onClick={() => setView('weekly')}
                      className={`flex-1 sm:flex-none px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                        view === 'weekly'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Weekly
                    </button>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  {view === 'daily' ? (
                    <DailyView schedule={todaySchedule} />
                  ) : (
                    <WeeklyView
                      schedule={weeklySchedule}
                      currentDay={currentDay}
                    />
                  )}
                </div>
              </Card>
            </div>

            {/* Right Sidebar - stacks below on mobile */}
            <div className="space-y-4 sm:space-y-6">
              {/* Subject Legend */}
              <Card>
                <h4 className="text-sm font-semibold text-gray-900 mb-4">
                  Subjects
                </h4>
                <div className="space-y-3">
                  {Object.entries(subjectColors).map(([subject, colors]) => (
                    <div key={subject} className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-md ${colors.bg} flex items-center justify-center flex-shrink-0`}
                      >
                        <i
                          className={`${colors.icon} ${colors.text} text-sm`}
                        ></i>
                      </div>
                      <span className="text-sm text-gray-700 font-medium">
                        {subject}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Today's Summary */}
              <Card>
                <h4 className="text-sm font-semibold text-gray-900 mb-4">
                  Today's Summary
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">First Class</span>
                    <span className="font-medium text-gray-900">8:00 AM</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Last Class</span>
                    <span className="font-medium text-gray-900">2:30 PM</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Breaks</span>
                    <span className="font-medium text-gray-900">2</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Free Periods</span>
                    <span className="font-medium text-gray-900">1</span>
                  </div>
                  <hr className="border-gray-100" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Teaching Hours</span>
                    <span className="font-bold text-gray-900">4.5 hrs</span>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card>
                <h4 className="text-sm font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={() => navigate('/attendance')}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-checkbox-circle-line"></i>
                    </div>
                    Mark Attendance
                  </button>
                  <button
                    onClick={() => navigate('/flagged-students')}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors cursor-pointer"
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-alert-line"></i>
                    </div>
                    Flagged Students
                  </button>
                  <button
                    onClick={() => navigate('/reports')}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors cursor-pointer"
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-bar-chart-line"></i>
                    </div>
                    View Reports
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
