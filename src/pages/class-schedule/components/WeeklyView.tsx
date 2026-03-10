
import { ScheduleBlock, subjectColors, weekDays } from '../../../mocks/schedule';
import ScheduleCard from './ScheduleCard';

interface WeeklyViewProps {
  schedule: Record<string, ScheduleBlock[]>;
  currentDay: string;
}

/**
 * WeeklyView – renders a column for each day of the week.
 * It safely handles missing or malformed schedule data and highlights the current day.
 * Horizontally scrollable on mobile devices.
 */
export default function WeeklyView({ schedule, currentDay }: WeeklyViewProps) {
  // Guard against an invalid weekDays array (e.g., imported as undefined)
  const days = Array.isArray(weekDays) ? weekDays : [];

  return (
    <div className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6">
      <div className="min-w-[800px] lg:min-w-0">
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {days.map((day) => {
            const isToday = day === currentDay;
            const daySchedule = Array.isArray(schedule?.[day]) ? schedule[day] : [];

            return (
              <div key={day} className="flex flex-col">
                <div
                  className={`text-center py-2 sm:py-3 rounded-lg mb-2 sm:mb-3 ${
                    isToday ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <p className="font-semibold text-xs sm:text-sm">{day}</p>
                </div>

                <div className="space-y-2 flex-1">
                  {daySchedule.map((block) => (
                    <ScheduleCard key={block.id} block={block} compact />
                  ))}

                  {daySchedule.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-6 sm:py-8 text-gray-400">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mb-2">
                        <i className="ri-calendar-line text-xl sm:text-2xl"></i>
                      </div>
                      <p className="text-xs">No classes</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
