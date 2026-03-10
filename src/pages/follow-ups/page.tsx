
import { useState } from 'react';
import TopBar from '../../components/feature/TopBar';
import Card from '../../components/base/Card';
import Badge from '../../components/base/Badge';
import Button from '../../components/base/Button';

interface FollowUpTask {
  id: string;
  studentName: string;
  rollNumber: string;
  class: string;
  section: string;
  taskType: 'parent_meeting' | 'counseling' | 'academic_support' | 'behavior_monitoring' | 'health_checkup';
  priority: 'high' | 'medium' | 'low';
  description: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  assignedTo: string;
  notes: string;
}

const followUpTasks: FollowUpTask[] = [
  {
    id: '1',
    studentName: 'Rahul Sharma',
    rollNumber: '10A-015',
    class: '10',
    section: 'A',
    taskType: 'parent_meeting',
    priority: 'high',
    description: 'Schedule urgent parent meeting to discuss attendance issues',
    dueDate: '2024-01-18',
    status: 'pending',
    assignedTo: 'Mrs. Gupta',
    notes: 'Student absent for 8 consecutive days'
  },
  {
    id: '2',
    studentName: 'Priya Patel',
    rollNumber: '10A-023',
    class: '10',
    section: 'A',
    taskType: 'counseling',
    priority: 'high',
    description: 'Behavioral counseling session required',
    dueDate: '2024-01-19',
    status: 'in_progress',
    assignedTo: 'Mr. Sharma',
    notes: 'Multiple classroom disruptions reported'
  },
  {
    id: '3',
    studentName: 'Arjun Kumar',
    rollNumber: '10A-008',
    class: '10',
    section: 'A',
    taskType: 'health_checkup',
    priority: 'medium',
    description: 'Follow up on frequent sick leave requests',
    dueDate: '2024-01-20',
    status: 'pending',
    assignedTo: 'School Nurse',
    notes: 'Check if medical certificate is required'
  },
  {
    id: '4',
    studentName: 'Sneha Reddy',
    rollNumber: '10A-031',
    class: '10',
    section: 'A',
    taskType: 'behavior_monitoring',
    priority: 'low',
    description: 'Monitor punctuality and class participation',
    dueDate: '2024-01-22',
    status: 'in_progress',
    assignedTo: 'Mrs. Gupta',
    notes: 'Late arrivals 12 times this month'
  },
  {
    id: '5',
    studentName: 'Vikram Singh',
    rollNumber: '10A-042',
    class: '10',
    section: 'A',
    taskType: 'academic_support',
    priority: 'high',
    description: 'Arrange extra tutoring sessions for failing subjects',
    dueDate: '2024-01-19',
    status: 'pending',
    assignedTo: 'Subject Teachers',
    notes: 'Failing in 4 subjects - Math, Science, English, Hindi'
  },
  {
    id: '6',
    studentName: 'Ananya Desai',
    rollNumber: '10A-005',
    class: '10',
    section: 'A',
    taskType: 'parent_meeting',
    priority: 'medium',
    description: 'Discuss improvement plan with parents',
    dueDate: '2024-01-21',
    status: 'completed',
    assignedTo: 'Mrs. Gupta',
    notes: 'Meeting completed on 2024-01-16'
  }
];

const FollowUpsPage = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const filteredTasks = followUpTasks.filter(task => {
    const statusMatch = filterStatus === 'all' || task.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case 'parent_meeting': return 'ri-parent-line';
      case 'counseling': return 'ri-mental-health-line';
      case 'academic_support': return 'ri-book-open-line';
      case 'behavior_monitoring': return 'ri-eye-line';
      case 'health_checkup': return 'ri-heart-pulse-line';
      default: return 'ri-task-line';
    }
  };

  const getTaskTypeLabel = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar 
        title="Follow-ups"
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="whitespace-nowrap text-sm">
              <i className="ri-filter-line sm:mr-2"></i>
              <span className="hidden sm:inline">Advanced Filters</span>
            </Button>
            <Button variant="primary" className="whitespace-nowrap text-sm">
              <i className="ri-add-line sm:mr-2"></i>
              <span className="hidden sm:inline">Add Task</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        }
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <Card className="p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
              {followUpTasks.filter(t => t.status === 'pending').length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Pending</div>
          </Card>
          <Card className="p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">
              {followUpTasks.filter(t => t.status === 'in_progress').length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">In Progress</div>
          </Card>
          <Card className="p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">
              {followUpTasks.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Completed</div>
          </Card>
          <Card className="p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1 sm:mb-2">
              {followUpTasks.filter(t => t.priority === 'high' && t.status !== 'completed').length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">High Priority</div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Priority</label>
              <select 
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Task Cards */}
        <div className="space-y-4">
          {filteredTasks.map(task => (
            <Card key={task.id} className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className={`${getTaskTypeIcon(task.taskType)} text-lg sm:text-xl text-teal-600`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">{task.description}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <span className="font-medium">{task.studentName}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{task.rollNumber}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>Class {task.class}{task.section}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status.replace('_', ' ')}
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800">
                      {getTaskTypeLabel(task.taskType)}
                    </Badge>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="ri-calendar-line text-gray-400"></i>
                    <span>Due: {task.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="ri-user-line text-gray-400"></i>
                    <span>Assigned to: {task.assignedTo}</span>
                  </div>
                </div>

                {/* Notes */}
                {task.notes && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700">
                      <strong className="text-gray-900">Notes:</strong> {task.notes}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-gray-200">
                  <Button variant="primary" className="flex-1 sm:flex-initial whitespace-nowrap text-sm">
                    <i className="ri-check-line mr-2"></i>
                    Mark Complete
                  </Button>
                  <Button variant="outline" className="flex-1 sm:flex-initial whitespace-nowrap text-sm">
                    <i className="ri-edit-line mr-2"></i>
                    Edit Task
                  </Button>
                  <Button variant="outline" className="flex-1 sm:flex-initial whitespace-nowrap text-sm">
                    <i className="ri-user-line mr-2"></i>
                    View Student
                  </Button>
                  <Button variant="outline" className="flex-1 sm:flex-initial whitespace-nowrap text-sm">
                    <i className="ri-delete-bin-line mr-2"></i>
                    <span className="hidden sm:inline">Delete</span>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <Card className="p-12 text-center">
            <i className="ri-task-line text-5xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">No follow-up tasks found with the selected filters.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FollowUpsPage;
