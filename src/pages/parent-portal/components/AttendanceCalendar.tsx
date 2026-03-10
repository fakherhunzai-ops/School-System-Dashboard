
interface AttendanceCalendarProps {
  attendanceData: Record<string, 'present' | 'absent' | 'late' | 'excused' | 'holiday' | 'weekend' | 'future'>;
}

export default function AttendanceCalendar({ attendanceData }: AttendanceCalendarProps) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-500';
      case 'absent':
        return 'bg-red-500';
      case 'late':
        return 'bg-orange-500';
      case 'excused':
        return 'bg-blue-500';
      case 'holiday':
        return 'bg-gray-300';
      case 'weekend':
        return 'bg-gray-200';
      default:
        return 'bg-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return 'ri-check-line';
      case 'absent':
        return 'ri-close-line';
      case 'late':
        return 'ri-time-line';
      case 'excused':
        return 'ri-information-line';
      case 'holiday':
        return 'ri-calendar-line';
      default:
        return '';
    }
  };

  return (
    <div>
      {/* Calendar Grid - Responsive sizing */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-3 sm:mb-4">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center text-xs sm:text-sm font-medium text-gray-600 py-1 sm:py-2"
          >
            {day}
          </div>
        ))}
        
        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}
        
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          const status = attendanceData?.[dateKey];
          const isToday = day === currentDate.getDate() && currentMonth === currentDate.getMonth();

          return (
            <div
              key={day}
              className={`aspect-square flex items-center justify-center rounded-md text-xs sm:text-sm font-medium relative ${
                status ? getStatusColor(status) : 'bg-gray-50'
              } ${status ? 'text-white' : 'text-gray-700'} ${
                isToday ? 'ring-2 ring-blue-600 ring-offset-1 sm:ring-offset-2' : ''
              }`}
            >
              {status && (
                <i className={`${getStatusIcon(status)} text-xs sm:text-sm absolute`}></i>
              )}
              {!status && day}
            </div>
          );
        })}
      </div>

      {/* Legend - Wrap on mobile */}
      <div className="flex flex-wrap gap-2 sm:gap-4 pt-3 sm:pt-4 border-t border-gray-200">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded"></div>
          <span className="text-xs sm:text-sm text-gray-600">Present</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded"></div>
          <span className="text-xs sm:text-sm text-gray-600">Absent</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 rounded"></div>
          <span className="text-xs sm:text-sm text-gray-600">Late</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded"></div>
          <span className="text-xs sm:text-sm text-gray-600">Excused</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-300 rounded"></div>
          <span className="text-xs sm:text-sm text-gray-600">Holiday</span>
        </div>
      </div>
    </div>
  );
}
