
interface Child {
  id: string;
  name: string;
  class: string;
  section: string;
  rollNumber: string;
  attendanceRate: number;
  overallGrade: string;
  pendingTasks: number;
  presentDays: number;
  totalDays: number;
  attendanceCalendar: Record<string, 'present' | 'absent' | 'late' | 'holiday'>;
}

interface ChildSelectorProps {
  children: Child[];
  selectedChild: Child;
  onSelectChild: (child: Child) => void;
}

export default function ChildSelector({ children, selectedChild, onSelectChild }: ChildSelectorProps) {
  return (
    <div className="flex gap-3 sm:gap-4 pb-2 min-w-max sm:min-w-0">
      {children.map((child) => {
        const isSelected = selectedChild.id === child.id;
        return (
          <button
            key={child.id}
            onClick={() => onSelectChild(child)}
            className={`flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 rounded-lg border-2 transition-all cursor-pointer whitespace-nowrap ${
              isSelected
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
              isSelected ? 'bg-blue-600' : 'bg-gray-200'
            }`}>
              <i className={`ri-user-line text-lg sm:text-xl ${
                isSelected ? 'text-white' : 'text-gray-600'
              }`}></i>
            </div>
            <div className="text-left">
              <p className={`text-sm sm:text-base font-semibold ${
                isSelected ? 'text-blue-900' : 'text-gray-900'
              }`}>
                {child.name}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                Class {child.class} - {child.section}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
