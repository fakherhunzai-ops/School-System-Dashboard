
import { useState } from 'react';
import TopBar from '../../components/feature/TopBar';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';

const CommunicationPage = () => {
  const [selectedType, setSelectedType] = useState<'sms' | 'email' | 'whatsapp' | 'notification'>('sms');
  const [recipients, setRecipients] = useState<'all' | 'class' | 'individual'>('all');

  const communicationTypes = [
    { id: 'sms', label: 'SMS', icon: 'ri-message-line', color: 'bg-blue-100 text-blue-600' },
    { id: 'email', label: 'Email', icon: 'ri-mail-line', color: 'bg-green-100 text-green-600' },
    { id: 'whatsapp', label: 'WhatsApp', icon: 'ri-whatsapp-line', color: 'bg-emerald-100 text-emerald-600' },
    { id: 'notification', label: 'App Notification', icon: 'ri-notification-line', color: 'bg-purple-100 text-purple-600' }
  ];

  const recentCommunications = [
    {
      id: '1',
      type: 'sms',
      subject: 'Parent-Teacher Meeting Reminder',
      recipients: 'All Parents (Class 10A)',
      sentDate: '2024-01-15 10:30 AM',
      status: 'delivered',
      deliveryRate: '98%'
    },
    {
      id: '2',
      type: 'email',
      subject: 'Monthly Progress Report',
      recipients: 'All Parents (Class 10A)',
      sentDate: '2024-01-14 09:00 AM',
      status: 'delivered',
      deliveryRate: '95%'
    },
    {
      id: '3',
      type: 'whatsapp',
      subject: 'Homework Reminder',
      recipients: 'Selected Parents (15)',
      sentDate: '2024-01-13 04:00 PM',
      status: 'delivered',
      deliveryRate: '100%'
    },
    {
      id: '4',
      type: 'notification',
      subject: 'Attendance Alert',
      recipients: 'Selected Parents (5)',
      sentDate: '2024-01-12 11:00 AM',
      status: 'delivered',
      deliveryRate: '100%'
    }
  ];

  const templates = [
    { id: '1', name: 'Attendance Alert', category: 'Attendance' },
    { id: '2', name: 'Meeting Reminder', category: 'Meetings' },
    { id: '3', name: 'Homework Reminder', category: 'Academic' },
    { id: '4', name: 'Fee Payment Reminder', category: 'Finance' },
    { id: '5', name: 'Event Notification', category: 'Events' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar 
        title="Communication"
        actions={
          <Button variant="primary" className="whitespace-nowrap text-sm">
            <i className="ri-send-plane-line sm:mr-2"></i>
            <span className="hidden sm:inline">Send Message</span>
            <span className="sm:hidden">Send</span>
          </Button>
        }
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Communication Type Selection */}
            <Card className="p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Communication Type</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {communicationTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id as any)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedType === type.id
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg ${type.color} flex items-center justify-center mx-auto mb-2`}>
                      <i className={`${type.icon} text-xl`}></i>
                    </div>
                    <p className="text-sm font-medium text-gray-900 text-center">{type.label}</p>
                  </button>
                ))}
              </div>
            </Card>

            {/* Compose Message */}
            <Card className="p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Compose Message</h3>
              
              {/* Recipients Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Send To</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setRecipients('all')}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      recipients === 'all'
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <i className="ri-group-line mr-2"></i>
                    All Parents
                  </button>
                  <button
                    onClick={() => setRecipients('class')}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      recipients === 'class'
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <i className="ri-team-line mr-2"></i>
                    Specific Class
                  </button>
                  <button
                    onClick={() => setRecipients('individual')}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      recipients === 'individual'
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <i className="ri-user-line mr-2"></i>
                    Individual
                  </button>
                </div>
              </div>

              {recipients === 'class' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    <option>Class 10A</option>
                    <option>Class 10B</option>
                    <option>Class 9A</option>
                    <option>Class 9B</option>
                  </select>
                </div>
              )}

              {recipients === 'individual' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Parents</label>
                  <Input placeholder="Search and select parents..." />
                </div>
              )}

              {/* Subject */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <Input placeholder="Enter message subject..." />
              </div>

              {/* Message */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="Type your message here..."
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">Character count: 0/500</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="primary" className="flex-1 sm:flex-initial whitespace-nowrap">
                  <i className="ri-send-plane-line mr-2"></i>
                  Send Now
                </Button>
                <Button variant="outline" className="flex-1 sm:flex-initial whitespace-nowrap">
                  <i className="ri-time-line mr-2"></i>
                  Schedule
                </Button>
                <Button variant="outline" className="flex-1 sm:flex-initial whitespace-nowrap">
                  <i className="ri-draft-line mr-2"></i>
                  Save Draft
                </Button>
              </div>
            </Card>

            {/* Recent Communications */}
            <Card className="p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Communications</h3>
              <div className="space-y-3">
                {recentCommunications.map(comm => (
                  <div key={comm.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className={`w-10 h-10 rounded-lg ${
                          communicationTypes.find(t => t.id === comm.type)?.color
                        } flex items-center justify-center flex-shrink-0`}>
                          <i className={communicationTypes.find(t => t.id === comm.type)?.icon}></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">{comm.subject}</h4>
                          <p className="text-xs text-gray-600 mt-1">{comm.recipients}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-gray-600">{comm.sentDate}</p>
                        <p className="text-xs font-medium text-green-600 mt-1">{comm.deliveryRate} delivered</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Messages Sent Today</span>
                  <span className="text-lg font-bold text-gray-900">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="text-lg font-bold text-gray-900">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg. Delivery Rate</span>
                  <span className="text-lg font-bold text-green-600">97%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pending Drafts</span>
                  <span className="text-lg font-bold text-orange-600">3</span>
                </div>
              </div>
            </Card>

            {/* Message Templates */}
            <Card className="p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Message Templates</h3>
              <div className="space-y-2">
                {templates.map(template => (
                  <button
                    key={template.id}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                  >
                    <p className="text-sm font-medium text-gray-900">{template.name}</p>
                    <p className="text-xs text-gray-600 mt-1">{template.category}</p>
                  </button>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 whitespace-nowrap text-sm">
                <i className="ri-add-line mr-2"></i>
                Create Template
              </Button>
            </Card>

            {/* Tips */}
            <Card className="p-4 sm:p-6 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <i className="ri-lightbulb-line text-blue-600 text-xl flex-shrink-0"></i>
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 mb-2">Communication Tips</h4>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• Keep messages clear and concise</li>
                    <li>• Use templates for common messages</li>
                    <li>• Schedule messages for optimal timing</li>
                    <li>• Always include action items</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationPage;
