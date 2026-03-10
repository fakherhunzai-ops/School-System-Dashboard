import { TermReport } from '../../../../mocks/grades';

interface TermReportCardProps {
  /** The term report to display. Must be a valid object; otherwise the component renders a fallback. */
  report?: TermReport;
}

/**
 * Renders a card visualising a term report.
 * Includes defensive checks and graceful fallback UI when required data is missing.
 */
export default function TermReportCard({ report }: TermReportCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 sm:p-6 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">{report.term}</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">{report.period}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-500">Overall Grade</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{report.overallGrade}</p>
            </div>
            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-500">Percentage</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{report.percentage}%</p>
            </div>
            <button className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
              <i className="ri-download-line mr-2"></i>
              Download
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* Subject Grades - Horizontal scroll on mobile */}
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle px-4 sm:px-0">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
                    Subject
                  </th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
                    Grade
                  </th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
                    Score
                  </th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {report.subjects.map((subject, index) => (
                  <tr key={index}>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {subject.name}
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm font-semibold text-blue-600 whitespace-nowrap">
                      {subject.grade}
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm text-gray-600 whitespace-nowrap">
                      {subject.score}%
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm text-gray-600">
                      {subject.remarks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Teacher Comments */}
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg">
          <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Teacher's Comments</p>
          <p className="text-xs sm:text-sm text-gray-600">{report.teacherComments}</p>
        </div>
      </div>
    </div>
  );
}
