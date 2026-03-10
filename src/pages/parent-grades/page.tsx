
import { useState } from 'react';
import ParentSidebar from '../../components/feature/ParentSidebar';
import TopBar from '../../components/feature/TopBar';
import ResponsiveLayout from '../../components/feature/ResponsiveLayout';
import SubjectGradeCard from './components/SubjectGradeCard';
import AssignmentTable from './components/AssignmentTable';
import TermReportCard from './components/TermReportCard';
import { gradesData } from '../../mocks/grades';

type TabType = 'current' | 'assignments' | 'reports';

export default function ParentGrades() {
  const [activeTab, setActiveTab] = useState<TabType>('current');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ParentSidebar />
      <ResponsiveLayout>
        <TopBar title="Grades & Reports" />
        
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Tabs - Horizontal scroll on mobile */}
          <div className="mb-6 sm:mb-8 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex gap-2 sm:gap-4 border-b border-gray-200 min-w-max sm:min-w-0">
              <button
                onClick={() => setActiveTab('current')}
                className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'current'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Current Grades
              </button>
              <button
                onClick={() => setActiveTab('assignments')}
                className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'assignments'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Assignments
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'reports'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Term Reports
              </button>
            </div>
          </div>

          {/* Current Grades Tab */}
          {activeTab === 'current' && (
            <div>
              {/* Overall Stats - Stack on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-600">Overall Average</h3>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className="ri-trophy-line text-base sm:text-lg text-blue-600"></i>
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">A</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">92.5%</p>
                </div>

                <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-600">Class Rank</h3>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <i className="ri-medal-line text-base sm:text-lg text-green-600"></i>
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">3rd</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">Out of 45 students</p>
                </div>

                <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-600">Subjects</h3>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className="ri-book-line text-base sm:text-lg text-purple-600"></i>
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">8</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">Total subjects</p>
                </div>

                <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-600">Improvement</h3>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <i className="ri-arrow-up-line text-base sm:text-lg text-orange-600"></i>
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">+3.5%</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">From last term</p>
                </div>
              </div>

              {/* Subject Grade Cards - 2 col → 1 col on mobile */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {gradesData.subjects.map((subject) => (
                  <SubjectGradeCard key={subject.id} subject={subject} />
                ))}
              </div>
            </div>
          )}

          {/* Assignments Tab */}
          {activeTab === 'assignments' && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Recent Assignments</h2>
              </div>
              {/* Table scrolls horizontally on mobile */}
              <div className="overflow-x-auto">
                <AssignmentTable assignments={gradesData.assignments} />
              </div>
            </div>
          )}

          {/* Term Reports Tab */}
          {activeTab === 'reports' && (
            <div className="space-y-4 sm:space-y-6">
              {gradesData.termReports.map((report) => (
                <TermReportCard key={report.id} report={report} />
              ))}
            </div>
          )}
        </div>
      </ResponsiveLayout>
    </div>
  );
}
