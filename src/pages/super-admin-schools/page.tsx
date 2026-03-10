
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';
import Badge from '../../components/base/Badge';
import Card from '../../components/base/Card';
import SuperAdminLayout from '../../components/feature/SuperAdminLayout';
import { schoolsData } from '../../mocks/superAdminSchools';

type StatusFilter = 'All' | 'Active' | 'Trial' | 'Suspended' | 'Pending';

export default function SuperAdminSchools() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading] = useState(false);
  const itemsPerPage = 10;

  // Filter schools based on search and status
  const filteredSchools = schoolsData.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         school.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || school.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredSchools.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSchools = filteredSchools.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Trial':
        return 'bg-blue-100 text-blue-700';
      case 'Suspended':
        return 'bg-red-100 text-red-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Premium':
        return 'bg-purple-100 text-purple-700';
      case 'Standard':
        return 'bg-blue-100 text-blue-700';
      case 'Trial':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleViewSchool = (schoolId: number) => {
    navigate(`/super-admin/schools/${schoolId}`);
  };

  return (
    <SuperAdminLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Manage Schools</h1>
          <p className="text-sm text-gray-600 mt-1">View and manage all registered schools</p>
        </div>

        {/* Search and Filter Section */}
        <Card className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                <Input
                  type="text"
                  placeholder="Search by school name or city..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 w-full"
                />
              </div>
            </div>

            {/* Filter Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter by:</span>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as StatusFilter);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="All">All Schools</option>
                <option value="Active">Active</option>
                <option value="Trial">Trial</option>
                <option value="Suspended">Suspended</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{paginatedSchools.length}</span> of{' '}
              <span className="font-semibold text-gray-900">{filteredSchools.length}</span> schools
            </p>
          </div>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <Card>
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading schools...</p>
            </div>
          </Card>
        )}

        {/* Empty State */}
        {!isLoading && filteredSchools.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-school-line text-3xl text-gray-400"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No schools found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || statusFilter !== 'All'
                  ? 'Try adjusting your search or filter criteria'
                  : 'No schools have been registered yet'}
              </p>
            </div>
          </Card>
        )}

        {/* Desktop Table View */}
        {!isLoading && filteredSchools.length > 0 && (
          <>
            <div className="hidden lg:block">
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          School Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          City
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Students
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Plan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Last Active
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedSchools.map((school) => (
                        <tr key={school.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-semibold text-gray-900">{school.name}</div>
                              <div className="text-sm text-gray-500">{school.adminName}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{school.city}</div>
                            <div className="text-xs text-gray-500">{school.state}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{school.studentCount.toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge className={getStatusColor(school.status)}>{school.status}</Badge>
                          </td>
                          <td className="px-6 py-4">
                            <Badge className={getPlanColor(school.plan)}>{school.plan}</Badge>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{school.lastActive}</div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewSchool(school.id)}
                              >
                                <i className="ri-eye-line mr-1"></i>
                                View
                              </Button>
                              {school.status === 'Pending' && (
                                <Button variant="primary" size="sm">
                                  <i className="ri-check-line mr-1"></i>
                                  Approve
                                </Button>
                              )}
                              {school.status === 'Active' && (
                                <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                                  <i className="ri-pause-circle-line mr-1"></i>
                                  Suspend
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {paginatedSchools.map((school) => (
                <Card key={school.id} className="hover:shadow-md transition-shadow">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{school.name}</h3>
                        <p className="text-sm text-gray-600">{school.adminName}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(school.status)}>{school.status}</Badge>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Location</p>
                        <p className="text-sm font-medium text-gray-900">{school.city}, {school.state}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Students</p>
                        <p className="text-sm font-medium text-gray-900">{school.studentCount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Plan</p>
                        <Badge className={getPlanColor(school.plan)}>{school.plan}</Badge>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Last Active</p>
                        <p className="text-sm font-medium text-gray-900">{school.lastActive}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-3 border-t border-gray-200">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleViewSchool(school.id)}
                      >
                        <i className="ri-eye-line mr-1"></i>
                        View Details
                      </Button>
                      {school.status === 'Pending' && (
                        <Button variant="primary" size="sm" className="flex-1">
                          <i className="ri-check-line mr-1"></i>
                          Approve
                        </Button>
                      )}
                      {school.status === 'Active' && (
                        <Button variant="outline" size="sm" className="flex-1 text-red-600 border-red-300 hover:bg-red-50">
                          <i className="ri-pause-circle-line mr-1"></i>
                          Suspend
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <i className="ri-arrow-left-s-line mr-1"></i>
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <i className="ri-arrow-right-s-line ml-1"></i>
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </SuperAdminLayout>
  );
}
