
import { ScheduleBlock } from '../../../mocks/schedule';
import ScheduleCard from './ScheduleCard';

interface DailyViewProps {
  schedule: ScheduleBlock[];
}

export default function DailyView({ schedule }: DailyViewProps) {
  return (
    <div className="space-y-3">
      {schedule.map((block, index) => (
        <div key={block.id} className="flex gap-3 sm:gap-4">
          {/* Time column - narrower on mobile */}
          <div className="w-16 sm:w-20 flex-shrink-0 pt-4 text-right">
            <p className="text-xs sm:text-sm font-semibold text-gray-700">{block.startTime}</p>
            <p className="text-xs text-gray-400">{block.endTime}</p>
          </div>
          <div className="relative flex-1 min-w-0">
            {index < schedule.length - 1 && (
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 -translate-x-3 sm:-translate-x-4 translate-y-6"></div>
            )}
            <div className="absolute left-0 top-5 w-2 h-2 rounded-full bg-gray-300 -translate-x-[0.9rem] sm:-translate-x-[1.15rem]"></div>
            <ScheduleCard block={block} />
          </div>
        </div>
      ))}
    </div>
  );
}
