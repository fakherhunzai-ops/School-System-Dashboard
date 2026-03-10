import { useState } from 'react';
import ParentSidebar from '../../components/feature/ParentSidebar';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import {
  notificationCategories,
  deliveryMethods,
  quietHours as initialQuietHours,
  notificationHistory,
} from '../../mocks/notifications';
import ResponsiveLayout from '../../components/feature/ResponsiveLayout';
import TopBar from '../../components/feature/TopBar';
import { Badge } from '../../components/base/Badge';

const notificationsData = {
  preferences: {
    email: true,
    sms: true,
    push: true,
    whatsapp: false,
    attendance: true,
    grades: true,
    homework: true,
    meetings: true,
    announcements: true,
  },
  history: [
    {
      id: '1',
      type: 'attendance',
      title: 'Attendance Alert',
      message: 'Your child was marked absent today',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      type: 'grade',
      title: 'New Grade Posted',
      message: 'Mathematics test grade has been updated',
      timestamp: '5 hours ago',
    },
    {
      id: '3',
      type: 'homework',
      title: 'Homework Due Soon',
      message: 'Science project due in 2 days',
      timestamp: '1 day ago',
    },
    {
      id: '4',
      type: 'meeting',
      title: 'Meeting Scheduled',
      message: 'Parent-teacher meeting on Friday at 3 PM',
      timestamp: '2 days ago',
    },
    {
      id: '5',
      type: 'announcement',
      title: 'School Announcement',
      message: 'School will be closed next Monday for maintenance',
      timestamp: '3 days ago',
    },
  ],
};

interface NotificationPreference {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

interface NotificationCategory {
  id: string;
  title: string;
  description: string;
  preferences: NotificationPreference[];
}

export default function ParentNotifications() {
  const [preferences, setPreferences] = useState(notificationsData.preferences);

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ParentSidebar />
      <ResponsiveLayout>
        <TopBar title="Notifications" />
        
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Notification Preferences */}
          <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 mb-6 sm:mb-8">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
              Notification Preferences
            </h2>

            {/* Delivery Methods - Wrap on mobile */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-sm font-medium text-gray-700 mb-3 sm:mb-4">
                Delivery Methods
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { key: 'email', icon: 'ri-mail-line', label: 'Email' },
                  { key: 'sms', icon: 'ri-message-line', label: 'SMS' },
                  { key: 'push', icon: 'ri-notification-line', label: 'Push' },
                  { key: 'whatsapp', icon: 'ri-whatsapp-line', label: 'WhatsApp' },
                ].map((method) => (
                  <button
                    key={method.key}
                    onClick={() => togglePreference(method.key as keyof typeof preferences)}
                    className={`p-3 sm:p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      preferences[method.key as keyof typeof preferences]
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        preferences[method.key as keyof typeof preferences]
                          ? 'bg-blue-600'
                          : 'bg-gray-100'
                      }`}>
                        <i className={`${method.icon} text-lg ${
                          preferences[method.key as keyof typeof preferences]
                            ? 'text-white'
                            : 'text-gray-600'
                        }`}></i>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{method.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Notification Types - Stack on mobile */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3 sm:mb-4">
                Notification Types
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { key: 'attendance', label: 'Attendance Updates', desc: 'Daily attendance reports' },
                  { key: 'grades', label: 'Grade Updates', desc: 'New grades and assessments' },
                  { key: 'homework', label: 'Homework Reminders', desc: 'Assignment due dates' },
                  { key: 'meetings', label: 'Meeting Reminders', desc: 'Upcoming parent-teacher meetings' },
                  { key: 'announcements', label: 'School Announcements', desc: 'Important school updates' },
                ].map((type) => (
                  <div
                    key={type.key}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">{type.label}</h4>
                      <p className="text-xs sm:text-sm text-gray-500">{type.desc}</p>
                    </div>
                    <button
                      onClick={() => togglePreference(type.key as keyof typeof preferences)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 cursor-pointer ${
                        preferences[type.key as keyof typeof preferences]
                          ? 'bg-blue-600'
                          : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences[type.key as keyof typeof preferences]
                            ? 'translate-x-6'
                            : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
                Save Preferences
              </button>
              <button className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer">
                Reset to Default
              </button>
            </div>
          </div>

          {/* Notification History */}
          <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
              Recent Notifications
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {notificationsData.history.map((notification) => (
                <div
                  key={notification.id}
                  className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    notification.type === 'attendance'
                      ? 'bg-green-100 text-green-600'
                      : notification.type === 'grade'
                      ? 'bg-blue-100 text-blue-600'
                      : notification.type === 'homework'
                      ? 'bg-purple-100 text-purple-600'
                      : notification.type === 'meeting'
                      ? 'bg-orange-100 text-orange-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <i className={`${
                      notification.type === 'attendance'
                        ? 'ri-calendar-check-line'
                        : notification.type === 'grade'
                        ? 'ri-file-chart-line'
                        : notification.type === 'homework'
                        ? 'ri-book-open-line'
                        : notification.type === 'meeting'
                        ? 'ri-calendar-event-line'
                        : 'ri-notification-line'
                    } text-base sm:text-lg`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2 mb-1">
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900 break-words">
                        {notification.title}
                      </h4>
                      <span className="text-xs text-gray-500 flex-shrink-0">
                        {notification.timestamp}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 break-words">
                      {notification.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ResponsiveLayout>
    </div>
  );
}
