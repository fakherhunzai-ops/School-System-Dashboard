
import { useState } from 'react';
import { ScheduleBlock, subjectColors } from '../../../mocks/schedule';

interface ScheduleCardProps {
  block: ScheduleBlock;
  compact?: boolean;
}

export default function ScheduleCard({ block, compact = false }: ScheduleCardProps) {
  const [hovered, setHovered] = useState(false);
  const colors = subjectColors[block.subject];

  if (block.type === 'break') {
    return (
      <div
        className={`relative border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center gap-2 transition-all ${
          compact ? 'py-3 px-2' : 'py-5 px-4'
        }`}
      >
        <div className="w-5 h-5 flex items-center justify-center">
          <i className="ri-cup-line text-gray-400"></i>
        </div>
        <span className="text-sm text-gray-400 font-medium">{block.subject}</span>
        {!compact && (
          <span className="text-xs text-gray-300 ml-1">
            {block.startTime} - {block.endTime}
          </span>
        )}
      </div>
    );
  }

  if (block.type === 'free') {
    return (
      <div
        className={`relative border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center gap-2 transition-all ${
          compact ? 'py-3 px-2' : 'py-5 px-4'
        }`}
      >
        <div className="w-5 h-5 flex items-center justify-center">
          <i className="ri-time-line text-gray-400"></i>
        </div>
        <span className="text-sm text-gray-400 font-medium">{block.subject}</span>
        {!compact && (
          <span className="text-xs text-gray-300 ml-1">
            {block.startTime} - {block.endTime}
          </span>
        )}
      </div>
    );
  }

  // Guard against missing color definitions
  if (!colors) return null;

  return (
    <div
      className={`relative ${colors.bg} border-l-4 ${colors.border} rounded-lg transition-all cursor-pointer ${
        hovered ? 'shadow-md scale-[1.01]' : 'shadow-sm'
      } ${compact ? 'p-3' : 'p-4'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-5 h-5 flex items-center justify-center ${colors.text}`}>
              <i className={`${colors.icon} text-base`}></i>
            </div>
            <h4
              className={`font-semibold ${colors.text} ${
                compact ? 'text-sm' : 'text-base'
              } truncate`}
            >
              {block.subject}
            </h4>
          </div>
          <p className={`text-gray-600 font-medium ${compact ? 'text-xs' : 'text-sm'}`}>
            {block.className}
          </p>
          {!compact && (
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <i className="ri-map-pin-line"></i>
                {block.room}
              </span>
              <span className="flex items-center gap-1">
                <i className="ri-group-line"></i>
                {block.students} students
              </span>
              <span className="flex items-center gap-1">
                <i className="ri-time-line"></i>
                {block.startTime} - {block.endTime}
              </span>
            </div>
          )}
          {compact && (
            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
              <span>{block.room}</span>
              <span>·</span>
              <span>{block.students}</span>
            </div>
          )}
        </div>
        {/* The original template literal caused a parsing error because of the '/' in the Tailwind class.
            Switching to string concatenation avoids the issue while preserving the intended class name. */}
        {!compact && (
          <span
            className={
              'text-xs font-bold ' +
              colors.text +
              ' bg-white/60 px-2 py-0.5 rounded-full'
            }
          >
            {block.startTime}
          </span>
        )}
      </div>
    </div>
  );
}
