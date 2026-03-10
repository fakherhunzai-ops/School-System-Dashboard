import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuperAdminLayout from '../../components/feature/SuperAdminLayout';
import { dashboardStats, recentActivities, planDistribution } from '../../mocks/superAdminDashboard';

export default function SuperAdminDashboard() {
  const navigate = useNavigate();
  const [loading] = useState(false);

  const statCards = [
    {
      title: 'Total Schools',
      value: dashboardStats.totalSchools,
      icon: 'ri-school-line',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      change: '+12.5%',
      changeType: 'increase'
    },
    {
      title: 'Active Schools',
      value: dashboardStats.activeSchools,
      icon: 'ri-checkbox-circle-line',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      change: '+8.3%',
      changeType: 'increase'
    },
    {
      title: 'Trial Schools',
      value: dashboardStats.trialSchools,
      icon: 'ri-time-line',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      change: '+15.2%',
      changeType: 'increase'
    },
    {
      title: 'Suspended Schools',
      value: dashboardStats.suspendedSchools,
      icon: 'ri-error-warning-line',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      change: '-2.1%',
      changeType: 'decrease'
    }
  ];

  if (loading) {
    return (
      <SuperAdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </SuperAdminLayout>
    );
  }

  return (
    <SuperAdminLayout>
      <div className="p-4 lg:p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your platform.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <i className={`${stat.icon} text-xl ${stat.textColor}`}></i>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stat.changeType === 'increase'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Recent Activities</h2>
              <button
                onClick={() => navigate('/super-admin/audit-logs')}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer whitespace-nowrap"
              >
                View All
              </button>
            </div>

            {recentActivities.length === 0 ? (
              <div className="text-center py-12">
                <i className="ri-file-list-line text-5xl text-gray-300 mb-4"></i>
                <p className="text-gray-500">No recent activities</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-100`}>
                      <i className={`${activity.icon} text-lg ${activity.color}`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.schoolName}</p>
                      <p className="text-sm text-gray-600 mt-0.5">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Plan Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Plan Distribution</h2>
            <div className="space-y-4">
              {planDistribution.map((plan, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{plan.plan}</span>
                    <span className="text-sm font-bold text-gray-900">{plan.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${plan.color} h-2 rounded-full transition-all`}
                      style={{ width: `${plan.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{plan.percentage}% of total</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/super-admin/schools')}
              className="flex items-center justify-center px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-school-line mr-2"></i>
              <span className="font-medium">Manage Schools</span>
            </button>
            <button
              onClick={() => navigate('/super-admin/schools?filter=pending')}
              className="flex items-center justify-center px-4 py-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-file-list-line mr-2"></i>
              <span className="font-medium">Pending Approvals ({dashboardStats.pendingApproval})</span>
            </button>
            <button
              onClick={() => navigate('/super-admin/subscriptions')}
              className="flex items-center justify-center px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-vip-crown-line mr-2"></i>
              <span className="font-medium">Subscriptions</span>
            </button>
            <button
              onClick={() => navigate('/super-admin/settings')}
              className="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-settings-3-line mr-2"></i>
              <span className="font-medium">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
