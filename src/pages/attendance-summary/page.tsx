import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/feature/Sidebar';
import TopBar from '../../components/feature/TopBar';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Badge from '../../components/base/Badge';

export default function AttendanceSummary() {
  const navigate = useNavigate();

  const flaggedStudents = [
    { id: '3', name: 'Olivia Brown', absences: 8, riskLevel: 'level2' },
    { id: '8', name: 'Mason Taylor', absences: 12, riskLevel: 'level3' },
    { id: '15', name: 'Amelia Lee', absences: 9, riskLevel: 'level2' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-0 lg:ml-64">
        <TopBar title="Attendance Summary" />

        <div className="p-4 sm:p-6 lg:p-8">
          <Card className="mb-6">
            <div className="text-center py-6 sm:py-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-checkbox-circle-fill text-3xl sm:text-4xl text-green-600"></i>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Attendance Submitted Successfully!</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6">Grade 5A attendance for January 15, 2025 has been recorded.</p>

              {/* Stats Row - wraps on mobile */}
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-6">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600">22</p>
                  <p className="text-sm text-gray-600">Present</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-red-600">3</p>
                  <p className="text-sm text-gray-600">Absent</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-yellow-600">2</p>
                  <p className="text-sm text-gray-600">Late</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600">1</p>
                  <p className="text-sm text-gray-600">Excused</p>
                </div>
              </div>

              <Button variant="primary" onClick={() => navigate('/dashboard')}>
                <i className="ri-home-line mr-2"></i>
                Back to Dashboard
              </Button>
            </div>
          </Card>

          {flaggedStudents.length > 0 && (
            <Card>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Flagged Students</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {flaggedStudents.length} students require immediate follow-up
                  </p>
                </div>
                <Badge variant="danger">{flaggedStudents.length} Students</Badge>
              </div>

              <div className="space-y-4">
                {flaggedStudents.map((student) => {
                  const getRiskBadge = (level: string) => {
                    switch (level) {
                      case 'level3': return { variant: 'danger' as const, label: 'High Risk' };
                      case 'level2': return { variant: 'warning' as const, label: 'Medium Risk' };
                      case 'level1': return { variant: 'info' as const, label: 'Low Risk' };
                      default: return { variant: 'neutral' as const, label: 'Unknown' };
                    }
                  };

                  const risk = getRiskBadge(student.riskLevel);

                  return (
                    <div key={student.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg gap-4">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <i className="ri-alert-line text-xl text-red-600"></i>
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
                            <h4 className="font-semibold text-gray-900">{student.name}</h4>
                            <Badge variant={risk.variant}>{risk.label}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {student.absences} total absences - Parent contact recommended
                          </p>
                        </div>
                      </div>

                      {/* Buttons stack on small screens */}
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:flex-shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/student/${student.id}`)}
                          className="w-full sm:w-auto"
                        >
                          <span className="sm:hidden">Profile</span>
                          <span className="hidden sm:inline">View Profile</span>
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => navigate(`/communication/${student.id}`)}
                          className="w-full sm:w-auto"
                        >
                          <i className="ri-message-3-line mr-2"></i>
                          Contact Parent
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-sm text-gray-600">
                  These students have been automatically added to your follow-up queue.
                </p>
                <Button variant="outline" onClick={() => navigate('/flagged-students')} className="w-full sm:w-auto whitespace-nowrap">
                  View All Flagged Students
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
