
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/feature/Sidebar';
import TopBar from '../../components/feature/TopBar';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Badge from '../../components/base/Badge';
import Modal from '../../components/base/Modal';
import { classes, students as initialStudents } from '../../mocks/attendance';

type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export default function Attendance() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState(classes[0].id);
  const [students, setStudents] = useState(initialStudents);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedClassData = classes.find(c => c.id === selectedClass);

  const updateStatus = (studentId: string, status: AttendanceStatus) => {
    setStudents(students.map(s => 
      s.id === studentId ? { ...s, status } : s
    ));
  };

  const markAllPresent = () => {
    setStudents(students.map(s => ({ ...s, status: 'present' as AttendanceStatus })));
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setShowConfirmModal(false);
      setSubmitted(true);
      setTimeout(() => {
        navigate('/attendance-summary');
      }, 1500);
    }, 1500);
  };

  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case 'present': return 'success';
      case 'absent': return 'danger';
      case 'late': return 'warning';
      case 'excused': return 'info';
      default: return 'neutral';
    }
  };

  const statusCounts = {
    present: students.filter(s => s.status === 'present').length,
    absent: students.filter(s => s.status === 'absent').length,
    late: students.filter(s => s.status === 'late').length,
    excused: students.filter(s => s.status === 'excused').length
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-0 lg:ml-64">
        <TopBar
          title="Mark Attendance"
          subtitle={`${selectedClassData?.name} - ${selectedClassData?.students} students`}
          actions={
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={markAllPresent}>
                <i className="ri-checkbox-multiple-line mr-2"></i>
                <span className="hidden sm:inline">Mark All Present</span>
                <span className="sm:hidden">All Present</span>
              </Button>
              <Button variant="primary" onClick={() => setShowConfirmModal(true)}>
                <i className="ri-save-line mr-2"></i>
                <span className="hidden sm:inline">Submit Attendance</span>
                <span className="sm:hidden">Submit</span>
              </Button>
            </div>
          }
        />

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Filter Bar - wraps on mobile */}
          <Card className="mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Select Class:</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  {classes.map(cls => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name} ({cls.students} students)
                    </option>
                  ))}
                </select>
                <span className="text-sm text-gray-500">Date: January 15, 2025</span>
              </div>

              {/* Status Counters - wraps on mobile, scrollable on very small screens */}
              <div className="flex flex-wrap gap-3 sm:gap-4 text-sm overflow-x-auto pb-2 lg:pb-0">
                <div className="flex items-center whitespace-nowrap">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Present: {statusCounts.present}</span>
                </div>
                <div className="flex items-center whitespace-nowrap">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Absent: {statusCounts.absent}</span>
                </div>
                <div className="flex items-center whitespace-nowrap">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Late: {statusCounts.late}</span>
                </div>
                <div className="flex items-center whitespace-nowrap">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Excused: {statusCounts.excused}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Student Table - horizontally scrollable on mobile with sticky first column */}
          <Card padding="none">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="sticky left-0 bg-gray-50 px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase z-10">Roll #</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Student Name</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Previous Absences</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                    <th className="px-4 sm:px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="sticky left-0 bg-white hover:bg-gray-50 px-4 sm:px-6 py-4 text-sm text-gray-900 z-10">{student.rollNumber}</td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-medium text-blue-600">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className="text-sm text-gray-600">{student.absences} days</span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <Badge variant={getStatusColor(student.status)}>
                          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        {/* Desktop: Full text buttons */}
                        <div className="hidden lg:flex items-center justify-center gap-2">
                          <button
                            onClick={() => updateStatus(student.id, 'present')}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                              student.status === 'present'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-green-100'
                            }`}
                          >
                            Present
                          </button>
                          <button
                            onClick={() => updateStatus(student.id, 'absent')}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                              student.status === 'absent'
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-red-100'
                            }`}
                          >
                            Absent
                          </button>
                          <button
                            onClick={() => updateStatus(student.id, 'late')}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                              student.status === 'late'
                                ? 'bg-yellow-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-yellow-100'
                            }`}
                          >
                            Late
                          </button>
                          <button
                            onClick={() => updateStatus(student.id, 'excused')}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                              student.status === 'excused'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                            }`}
                          >
                            Excused
                          </button>
                        </div>

                        {/* Mobile/Tablet: Icon buttons */}
                        <div className="flex lg:hidden items-center justify-center gap-1">
                          <button
                            onClick={() => updateStatus(student.id, 'present')}
                            className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
                              student.status === 'present'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-green-100'
                            }`}
                            title="Present"
                          >
                            <i className="ri-check-line"></i>
                          </button>
                          <button
                            onClick={() => updateStatus(student.id, 'absent')}
                            className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
                              student.status === 'absent'
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-red-100'
                            }`}
                            title="Absent"
                          >
                            <i className="ri-close-line"></i>
                          </button>
                          <button
                            onClick={() => updateStatus(student.id, 'late')}
                            className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
                              student.status === 'late'
                                ? 'bg-yellow-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-yellow-100'
                            }`}
                            title="Late"
                          >
                            <i className="ri-time-line"></i>
                          </button>
                          <button
                            onClick={() => updateStatus(student.id, 'excused')}
                            className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
                              student.status === 'excused'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                            }`}
                            title="Excused"
                          >
                            <i className="ri-file-text-line"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {submitted && (
            <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 left-4 sm:left-auto bg-green-600 text-white px-4 sm:px-6 py-4 rounded-lg shadow-lg flex items-center">
              <i className="ri-checkbox-circle-fill text-2xl mr-3"></i>
              <div>
                <p className="font-semibold text-sm sm:text-base">Attendance Submitted Successfully!</p>
                <p className="text-xs sm:text-sm text-green-100">Redirecting to summary...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirm Attendance Submission"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowConfirmModal(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit} disabled={submitting}>
              {submitting ? (
                <span className="flex items-center">
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  Submitting...
                </span>
              ) : (
                'Confirm & Submit'
              )}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            You are about to submit attendance for <strong>{selectedClassData?.name}</strong> on <strong>January 15, 2025</strong>.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Present:</span>
              <span className="font-semibold text-green-600">{statusCounts.present} students</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Absent:</span>
              <span className="font-semibold text-red-600">{statusCounts.absent} students</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Late:</span>
              <span className="font-semibold text-yellow-600">{statusCounts.late} students</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Excused:</span>
              <span className="font-semibold text-blue-600">{statusCounts.excused} students</span>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            Once submitted, the system will automatically flag at-risk students for follow-up.
          </p>
        </div>
      </Modal>
    </div>
  );
}
