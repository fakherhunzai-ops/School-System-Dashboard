import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/feature/Sidebar';
import TopBar from '../../components/feature/TopBar';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Badge from '../../components/base/Badge';
import { dashboardStats, followUpTasks } from '../../mocks/attendance';

export default function Dashboard() {
  const navigate = useNavigate();
  const stats = dashboardStats;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-0 lg:ml-64">
        <TopBar
          title="Dashboard"
          subtitle="Welcome back, Sarah Johnson"
          actions={
            <Button variant="primary" onClick={() => navigate('/attendance')}>
              <i className="ri-checkbox-circle-line mr-2"></i>
              Mark Attendance
            </Button>
          }
        />

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Stats Grid - 4 cols on lg, 2 cols on md, 1 col on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Present Today</p>
                  <p className="text-3xl font-bold text-green-600">{stats.todayAttendance.present}</p>
                  <p className="text-xs text-gray-500 mt-1">of {stats.todayAttendance.total} students</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-user-smile-line text-2xl text-green-600"></i>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Absent Today</p>
                  <p className="text-3xl font-bold text-red-600">{stats.todayAttendance.absent}</p>
                  <p className="text-xs text-gray-500 mt-1">requires follow-up</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-user-unfollow-line text-2xl text-red-600"></i>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Flagged Students</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.flaggedStudents}</p>
                  <p className="text-xs text-gray-500 mt-1">at-risk students</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <i className="ri-alert-line text-2xl text-yellow-600"></i>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completion Rate</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.completionRate}%</p>
                  <p className="text-xs text-gray-500 mt-1">this month</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-bar-chart-line text-2xl text-blue-600"></i>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions and Follow-ups Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <Card className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
              
              {/* Quick Actions Grid - 2 cols on sm+, 1 col on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => navigate('/attendance')}
                  className="p-4 sm:p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer text-left"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <i className="ri-checkbox-circle-line text-xl text-blue-600"></i>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Mark Attendance</h4>
                  <p className="text-sm text-gray-600">Record today's attendance</p>
                </button>

                <button
                  onClick={() => navigate('/flagged-students')}
                  className="p-4 sm:p-6 border-2 border-gray-200 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-all cursor-pointer text-left"
                >
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
                    <i className="ri-alert-line text-xl text-yellow-600"></i>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Flagged Students</h4>
                  <p className="text-sm text-gray-600">View at-risk students</p>
                </button>

                <button
                  onClick={() => navigate('/follow-ups')}
                  className="p-4 sm:p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer text-left"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                    <i className="ri-task-line text-xl text-green-600"></i>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Follow-up Tasks</h4>
                  <p className="text-sm text-gray-600">Manage pending tasks</p>
                </button>

                <button
                  onClick={() => navigate('/reports')}
                  className="p-4 sm:p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all cursor-pointer text-left"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <i className="ri-file-chart-line text-xl text-purple-600"></i>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">View Reports</h4>
                  <p className="text-sm text-gray-600">Attendance analytics</p>
                </button>
              </div>
            </Card>

            {/* Follow-ups Card */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Pending Follow-ups</h3>
                <Badge variant="warning">{stats.pendingFollowUps}</Badge>
              </div>

              <div className="space-y-4">
                {followUpTasks.slice(0, 3).map((task) => (
                  <div key={task.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <h4 className="font-medium text-gray-900 text-sm">{task.student}</h4>
                      <Badge
                        variant={
                          task.riskLevel === 'level3' ? 'danger' :
                          task.riskLevel === 'level2' ? 'warning' : 'info'
                        }
                        size="sm"
                      >
                        {task.riskLevel === 'level3' ? 'High' :
                         task.riskLevel === 'level2' ? 'Medium' : 'Low'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{task.task}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center">
                        <i className="ri-calendar-line mr-1"></i>
                        Due {task.dueDate}
                      </span>
                      <span className="text-blue-600 font-medium cursor-pointer hover:text-blue-700">View</span>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4"
                onClick={() => navigate('/follow-ups')}
              >
                View All Tasks
              </Button>
            </Card>
          </div>

          {/* Attendance Summary Card */}
          <Card className="mt-4 sm:mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
              <h3 className="text-lg font-semibold text-gray-900">Today's Attendance Summary</h3>
              <span className="text-sm text-gray-500">January 15, 2025</span>
            </div>

            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 lg:gap-8">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${(stats.todayAttendance.present / stats.todayAttendance.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Legend - wraps on small screens */}
              <div className="flex flex-wrap gap-4 sm:gap-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600 whitespace-nowrap">Present: {stats.todayAttendance.present}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600 whitespace-nowrap">Absent: {stats.todayAttendance.absent}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600 whitespace-nowrap">Late: {stats.todayAttendance.late}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600 whitespace-nowrap">Excused: {stats.todayAttendance.excused}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
