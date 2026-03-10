
import { useState } from 'react';
import TopBar from '../../components/feature/TopBar';
import Card from '../../components/base/Card';
import Badge from '../../components/base/Badge';
import Button from '../../components/base/Button';

interface FlaggedStudent {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  section: string;
  avatar: string;
  flags: {
    type: 'attendance' | 'behavior' | 'academic' | 'health';
    severity: 'high' | 'medium' | 'low';
    description: string;
    date: string;
  }[];
  parentContact: string;
  lastContactDate: string;
}

const flaggedStudents: FlaggedStudent[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    rollNumber: '10A-015',
    class: '10',
    section: 'A',
    avatar: 'https://readdy.ai/api/search-image?query=Indian%20teenage%20boy%20student%20portrait%20professional%20school%20photo%20with%20neat%20uniform%20and%20friendly%20smile%20simple%20light%20background&width=100&height=100&seq=flagged1&orientation=squarish',
    flags: [
      {
        type: 'attendance',
        severity: 'high',
        description: 'Absent for 8 consecutive days',
        date: '2024-01-15'
      },
      {
        type: 'academic',
        severity: 'medium',
        description: 'Failed last 3 math tests',
        date: '2024-01-10'
      }
    ],
    parentContact: '+91 98765 43210',
    lastContactDate: '2024-01-12'
  },
  {
    id: '2',
    name: 'Priya Patel',
    rollNumber: '10A-023',
    class: '10',
    section: 'A',
    avatar: 'https://readdy.ai/api/search-image?query=Indian%20teenage%20girl%20student%20portrait%20professional%20school%20photo%20with%20neat%20uniform%20and%20bright%20smile%20simple%20light%20background&width=100&height=100&seq=flagged2&orientation=squarish',
    flags: [
      {
        type: 'behavior',
        severity: 'high',
        description: 'Multiple classroom disruptions',
        date: '2024-01-14'
      },
      {
        type: 'academic',
        severity: 'medium',
        description: 'Not submitting homework regularly',
        date: '2024-01-13'
      }
    ],
    parentContact: '+91 98765 43211',
    lastContactDate: '2024-01-14'
  },
  {
    id: '3',
    name: 'Arjun Kumar',
    rollNumber: '10A-008',
    class: '10',
    section: 'A',
    avatar: 'https://readdy.ai/api/search-image?query=Indian%20teenage%20boy%20student%20portrait%20professional%20school%20photo%20with%20glasses%20neat%20uniform%20and%20confident%20expression%20simple%20light%20background&width=100&height=100&seq=flagged3&orientation=squarish',
    flags: [
      {
        type: 'health',
        severity: 'medium',
        description: 'Frequent sick leave requests',
        date: '2024-01-15'
      }
    ],
    parentContact: '+91 98765 43212',
    lastContactDate: '2024-01-08'
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    rollNumber: '10A-031',
    class: '10',
    section: 'A',
    avatar: 'https://readdy.ai/api/search-image?query=Indian%20teenage%20girl%20student%20portrait%20professional%20school%20photo%20with%20neat%20uniform%20and%20gentle%20smile%20simple%20light%20background&width=100&height=100&seq=flagged4&orientation=squarish',
    flags: [
      {
        type: 'attendance',
        severity: 'medium',
        description: 'Late arrivals 12 times this month',
        date: '2024-01-15'
      },
      {
        type: 'behavior',
        severity: 'low',
        description: 'Sleeping in class',
        date: '2024-01-13'
      }
    ],
    parentContact: '+91 98765 43213',
    lastContactDate: '2024-01-11'
  },
  {
    id: '5',
    name: 'Vikram Singh',
    rollNumber: '10A-042',
    class: '10',
    section: 'A',
    avatar: 'https://readdy.ai/api/search-image?query=Indian%20teenage%20boy%20student%20portrait%20professional%20school%20photo%20with%20neat%20uniform%20and%20serious%20expression%20simple%20light%20background&width=100&height=100&seq=flagged5&orientation=squarish',
    flags: [
      {
        type: 'academic',
        severity: 'high',
        description: 'Failing in 4 subjects',
        date: '2024-01-14'
      },
      {
        type: 'attendance',
        severity: 'medium',
        description: 'Attendance below 75%',
        date: '2024-01-15'
      }
    ],
    parentContact: '+91 98765 43214',
    lastContactDate: '2024-01-09'
  }
];

