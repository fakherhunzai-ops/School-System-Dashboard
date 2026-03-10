
import { useState } from 'react';
import TopBar from '../../components/feature/TopBar';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState<'profile' | 'notifications' | 'attendance' | 'security'>('profile');

  const sections = [
    { id: 'profile', label: 'Profile', icon: 'ri-user-line' },
    { id: 'notifications', label: 'Notifications', icon: 'ri-notification-line' },
    { id: 'attendance', label: 'Attendance Rules', icon: 'ri-calendar-check-line' },
    { id: 'security', label: 'Security', icon: 'ri-shield-line' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar 
        title="Settings"
        actions={
          <Button variant="primary" className="whitespace-nowrap text-sm">
            <i className="ri-save-line sm:mr-2"></i>
            <span className="hidden sm:inline">Save Changes</span>
            <span className="sm:hidden">Save</span>
          </Button>
        }
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation - Horizontal on mobile, vertical on desktop */}
          <div className="lg:col-span-1">
            {/* Mobile: Horizontal scrollable tabs */}
            <div className="lg:hidden overflow-x-auto mb-6">
              <div className="flex gap-2 min-w-max pb-2">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id as any)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      activeSection === section.id
                        ? 'bg-teal-50 text-teal-700 border-2 border-teal-500'
                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <i className={section.icon}></i>
                    {section.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop: Vertical sidebar */}
            <Card className="p-2 hidden lg:block">
              <nav className="space-y-1">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === section.id
                        ? 'bg-teal-50 text-teal-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <i className={section.icon}></i>
                    {section.label}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeSection === 'profile' && (
              <Card className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h3>
                
                {/* Profile Photo */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Profile Photo</label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Indian%20female%20teacher%20professional%20portrait%20with%20friendly%20smile%20wearing%20formal%20attire%20simple%20light%20background&width=100&height=100&seq=teacher1&orientation=squarish"
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" className="whitespace-nowrap text-sm">
                        <i className="ri-upload-line mr-2"></i>
                        Upload New
                      </Button>
                      <Button variant="outline" className="whitespace-nowrap text-sm">
                        <i className="ri-delete-bin-line mr-2"></i>
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <Input defaultValue="Priya" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <Input defaultValue="Gupta" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <Input type="email" defaultValue="priya.gupta@school.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <Input defaultValue="+91 98765 43210" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                    <Input defaultValue="TCH2023001" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option>Mathematics</option>
                      <option>Science</option>
                      <option>English</option>
                      <option>Hindi</option>
                    </select>
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    defaultValue="Experienced mathematics teacher with 10+ years of teaching experience."
                  ></textarea>
                </div>
              </Card>
            )}

            {activeSection === 'notifications' && (
              <Card className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h3>
                
                <div className="space-y-6">
                  {/* Email Notifications */}
                  <div>
                    <h4 className="text-base font-medium text-gray-900 mb-4">Email Notifications</h4>
                    <div className="space-y-3">
                      {[
                        { label: 'Student attendance alerts', description: 'Get notified when students are absent' },
                        { label: 'Parent messages', description: 'Receive emails when parents send messages' },
                        { label: 'Assignment submissions', description: 'Get notified about new submissions' },
                        { label: 'Weekly reports', description: 'Receive weekly summary reports' }
                      ].map((item, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{item.label}</p>
                            <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Push Notifications */}
                  <div>
                    <h4 className="text-base font-medium text-gray-900 mb-4">Push Notifications</h4>
                    <div className="space-y-3">
                      {[
                        { label: 'Urgent alerts', description: 'Critical notifications about students' },
                        { label: 'Meeting reminders', description: 'Reminders for scheduled meetings' },
                        { label: 'System updates', description: 'Updates about system changes' }
                      ].map((item, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{item.label}</p>
                            <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {activeSection === 'attendance' && (
              <Card className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Attendance Rules</h3>
                
                <div className="space-y-6">
                  {/* Thresholds */}
                  <div>
                    <h4 className="text-base font-medium text-gray-900 mb-4">Alert Thresholds</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Low Attendance Warning (%)</label>
                        <Input type="number" defaultValue="75" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Critical Attendance Alert (%)</label>
                        <Input type="number" defaultValue="65" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Consecutive Absences Alert</label>
                        <Input type="number" defaultValue="3" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Late Arrival Grace Period (min)</label>
                        <Input type="number" defaultValue="10" />
                      </div>
                    </div>
                  </div>

                  {/* Auto Actions */}
                  <div>
                    <h4 className="text-base font-medium text-gray-900 mb-4">Automatic Actions</h4>
                    <div className="space-y-3">
                      {[
                        { label: 'Auto-notify parents on absence', description: 'Send SMS/email to parents automatically' },
                        { label: 'Flag students with low attendance', description: 'Automatically add to flagged students list' },
                        { label: 'Generate weekly attendance reports', description: 'Create and send reports every Monday' }
                      ].map((item, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{item.label}</p>
                            <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {activeSection === 'security' && (
              <Card className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h3>
                
                <div className="space-y-6">
                  {/* Change Password */}
                  <div>
                    <h4 className="text-base font-medium text-gray-900 mb-4">Change Password</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <Input type="password" placeholder="Enter current password" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <Input type="password" placeholder="Enter new password" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <Input type="password" placeholder="Confirm new password" />
                      </div>
                      <Button variant="primary" className="whitespace-nowrap">
                        Update Password
                      </Button>
                    </div>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="pt-6 border-t border-gray-200">
                    <h4 className="text-base font-medium text-gray-900 mb-4">Two-Factor Authentication</h4>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Enable 2FA</p>
                        <p className="text-xs text-gray-600 mt-1">Add an extra layer of security to your account</p>
                      </div>
                      <Button variant="outline" className="whitespace-nowrap text-sm">
                        Enable 2FA
                      </Button>
                    </div>
                  </div>

                  {/* Active Sessions */}
                  <div className="pt-6 border-t border-gray-200">
                    <h4 className="text-base font-medium text-gray-900 mb-4">Active Sessions</h4>
                    <div className="space-y-3">
                      {[
                        { device: 'Chrome on Windows', location: 'Bangalore, India', time: 'Active now' },
                        { device: 'Safari on iPhone', location: 'Bangalore, India', time: '2 hours ago' }
                      ].map((session, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-start gap-3 flex-1">
                            <i className="ri-computer-line text-xl text-gray-400 mt-0.5"></i>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">{session.device}</p>
                              <p className="text-xs text-gray-600 mt-1">{session.location} • {session.time}</p>
                            </div>
                          </div>
                          <Button variant="outline" className="whitespace-nowrap text-sm">
                            Revoke
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
