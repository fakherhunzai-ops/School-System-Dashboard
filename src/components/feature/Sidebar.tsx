
import { Link, useLocation } from 'react-router-dom';
import { useSidebar } from '../../contexts/SidebarContext';
import { useEffect } from 'react';

interface MenuItem {
  path: string;
  label: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: 'ri-dashboard-line' },
  { path: '/class-schedule', label: 'Class Schedule', icon: 'ri-calendar-schedule-line' },
  { path: '/attendance', label: 'Mark Attendance', icon: 'ri-checkbox-circle-line' },
  { path: '/flagged-students', label: 'Flagged Students', icon: 'ri-alert-line' },
  { path: '/follow-ups', label: 'Follow-up Tasks', icon: 'ri-task-line' },
  { path: '/reports', label: 'Reports', icon: 'ri-bar-chart-line' },
  { path: '/settings', label: 'Settings', icon: 'ri-settings-3-line' },
];

const bottomItems: MenuItem[] = [
  { path: '/parent-portal', label: 'Parent Portal', icon: 'ri-parent-line' },
];

export default function Sidebar(): JSX.Element {
  const location = useLocation();
  const { isOpen, closeSidebar } = useSidebar();

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Guard against unexpected location objects
  if (!location || typeof location.pathname !== 'string') {
    console.error('Invalid location object:', location);
    return <aside className="w-64 bg-white border-r border-gray-200 h-screen" />;
  }

  return (
    <>
      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-blue-600">AttendFlow Schools</h1>
              <p className="text-xs text-gray-500 mt-1">Attendance Management</p>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={closeSidebar}
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close sidebar"
            >
              <i className="ri-close-line text-xl text-gray-600"></i>
            </button>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2.5 mb-1 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <i className={`${item.icon} text-lg mr-3`}></i>
                {item.label}
              </Link>
            );
          })}

          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Portals
            </p>
            {bottomItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2.5 mb-1 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <i className={`${item.icon} text-lg mr-3`}></i>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="px-3 py-4 border-t border-gray-200">
          <div className="flex items-center px-3 py-2">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <i className="ri-user-line text-blue-600"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Sarah Johnson</p>
              <p className="text-xs text-gray-500 truncate">Teacher</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
