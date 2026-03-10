
import { useSidebar } from '../../contexts/SidebarContext';

interface TopBarProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function TopBar({ title, subtitle, actions }: TopBarProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
      <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          {/* Hamburger menu button for mobile */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer flex-shrink-0"
            aria-label="Toggle sidebar"
          >
            <i className="ri-menu-line text-xl text-gray-700"></i>
          </button>

          <div className="min-w-0 flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{title}</h2>
            {subtitle && <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 truncate">{subtitle}</p>}
          </div>
        </div>

        {actions && (
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
