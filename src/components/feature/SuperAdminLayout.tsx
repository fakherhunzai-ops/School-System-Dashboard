import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SuperAdminLayoutProps {
  children: React.ReactNode;
}

export default function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const menuItems = [
    { icon: 'ri-dashboard-line', label: 'Dashboard', path: '/super-admin-dashboard' },
    { icon: 'ri-school-line', label: 'Manage Schools', path: '/super-admin/schools' },
    { icon: 'ri-vip-crown-line', label: 'Subscriptions', path: '/super-admin/subscriptions' },
    { icon: 'ri-team-line', label: 'Platform Users', path: '/super-admin/users' },
    { icon: 'ri-settings-3-line', label: 'Global Settings', path: '/super-admin/settings' },
    { icon: 'ri-file-list-3-line', label: 'Audit Logs', path: '/super-admin/audit-logs' },
  ];

  const handleLogout = () => {
    navigate('/super-admin-login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-30 h-16">
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          {/* Left: Logo + Mobile Menu Toggle */}
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden mr-3 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              <i className={`${sidebarOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
            </button>
            
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mr-3">
                <i className="ri-shield-keyhole-line text-xl text-white"></i>
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-900">Super Admin Portal</h1>
                <p className="text-xs text-gray-500 hidden sm:block">AttendFlow Schools</p>
              </div>
            </div>
          </div>

          {/* Right: Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                <i className="ri-user-line text-white"></i>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900 whitespace-nowrap">Admin User</p>
                <p className="text-xs text-gray-500 whitespace-nowrap">Super Administrator</p>
              </div>
              <i className={`ri-arrow-down-s-line text-gray-600 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`}></i>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowProfileMenu(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 whitespace-nowrap">Admin User</p>
                    <p className="text-xs text-gray-500 whitespace-nowrap">admin@attendflow.com</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate('/super-admin/profile');
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-user-settings-line mr-3 text-gray-500"></i>
                    Profile Settings
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate('/super-admin/security');
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-shield-check-line mr-3 text-gray-500"></i>
                    Security
                  </button>
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-logout-box-line mr-3"></i>
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <i className={`${item.icon} text-lg mr-3 ${isActive ? 'text-blue-700' : 'text-gray-500'}`}></i>
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Sidebar - Mobile/Tablet Drawer */}
      {sidebarOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40 top-16"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <aside className="lg:hidden fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto z-50">
            <nav className="p-4 space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <i className={`${item.icon} text-lg mr-3 ${isActive ? 'text-blue-700' : 'text-gray-500'}`}></i>
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </aside>
        </>
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 min-h-screen">
        {children}
      </main>
    </div>
  );
}
