
import { useState } from 'react';
import TopBar from '../../components/feature/TopBar';
import Card from '../../components/base/Card';
import Badge from '../../components/base/Badge';
import Button from '../../components/base/Button';

const StudentProfilePage = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'grades' | 'behavior' | 'communication'>('overview');

  const student = {
    name: 'Rahul Sharma',
    rollNumber: '10A-015',
    class: '10',
    section: 'A',
    avatar: 'https://readdy.ai/api/search-image?query=Indian%20teenage%20boy%20student%20portrait%20professional%20school%20photo%20with%20neat%20uniform%20and%20friendly%20smile%20simple%20light%20background&width=120&height=120&seq=profile1&orientation=squarish',
    admissionNumber: 'ADM2023015',
    dateOfBirth: '2008-05-15',
    gender: 'Male',
    bloodGroup: 'O+',
    address: '123, MG Road, Bangalore, Karnataka - 560001',
    parentName: 'Mr. Rajesh Sharma',
    parentPhone: '+91 98765 43210',
    parentEmail: 'rajesh.sharma@email.com',
    emergencyContact: '+91 98765 43211',
    admissionDate: '2023-04-01'
  };

  const stats = {
    attendance: 85,
    averageGrade: 78,
    behaviorScore: 92,
    assignmentsCompleted: 45,
    totalAssignments: 50
  };

  const recentAttendance = [
    { date: '2024-01-15', status: 'absent', reason: 'Sick leave' },
    { date: '2024-01-14', status: 'absent', reason: 'Sick leave' },
    { date: '2024-01-13', status: 'absent', reason: 'Sick leave' },
    { date: '2024-01-12', status: 'present' },
    { date: '2024-01-11', status: 'present' }
  ];

  const recentGrades = [
    { subject: 'Mathematics', test: 'Unit Test 3', score: 45, total: 50, grade: 'A' },
    { subject: 'Science', test: 'Mid-term', score: 38, total: 50, grade: 'B+' },
    { subject: 'English', test: 'Unit Test 3', score: 42, total: 50, grade: 'A' },
    { subject: 'Hindi', test: 'Unit Test 3', score: 35, total: 50, grade: 'B' }
  ];

  const behaviorRecords = [
    { date: '2024-01-10', type: 'positive', description: 'Helped classmate with homework', teacher: 'Mrs. Gupta' },
    { date: '2024-01-08', type: 'neutral', description: 'Late to class', teacher: 'Mr. Sharma' },
    { date: '2024-01-05', type: 'positive', description: 'Excellent presentation', teacher: 'Mrs. Patel' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar 
        title="Student Profile"
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="whitespace-nowrap text-sm">
              <i className="ri-printer-line sm:mr-2"></i>
              <span className="hidden sm:inline">Print</span>
            </Button>
            <Button variant="primary" className="whitespace-nowrap text-sm">
              <i className="ri-edit-line sm:mr-2"></i>
              <span className="hidden sm:inline">Edit Profile</span>
              <span className="sm:hidden">Edit</span>
            </Button>
          </div>
        }
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header Card */}
        <Card className="p-4 sm:p-6 lg:p-8 mb-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <img 
                src={student.avatar} 
                alt={student.name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
              />
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{student.name}</h2>
                <div className="space-y-1 text-sm sm:text-base text-gray-600">
                  <p><strong>Roll Number:</strong> {student.rollNumber}</p>
                  <p><strong>Class:</strong> {student.class}{student.section}</p>
                  <p><strong>Admission No:</strong> {student.admissionNumber}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-blue-50 rounded-lg p-3 sm:p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">{stats.attendance}%</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Attendance</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3 sm:p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-600">{stats.averageGrade}%</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Avg Grade</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 sm:p-4 text-center col-span-2 sm:col-span-1">
                <div className="text-xl sm:text-2xl font-bold text-purple-600">{stats.behaviorScore}%</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Behavior</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col gap-2 lg:w-48">
              <Button variant="primary" className="w-full whitespace-nowrap text-sm">
                <i className="ri-phone-line mr-2"></i>
                Contact Parent
              </Button>
              <Button variant="outline" className="w-full whitespace-nowrap text-sm">
                <i className="ri-flag-line mr-2"></i>
                Flag Student
              </Button>
              <Button variant="outline" className="w-full whitespace-nowrap text-sm">
                <i className="ri-add-line mr-2"></i>
                Add Follow-up
              </Button>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 min-w-max sm:min-w-0 border-b border-gray-200 pb-px">
            {[
              { id: 'overview', label: 'Overview', icon: 'ri-dashboard-line' },
              { id: 'attendance', label: 'Attendance', icon: 'ri-calendar-check-line' },
              { id: 'grades', label: 'Grades', icon: 'ri-file-list-line' },
              { id: 'behavior', label: 'Behavior', icon: 'ri-emotion-line' },
              { id: 'communication', label: 'Communication', icon: 'ri-message-line' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <i className={tab.icon}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card className="p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-user-line text-teal-600"></i>
                Personal Information
              </h3>
              <div className="space-y-3 text-sm sm:text-base">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Date of Birth</span>
                  <span className="font-medium text-gray-900">{student.dateOfBirth}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Gender</span>
                  <span className="font-medium text-gray-900">{student.gender}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Blood Group</span>
                  <span className="font-medium text-gray-900">{student.bloodGroup}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Admission Date</span>
                  <span className="font-medium text-gray-900">{student.admissionDate}</span>
                </div>
                <div className="py-2">
                  <span className="text-gray-600 block mb-1">Address</span>
                  <span className="font-medium text-gray-900">{student.address}</span>
                </div>
              </div>
            </Card>

            {/* Parent Information */}
            <Card className="p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-parent-line text-teal-600"></i>
                Parent Information
              </h3>
              <div className="space-y-3 text-sm sm:text-base">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Parent Name</span>
                  <span className="font-medium text-gray-900">{student.parentName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Phone</span>
                  <span className="font-medium text-gray-900">{student.parentPhone}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium text-gray-900 break-all">{student.parentEmail}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Emergency Contact</span>
                  <span className="font-medium text-gray-900">{student.emergencyContact}</span>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-4 sm:p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-time-line text-teal-600"></i>
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <i className="ri-alert-line text-red-600 text-lg mt-0.5"></i>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">Absent for 3 consecutive days</p>
                    <p className="text-xs text-gray-600 mt-1">Jan 13-15, 2024 • Reason: Sick leave</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <i className="ri-check-line text-green-600 text-lg mt-0.5"></i>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">Scored 90% in Mathematics Unit Test</p>
                    <p className="text-xs text-gray-600 mt-1">Jan 10, 2024</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <i className="ri-message-line text-blue-600 text-lg mt-0.5"></i>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">Parent meeting scheduled</p>
                    <p className="text-xs text-gray-600 mt-1">Jan 18, 2024 at 3:00 PM</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'attendance' && (
          <Card className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance History</h3>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentAttendance.map((record, index) => (
                      <tr key={index}>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <Badge className={record.status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {record.status}
                          </Badge>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-sm text-gray-600">{record.reason || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'grades' && (
          <Card className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Grades</h3>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentGrades.map((grade, index) => (
                      <tr key={index}>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{grade.subject}</td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">{grade.test}</td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grade.score}/{grade.total}</td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <Badge className="bg-green-100 text-green-800">{grade.grade}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'behavior' && (
          <Card className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Behavior Records</h3>
            <div className="space-y-4">
              {behaviorRecords.map((record, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    record.type === 'positive' ? 'bg-green-100' : record.type === 'negative' ? 'bg-red-100' : 'bg-gray-100'
                  }`}>
                    <i className={`${
                      record.type === 'positive' ? 'ri-thumb-up-line text-green-600' : 
                      record.type === 'negative' ? 'ri-thumb-down-line text-red-600' : 
                      'ri-information-line text-gray-600'
                    }`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{record.description}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-600">
                      <span>{record.date}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>By {record.teacher}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'communication' && (
          <Card className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication History</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <p className="text-sm font-medium text-gray-900">Parent Meeting Scheduled</p>
                  <span className="text-xs text-gray-600 whitespace-nowrap">Jan 12, 2024</span>
                </div>
                <p className="text-sm text-gray-700">Meeting scheduled to discuss attendance issues and academic performance.</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <p className="text-sm font-medium text-gray-900">SMS Sent to Parent</p>
                  <span className="text-xs text-gray-600 whitespace-nowrap">Jan 10, 2024</span>
                </div>
                <p className="text-sm text-gray-700">Notification sent about upcoming parent-teacher meeting.</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <p className="text-sm font-medium text-gray-900">Email Sent</p>
                  <span className="text-xs text-gray-600 whitespace-nowrap">Jan 8, 2024</span>
                </div>
                <p className="text-sm text-gray-700">Monthly progress report sent to parent email.</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StudentProfilePage;
