import React from 'react';
import Badge from '../../../components/base/Badge';
import { AssignmentGrade } from '../../../mocks/grades';

interface AssignmentTableProps {
  assignments: AssignmentGrade[];
}

const typeConfig: Record<
  string,
  { icon: string; label: string }
> = {
  assignment: { icon: 'ri-file-text-line', label: 'Assignment' },
  test: { icon: 'ri-file-list-3-line', label: 'Test' },
  project: { icon: 'ri-folder-line', label: 'Project' },
  quiz: { icon: 'ri-questionnaire-line', label: 'Quiz' },
};

const statusConfig: Record<
  string,
  { variant: 'success' | 'warning' | 'danger'; label: string }
> = {
  graded: { variant: 'success', label: 'Graded' },
  pending: { variant: 'warning', label: 'Pending' },
  missing: { variant: 'danger', label: 'Missing' },
};

export default function AssignmentTable({
  assignments,
}: AssignmentTableProps) {
  const getStatusBadge = (status: string) => {
    const colors = {
      submitted: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      graded: 'bg-blue-100 text-blue-700',
      overdue: 'bg-red-100 text-red-700',
    };

    return (
      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${colors[status as keyof typeof colors]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-w-full">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Assignment
            </th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Subject
            </th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Due Date
            </th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Status
            </th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Score
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {assignments.map((assignment) => (
            <tr key={assignment.id} className="hover:bg-gray-50">
              <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{assignment.title}</div>
              </td>
              <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600">{assignment.subject}</div>
              </td>
              <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600">{assignment.dueDate}</div>
              </td>
              <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                {getStatusBadge(assignment.status)}
              </td>
              <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-semibold text-gray-900">
                  {assignment.score ? `${assignment.score}%` : '-'}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
