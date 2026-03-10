export const dashboardStats = {
  totalSchools: 248,
  activeSchools: 186,
  trialSchools: 42,
  suspendedSchools: 8,
  pendingApproval: 12,
  totalStudents: 45680,
  totalRevenue: 124500,
  monthlyGrowth: 12.5
};

export const recentActivities = [
  {
    id: 1,
    type: 'school_approved',
    schoolName: 'Greenwood International School',
    action: 'School approved and activated',
    timestamp: '2 hours ago',
    icon: 'ri-checkbox-circle-line',
    color: 'text-green-600'
  },
  {
    id: 2,
    type: 'subscription_upgraded',
    schoolName: 'St. Mary\'s High School',
    action: 'Upgraded to Premium plan',
    timestamp: '5 hours ago',
    icon: 'ri-vip-crown-line',
    color: 'text-blue-600'
  },
  {
    id: 3,
    type: 'school_suspended',
    schoolName: 'Riverside Academy',
    action: 'School suspended due to payment failure',
    timestamp: '1 day ago',
    icon: 'ri-error-warning-line',
    color: 'text-red-600'
  },
  {
    id: 4,
    type: 'new_registration',
    schoolName: 'Oakwood Public School',
    action: 'New school registration pending approval',
    timestamp: '1 day ago',
    icon: 'ri-file-list-line',
    color: 'text-orange-600'
  },
  {
    id: 5,
    type: 'trial_expired',
    schoolName: 'Sunshine Elementary',
    action: 'Trial period expired',
    timestamp: '2 days ago',
    icon: 'ri-time-line',
    color: 'text-gray-600'
  }
];

export const planDistribution = [
  { plan: 'Free Trial', count: 42, percentage: 16.9, color: 'bg-gray-500' },
  { plan: 'Basic', count: 98, percentage: 39.5, color: 'bg-blue-500' },
  { plan: 'Premium', count: 76, percentage: 30.6, color: 'bg-purple-500' },
  { plan: 'Enterprise', count: 32, percentage: 12.9, color: 'bg-indigo-600' }
];

export const monthlyRevenue = [
  { month: 'Jan', revenue: 98000 },
  { month: 'Feb', revenue: 105000 },
  { month: 'Mar', revenue: 112000 },
  { month: 'Apr', revenue: 118000 },
  { month: 'May', revenue: 121000 },
  { month: 'Jun', revenue: 124500 }
];