const FlaggedStudentsPage = () => {
  const [filterType, setFilterType] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const filteredStudents = flaggedStudents.filter(student => {
    const typeMatch = filterType === 'all' || student.flags.some(flag => flag.type === filterType);
    const severityMatch = filterSeverity === 'all' || student.flags.some(flag => flag.severity === filterSeverity);
    return typeMatch && severityMatch;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'attendance': return 'bg-blue-100 text-blue-800';
      case 'behavior': return 'bg-purple-100 text-purple-800';
      case 'academic': return 'bg-orange-100 text-orange-800';
      case 'health': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar 
        title="Flagged Students"
        actions={
          <Button variant="primary" className="whitespace-nowrap">
            <i className="ri-download-line mr-2"></i>
            <span className="hidden sm:inline">Export Report</span>
            <span className="sm:hidden">Export</span>
          </Button>
        }
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <Card className="p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1 sm:mb-2">{flaggedStudents.length}</div>
            <div className="text-xs sm:text-sm text-gray-600">Total Flagged</div>
          </Card>
          <Card className="p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1 sm:mb-2">
              {flaggedStudents.filter(s => s.flags.some(f => f.severity === 'high')).length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">High Priority</div>
          </Card>
          <Card className="p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">
              {flaggedStudents.filter(s => s.flags.some(f => f.type === 'attendance')).length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Attendance Issues</div>
          </Card>
          <Card className="p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">
              {flaggedStudents.filter(s => s.flags.some(f => f.type === 'behavior')).length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Behavior Issues</div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Type</label>
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
              >
                <option value="all">All Types</option>
                <option value="attendance">Attendance</option>
                <option value="behavior">Behavior</option>
                <option value="academic">Academic</option>
                <option value="health">Health</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Severity</label>
              <select 
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
              >
                <option value="all">All Severities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Student Cards */}
        <div className="space-y-4">
          {filteredStudents.map(student => (
            <Card key={student.id} className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Avatar and Basic Info */}
                <div className="flex items-start gap-4 flex-shrink-0">
                  <img 
                    src={student.avatar} 
                    alt={student.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                  />
                  <div className="flex-1 sm:flex-initial">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">{student.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{student.rollNumber}</p>
                    <p className="text-xs sm:text-sm text-gray-600">Class {student.class}{student.section}</p>
                  </div>
                </div>

                {/* Flags */}
                <div className="flex-1">
                  <div className="space-y-3">
                    {student.flags.map((flag, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-start gap-2">
                        <div className="flex flex-wrap gap-2">
                          <Badge className={getTypeColor(flag.type)}>
                            {flag.type}
                          </Badge>
                          <Badge className={getSeverityColor(flag.severity)}>
                            {flag.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 flex-1">{flag.description}</p>
                        <span className="text-xs text-gray-500 whitespace-nowrap">{flag.date}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <i className="ri-phone-line"></i>
                        {student.parentContact}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span>Last contacted: {student.lastContactDate}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col gap-2 sm:gap-3 flex-shrink-0">
                  <Button variant="primary" className="flex-1 sm:flex-initial whitespace-nowrap text-sm">
                    <i className="ri-phone-line sm:mr-2"></i>
                    <span className="hidden sm:inline">Contact Parent</span>
                  </Button>
                  <Button variant="outline" className="flex-1 sm:flex-initial whitespace-nowrap text-sm">
                    <i className="ri-user-line sm:mr-2"></i>
                    <span className="hidden sm:inline">View Profile</span>
                  </Button>
                  <Button variant="outline" className="flex-1 sm:flex-initial whitespace-nowrap text-sm">
                    <i className="ri-check-line sm:mr-2"></i>
                    <span className="hidden sm:inline">Resolve</span>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <Card className="p-12 text-center">
            <i className="ri-user-search-line text-5xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">No flagged students found with the selected filters.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FlaggedStudentsPage;
