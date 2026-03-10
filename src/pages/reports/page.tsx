
import { useState } from 'react';
import TopBar from '../../components/feature/TopBar';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

const ReportsPage = () => {
  const [reportType, setReportType] = useState<'attendance' | 'academic' | 'behavior' | 'communication'>('attendance');
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'term' | 'year'>('month');

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar 
        title="Reports & Analytics"
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="whitespace-nowrap text-sm">
              <i className="ri-download-line sm:mr-2"></i>
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button variant="primary" className="whitespace-nowrap text-sm">
              <i className="ri-printer-line sm:mr-2"></i>
              <span className="hidden sm:inline">Print</span>
            </Button>
          </div>
        }
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Filters */}
        <Card className="p-4 sm:p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select 
                value={reportType}
                onChange={(e) => setReportType(e.target.value as any)}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
              >
                <option value="attendance">Attendance Report</option>
                <option value="academic">Academic Performance</option>
                <option value="behavior">Behavior Analysis</option>
                <option value="communication">Communication Log</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as any)}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="term">This Term</option>
                <option value="year">This Year</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
              <select className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base">
                <option>Class 10A</option>
                <option>Class 10B</option>
                <option>Class 9A</option>
                <option>Class 9B</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-calendar-check-line text-lg sm:text-xl text-blue-600"></i>
              </div>
              <span className="text-xs sm:text-sm text-green-600 font-medium">+5%</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">87%</div>
            <div className="text-xs sm:text-sm text-gray-600">Avg Attendance</div>
          </Card>

          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-file-list-line text-lg sm:text-xl text-green-600"></i>
              </div>
              <span className="text-xs sm:text-sm text-green-600 font-medium">+8%</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">82%</div>
            <div className="text-xs sm:text-sm text-gray-600">Avg Grade</div>
          </Card>

          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-emotion-line text-lg sm:text-xl text-purple-600"></i>
              </div>
              <span className="text-xs sm:text-sm text-red-600 font-medium">-2%</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">12</div>
            <div className="text-xs sm:text-sm text-gray-600">Behavior Issues</div>
          </Card>

          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <i className="ri-message-line text-lg sm:text-xl text-orange-600"></i>
              </div>
              <span className="text-xs sm:text-sm text-green-600 font-medium">+12%</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">156</div>
            <div className="text-xs sm:text-sm text-gray-600">Messages Sent</div>
          </Card>
        </div>

        {/* Main Chart */}
        <Card className="p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
            <h3 className="text-lg font-semibold text-gray-900">Attendance Trend</h3>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1.5 text-xs sm:text-sm font-medium bg-teal-100 text-teal-700 rounded-lg">
                Daily
              </button>
              <button className="px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
                Weekly
              </button>
              <button className="px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
                Monthly
              </button>
            </div>
          </div>
          <div className="h-64 sm:h-80 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <i className="ri-bar-chart-line text-4xl sm:text-5xl text-gray-300 mb-3"></i>
              <p className="text-sm sm:text-base text-gray-500">Chart visualization would appear here</p>
            </div>
          </div>
        </Card>

        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Top Performers */}
          <Card className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-trophy-line text-yellow-600"></i>
              Top Performers
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Priya Sharma', score: '95%', subject: 'Overall' },
                { name: 'Arjun Kumar', score: '93%', subject: 'Mathematics' },
                { name: 'Sneha Patel', score: '92%', subject: 'Science' },
                { name: 'Rahul Singh', score: '90%', subject: 'English' },
                { name: 'Ananya Reddy', score: '89%', subject: 'Overall' }
              ].map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-sm font-bold text-teal-600">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{student.name}</p>
                      <p className="text-xs text-gray-600">{student.subject}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-green-600">{student.score}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Students Needing Attention */}
          <Card className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-alert-line text-red-600"></i>
              Needs Attention
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Vikram Singh', issue: 'Low attendance (65%)', severity: 'high' },
                { name: 'Rahul Sharma', issue: 'Failing 4 subjects', severity: 'high' },
                { name: 'Kavya Desai', issue: 'Behavior issues', severity: 'medium' },
                { name: 'Rohan Patel', issue: 'Late submissions', severity: 'medium' },
                { name: 'Meera Kumar', issue: 'Declining grades', severity: 'low' }
              ].map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{student.name}</p>
                    <p className="text-xs text-gray-600 truncate">{student.issue}</p>
                  </div>
                  <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                    student.severity === 'high' ? 'bg-red-100 text-red-800' :
                    student.severity === 'medium' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {student.severity}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Subject-wise Performance */}
        <Card className="p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject-wise Performance</h3>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Score</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pass Rate</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { subject: 'Mathematics', avg: '85%', pass: '92%', trend: 'up' },
                    { subject: 'Science', avg: '82%', pass: '88%', trend: 'up' },
                    { subject: 'English', avg: '78%', pass: '85%', trend: 'down' },
                    { subject: 'Hindi', avg: '80%', pass: '90%', trend: 'up' },
                    { subject: 'Social Studies', avg: '83%', pass: '91%', trend: 'up' }
                  ].map((subject, index) => (
                    <tr key={index}>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{subject.subject}</td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subject.avg}</td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subject.pass}</td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center text-sm font-medium ${
                          subject.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          <i className={`${subject.trend === 'up' ? 'ri-arrow-up-line' : 'ri-arrow-down-line'} mr-1`}></i>
                          {subject.trend === 'up' ? '+5%' : '-3%'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;
