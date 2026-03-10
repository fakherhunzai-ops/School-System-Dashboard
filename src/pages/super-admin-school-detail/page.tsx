
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';
import Modal from '../../components/base/Modal';
import SuperAdminLayout from '../../components/feature/SuperAdminLayout';
import { superAdminSchoolsData } from '../../mocks/superAdminSchools';

export default function SuperAdminSchoolDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showEditPlanModal, setShowEditPlanModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  // Find school by ID
  const school = superAdminSchoolsData.find(s => s.id === id);

  if (!school) {
    return (
      <SuperAdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <i className="ri-error-warning-line text-6xl text-gray-400 mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">School Not Found</h2>
            <p className="text-gray-600 mb-6">The school you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/super-admin/schools')} variant="primary">
              <i className="ri-arrow-left-line mr-2"></i>
              Back to Schools
            </Button>
          </div>
        </div>
      </SuperAdminLayout>
    );
  }

  const handleApprove = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowApproveModal(false);
      setSuccessMessage('School has been approved successfully!');
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }, 1500);
  };

  const handleSuspend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowSuspendModal(false);
      setSuccessMessage('School has been suspended successfully.');
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }, 1500);
  };

  const handleEditPlan = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowEditPlanModal(false);
      setSuccessMessage(`Plan updated to ${selectedPlan} successfully!`);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700 border-green-200';
      case 'Trial': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Suspended': return 'bg-red-100 text-red-700 border-red-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Premium': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Standard': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Trial': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const auditLogs = [
    { id: 1, action: 'School Created', user: 'System', timestamp: school.joinDate, icon: 'ri-add-circle-line', color: 'text-green-600' },
    { id: 2, action: 'Plan Upgraded to ' + school.plan, user: 'Super Admin', timestamp: '2024-12-15 10:30 AM', icon: 'ri-arrow-up-circle-line', color: 'text-blue-600' },
    { id: 3, action: 'Admin Contact Updated', user: school.adminName, timestamp: '2024-12-10 02:15 PM', icon: 'ri-edit-line', color: 'text-gray-600' },
    { id: 4, action: 'Last Login', user: school.adminName, timestamp: school.lastActive, icon: 'ri-login-circle-line', color: 'text-purple-600' },
  ];

  return (
    <SuperAdminLayout>
      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in-right">
          <div className="bg-white rounded-lg shadow-xl border border-green-200 p-4 flex items-center gap-3 min-w-[300px]">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="ri-check-line text-green-600 text-xl"></i>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Success!</p>
              <p className="text-xs text-gray-600">{successMessage}</p>
            </div>
            <button
              onClick={() => setShowSuccessToast(false)}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="ri-close-line text-lg"></i>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">School Details</h1>
            <p className="text-sm text-gray-600 mt-1">View and manage school information</p>
          </div>
          <Button
            onClick={() => navigate('/super-admin/schools')}
            variant="outline"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Back to Schools
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - School Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* School Information Card */}
            <Card>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="ri-school-line text-3xl text-white"></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{school.name}</h2>
                    <p className="text-gray-600 flex items-center gap-2 mb-2">
                      <i className="ri-map-pin-line"></i>
                      {school.city}, {school.state}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(school.status)}`}>
                        {school.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPlanColor(school.plan)}`}>
                        {school.plan} Plan
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{school.students}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Join Date</p>
                  <p className="text-lg font-semibold text-gray-900">{school.joinDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Last Active</p>
                  <p className="text-lg font-semibold text-gray-900">{school.lastActive}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">School ID</p>
                  <p className="text-lg font-semibold text-gray-900 font-mono">{school.id}</p>
                </div>
              </div>
            </Card>

            {/* Admin Contact Information */}
            <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <i className="ri-user-star-line mr-2 text-blue-600"></i>
                Admin Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <i className="ri-user-line text-gray-600"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Admin Name</p>
                    <p className="font-semibold text-gray-900">{school.adminName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <i className="ri-mail-line text-gray-600"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-semibold text-gray-900">{school.adminEmail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <i className="ri-phone-line text-gray-600"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-semibold text-gray-900">{school.adminPhone}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Audit Logs */}
            <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <i className="ri-history-line mr-2 text-blue-600"></i>
                Activity Log
              </h3>
              <div className="space-y-4">
                {auditLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className={`w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0 ${log.color}`}>
                      <i className={`${log.icon} text-lg`}></i>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">{log.action}</p>
                      <p className="text-xs text-gray-500 mt-1">by {log.user}</p>
                      <p className="text-xs text-gray-400 mt-1">{log.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {school.status === 'Pending' && (
                  <Button
                    onClick={() => setShowApproveModal(true)}
                    variant="primary"
                    className="w-full"
                  >
                    <i className="ri-check-line mr-2"></i>
                    Approve School
                  </Button>
                )}
                
                {school.status === 'Active' && (
                  <Button
                    onClick={() => setShowSuspendModal(true)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    <i className="ri-forbid-line mr-2"></i>
                    Suspend School
                  </Button>
                )}

                {school.status === 'Suspended' && (
                  <Button
                    onClick={() => setShowApproveModal(true)}
                    variant="primary"
                    className="w-full"
                  >
                    <i className="ri-restart-line mr-2"></i>
                    Reactivate School
                  </Button>
                )}

                <Button
                  onClick={() => {
                    setSelectedPlan(school.plan);
                    setShowEditPlanModal(true);
                  }}
                  variant="secondary"
                  className="w-full"
                >
                  <i className="ri-edit-line mr-2"></i>
                  Edit Plan
                </Button>
              </div>
            </Card>

            {/* Current Plan Details */}
            <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <i className="ri-vip-crown-line mr-2 text-purple-600"></i>
                Current Plan
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                  <p className="text-2xl font-bold text-purple-700 mb-1">{school.plan}</p>
                  <p className="text-sm text-purple-600">Active Subscription</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Max Students</span>
                    <span className="font-semibold text-gray-900">
                      {school.plan === 'Premium' ? 'Unlimited' : school.plan === 'Standard' ? '500' : '100'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Max Teachers</span>
                    <span className="font-semibold text-gray-900">
                      {school.plan === 'Premium' ? 'Unlimited' : school.plan === 'Standard' ? '50' : '10'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Support</span>
                    <span className="font-semibold text-gray-900">
                      {school.plan === 'Premium' ? 'Priority' : school.plan === 'Standard' ? 'Standard' : 'Email Only'}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Statistics */}
            <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Statistics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <i className="ri-user-line text-blue-600"></i>
                    <span className="text-sm text-gray-700">Active Teachers</span>
                  </div>
                  <span className="font-bold text-blue-700">24</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <i className="ri-group-line text-green-600"></i>
                    <span className="text-sm text-gray-700">Active Students</span>
                  </div>
                  <span className="font-bold text-green-700">{school.students}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <i className="ri-parent-line text-purple-600"></i>
                    <span className="text-sm text-gray-700">Active Parents</span>
                  </div>
                  <span className="font-bold text-purple-700">{Math.floor(school.students * 1.8)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Approve Modal */}
      <Modal
        isOpen={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        title={school.status === 'Suspended' ? 'Reactivate School' : 'Approve School'}
      >
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <i className="ri-information-line text-green-600 text-xl mt-0.5"></i>
            <div>
              <p className="text-sm font-medium text-green-900 mb-1">Confirmation Required</p>
              <p className="text-sm text-green-700">
                {school.status === 'Suspended' 
                  ? 'This will reactivate the school and restore full access to all features.'
                  : 'This will activate the school and grant full access to the platform.'}
              </p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">School Details:</p>
            <p className="font-semibold text-gray-900">{school.name}</p>
            <p className="text-sm text-gray-600">{school.city}, {school.state}</p>
            <p className="text-sm text-gray-600 mt-2">Admin: {school.adminName}</p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setShowApproveModal(false)}
              variant="secondary"
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleApprove}
              variant="primary"
              className="flex-1"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center whitespace-nowrap">
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  Processing...
                </span>
              ) : (
                <>
                  <i className="ri-check-line mr-2"></i>
                  {school.status === 'Suspended' ? 'Reactivate' : 'Approve'}
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Suspend Modal */}
      <Modal
        isOpen={showSuspendModal}
        onClose={() => setShowSuspendModal(false)}
        title="Suspend School"
      >
        <div className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <i className="ri-alert-line text-red-600 text-xl mt-0.5"></i>
            <div>
              <p className="text-sm font-medium text-red-900 mb-1">Warning: Critical Action</p>
              <p className="text-sm text-red-700">
                Suspending this school will immediately revoke access for all users including teachers, students, and parents.
              </p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">School to be suspended:</p>
            <p className="font-semibold text-gray-900">{school.name}</p>
            <p className="text-sm text-gray-600">{school.city}, {school.state}</p>
            <p className="text-sm text-gray-600 mt-2">{school.students} students will be affected</p>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs text-amber-800">
              <i className="ri-information-line mr-1"></i>
              This action can be reversed by reactivating the school later.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setShowSuspendModal(false)}
              variant="secondary"
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSuspend}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center whitespace-nowrap">
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  Processing...
                </span>
              ) : (
                <>
                  <i className="ri-forbid-line mr-2"></i>
                  Suspend School
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Plan Modal */}
      <Modal
        isOpen={showEditPlanModal}
        onClose={() => setShowEditPlanModal(false)}
        title="Edit Subscription Plan"
      >
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <i className="ri-information-line mr-1"></i>
              Select a new subscription plan for this school
            </p>
          </div>

          <div className="space-y-3">
            <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="plan"
                value="Trial"
                checked={selectedPlan === 'Trial'}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-4 h-4 text-blue-600 cursor-pointer"
              />
              <div className="ml-3 flex-1">
                <p className="font-semibold text-gray-900">Trial Plan</p>
                <p className="text-sm text-gray-600">14 days • Up to 100 students • Email support</p>
              </div>
              <span className="text-lg font-bold text-gray-900">Free</span>
            </label>

            <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="plan"
                value="Standard"
                checked={selectedPlan === 'Standard'}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-4 h-4 text-blue-600 cursor-pointer"
              />
              <div className="ml-3 flex-1">
                <p className="font-semibold text-gray-900">Standard Plan</p>
                <p className="text-sm text-gray-600">Up to 500 students • Standard support</p>
              </div>
              <span className="text-lg font-bold text-gray-900">$99/mo</span>
            </label>

            <label className="flex items-center p-4 border-2 border-purple-300 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors">
              <input
                type="radio"
                name="plan"
                value="Premium"
                checked={selectedPlan === 'Premium'}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-4 h-4 text-purple-600 cursor-pointer"
              />
              <div className="ml-3 flex-1">
                <p className="font-semibold text-gray-900">Premium Plan</p>
                <p className="text-sm text-gray-600">Unlimited students • Priority support</p>
              </div>
              <span className="text-lg font-bold text-purple-700">$199/mo</span>
            </label>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setShowEditPlanModal(false)}
              variant="secondary"
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditPlan}
              variant="primary"
              className="flex-1"
              disabled={loading || selectedPlan === school.plan}
            >
              {loading ? (
                <span className="flex items-center justify-center whitespace-nowrap">
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  Updating...
                </span>
              ) : (
                <>
                  <i className="ri-save-line mr-2"></i>
                  Update Plan
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </SuperAdminLayout>
  );
}
