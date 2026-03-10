
interface Activity {
  id: string;
  type: 'grade' | 'homework' | 'message' | 'meeting' | 'attendance';
  title: string;
  description: string;
  timestamp: string;
  status?: 'completed' | 'pending' | 'overdue';
}

interface RecentActivityListProps {
  activities: Activity[];
}

export default function RecentActivityList({ activities }: RecentActivityListProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'grade':
        return 'ri-file-chart-line';
      case 'homework':
        return 'ri-book-open-line';
      case 'message':
        return 'ri-message-3-line';
      case 'meeting':
        return 'ri-calendar-event-line';
      case 'attendance':
        return 'ri-calendar-check-line';
      default:
        return 'ri-information-line';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'grade':
        return 'bg-blue-100 text-blue-600';
      case 'homework':
        return 'bg-purple-100 text-purple-600';
      case 'message':
        return 'bg-green-100 text-green-600';
      case 'meeting':
        return 'bg-orange-100 text-orange-600';
      case 'attendance':
        return 'bg-teal-100 text-teal-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    
    const colors = {
      completed: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      overdue: 'bg-red-100 text-red-700',
    };

    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${colors[status as keyof typeof colors]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.type)}`}>
            <i className={`${getActivityIcon(activity.type)} text-base sm:text-lg`}></i>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2 mb-1">
              <h4 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                {activity.title}
              </h4>
              {getStatusBadge(activity.status)}
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mb-1 line-clamp-2">
              {activity.description}
            </p>
            <p className="text-xs text-gray-500">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
