interface SubjectGradeCardProps {
  subject: {
    name: string;
    teacher: string;
    currentGrade: string;
    percentage: number;
    classAverage: number;
    recentScores: number[];
  };
}

export default function SubjectGradeCard({ subject }: SubjectGradeCardProps) {
  const getGradeColor = (grade: string) => {
    if (grade === 'A' || grade === 'A+') return 'text-green-600 bg-green-100';
    if (grade === 'B' || grade === 'B+') return 'text-blue-600 bg-blue-100';
    if (grade === 'C' || grade === 'C+') return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 truncate">
            {subject.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">{subject.teacher}</p>
        </div>
        <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xl sm:text-2xl font-bold ${getGradeColor(subject.currentGrade)} self-start`}>
          {subject.currentGrade}
        </div>
      </div>

      {/* Stats Grid - 2 col on all sizes */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
        <div>
          <p className="text-xs sm:text-sm text-gray-500 mb-1">Current Score</p>
          <p className="text-base sm:text-lg font-semibold text-gray-900">{subject.percentage}%</p>
        </div>
        <div>
          <p className="text-xs sm:text-sm text-gray-500 mb-1">Class Average</p>
          <p className="text-base sm:text-lg font-semibold text-gray-900">{subject.classAverage}%</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{subject.percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${subject.percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Recent Assessments - Wrap on mobile */}
      <div>
        <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Recent Assessments</p>
        <div className="flex flex-wrap gap-2">
          {subject.recentScores.map((score, index) => (
            <div
              key={index}
              className="px-2 sm:px-3 py-1 bg-gray-100 rounded text-xs sm:text-sm text-gray-700"
            >
              {score}%
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
