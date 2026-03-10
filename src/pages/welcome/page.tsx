import { useNavigate } from 'react-router-dom';
import Button from '../../components/base/Button';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col">
      {/* Header */}
      <header className="px-4 sm:px-6 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
              <i className="ri-school-line text-lg sm:text-xl text-white"></i>
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-gray-900">AttendFlow Schools</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Attendance Management System</p>
            </div>
          </div>
          
          {/* Super Admin CTA */}
          <button
            onClick={() => navigate('/super-admin-login')}
            className="flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-shield-keyhole-line mr-1.5 sm:mr-2 text-sm sm:text-base"></i>
            <span>Super Admin</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <i className="ri-shield-check-line mr-1 sm:mr-2"></i>
              Trusted by 500+ Schools
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Simplify School Attendance & Parent Communication
            </h2>
            
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              Track student attendance, identify at-risk students, and communicate with parents seamlessly. Built for teachers, coordinators, and school administrators.
            </p>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10">
              <div className="flex items-start">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                  <i className="ri-checkbox-circle-line text-green-600 text-base sm:text-lg"></i>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">Quick Attendance</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Mark attendance in seconds with bulk actions</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                  <i className="ri-alert-line text-blue-600 text-base sm:text-lg"></i>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">Auto Alerts</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Detect at-risk students automatically</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                  <i className="ri-message-3-line text-purple-600 text-base sm:text-lg"></i>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">Parent Connect</h3>
                  <p className="text-xs sm:text-sm text-gray-600">SMS, WhatsApp, email in one place</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                  <i className="ri-bar-chart-line text-orange-600 text-base sm:text-lg"></i>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">Smart Reports</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Track trends and export analytics</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/signup-select')}
                className="text-sm sm:text-base px-6 sm:px-8 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all w-full sm:w-auto"
              >
                <i className="ri-user-add-line mr-2"></i>
                Sign Up
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/login-select')}
                className="text-sm sm:text-base px-6 sm:px-8 border-2 border-gray-300 hover:border-gray-400 w-full sm:w-auto"
              >
                <i className="ri-login-box-line mr-2"></i>
                Login
              </Button>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">
              No credit card required • Free 14-day trial • Cancel anytime
            </p>
          </div>

          {/* Right Visual - Hidden on mobile and tablet */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Main Dashboard Preview Card */}
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <i className="ri-dashboard-line text-white"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Dashboard</h4>
                      <p className="text-xs text-gray-500">Today's Overview</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-green-600"></i>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-xs text-blue-600 font-medium mb-1">Present Today</p>
                    <p className="text-2xl font-bold text-blue-700">847</p>
                    <p className="text-xs text-blue-600 mt-1">↑ 12 from yesterday</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-xs text-red-600 font-medium mb-1">Absent</p>
                    <p className="text-2xl font-bold text-red-700">23</p>
                    <p className="text-xs text-red-600 mt-1">3 flagged</p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <i className="ri-user-line text-gray-600 text-sm"></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Class 10-A marked</p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <i className="ri-message-line text-gray-600 text-sm"></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Parent contacted</p>
                      <p className="text-xs text-gray-500">15 minutes ago</p>
                    </div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Floating Cards - Hidden on mobile */}
              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg border border-gray-200 p-4 w-48 z-20 hidden xl:block">
                <div className="flex items-center mb-2">
                  <i className="ri-parent-line text-green-600 mr-2"></i>
                  <span className="text-xs font-semibold text-gray-900">Parent Portal</span>
                </div>
                <p className="text-xs text-gray-600">Real-time updates for parents</p>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg border border-gray-200 p-4 w-48 z-20 hidden xl:block">
                <div className="flex items-center mb-2">
                  <i className="ri-shield-check-line text-blue-600 mr-2"></i>
                  <span className="text-xs font-semibold text-gray-900">Secure & Private</span>
                </div>
                <p className="text-xs text-gray-600">GDPR compliant data protection</p>
              </div>

              {/* Background Decoration */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl -z-10"></div>
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-green-200 rounded-full opacity-20 blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 sm:px-6 py-4 sm:py-6 border-t border-gray-200 bg-white/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-gray-600 gap-3 sm:gap-0">
          <p>© 2025 AttendFlow Schools. All rights reserved.</p>
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="#" className="hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
