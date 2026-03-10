import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/base/Input';
import Button from '../../components/base/Button';
import Modal from '../../components/base/Modal';

type SignupStep = 
  | 'basic-info'
  | 'verification'
  | 'link-child'
  | 'confirm-child'
  | 'relationship'
  | 'notifications'
  | 'success';

type SignupMethod = 'password' | 'otp';
type Relationship = 'mother' | 'father' | 'guardian';

interface ChildData {
  id: string;
  name: string;
  class: string;
  section: string;
  admissionNumber: string;
  schoolName: string;
}

interface NotificationPreferences {
  sms: boolean;
  whatsapp: boolean;
  email: boolean;
  app: boolean;
}

export default function SignupParent() {
  const navigate = useNavigate();
  
  // Step management
  const [currentStep, setCurrentStep] = useState<SignupStep>('basic-info');
  
  // Basic info
  const [signupMethod, setSignupMethod] = useState<SignupMethod>('password');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Verification
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'phone'>('email');
  
  // Child linking
  const [linkMethod, setLinkMethod] = useState<'student-id' | 'admission' | 'invite' | 'school-code'>('student-id');
  const [studentId, setStudentId] = useState('');
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [schoolCode, setSchoolCode] = useState('');
  const [childNotFound, setChildNotFound] = useState(false);
  const [multipleChildren, setMultipleChildren] = useState(false);
  const [childrenList, setChildrenList] = useState<ChildData[]>([]);
  
  // Confirmed child
  const [selectedChild, setSelectedChild] = useState<ChildData | null>(null);
  const [pendingApproval, setPendingApproval] = useState(false);
  
  // Relationship
  const [relationship, setRelationship] = useState<Relationship | ''>('');
  
  // Notifications
  const [notifications, setNotifications] = useState<NotificationPreferences>({
    sms: true,
    whatsapp: true,
    email: true,
    app: true,
  });
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showExitModal, setShowExitModal] = useState(false);

  const steps = [
    { key: 'basic-info', label: 'Account Info', icon: 'ri-user-line' },
    { key: 'verification', label: 'Verify', icon: 'ri-shield-check-line' },
    { key: 'link-child', label: 'Link Child', icon: 'ri-links-line' },
    { key: 'confirm-child', label: 'Confirm', icon: 'ri-checkbox-circle-line' },
    { key: 'relationship', label: 'Relationship', icon: 'ri-parent-line' },
    { key: 'notifications', label: 'Preferences', icon: 'ri-notification-line' },
  ];

  const currentStepIndex = steps.findIndex(s => s.key === currentStep);

  // Basic Info Submit
  const handleBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (signupMethod === 'password' && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (signupMethod === 'password' && password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCurrentStep('verification');
    }, 1000);
  };

  // OTP handlers
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleResendOTP = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtp(['', '', '', '', '', '']);
      alert('OTP resent successfully!');
    }, 1000);
  };

  // Verification Submit
  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const otpValue = otp.join('');
    
    setTimeout(() => {
      setLoading(false);
      if (otpValue === '123456') {
        setCurrentStep('link-child');
      } else {
        setError('Invalid OTP. Please try again.');
        setOtp(['', '', '', '', '', '']);
      }
    }, 1000);
  };

  // Link Child Submit
  const handleLinkChildSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setChildNotFound(false);
    setMultipleChildren(false);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      
      // Simulate different scenarios
      const scenarios = ['success', 'not-found', 'multiple'];
      const scenario = scenarios[0]; // Change to test different scenarios

      switch (scenario) {
        case 'success':
          setSelectedChild({
            id: 'STU001',
            name: 'Emma Johnson',
            class: '5',
            section: 'A',
            admissionNumber: 'ADM2024001',
            schoolName: 'Greenwood International School',
          });
          setCurrentStep('confirm-child');
          break;
        case 'not-found':
          setChildNotFound(true);
          setError('Student not found. Please check the details and try again.');
          break;
        case 'multiple':
          setMultipleChildren(true);
          setChildrenList([
            {
              id: 'STU001',
              name: 'Emma Johnson',
              class: '5',
              section: 'A',
              admissionNumber: 'ADM2024001',
              schoolName: 'Greenwood International School',
            },
            {
              id: 'STU002',
              name: 'Liam Johnson',
              class: '3',
              section: 'B',
              admissionNumber: 'ADM2024002',
              schoolName: 'Greenwood International School',
            },
          ]);
          break;
      }
    }, 1000);
  };

  // Select child from multiple
  const handleSelectChild = (child: ChildData) => {
    setSelectedChild(child);
    setMultipleChildren(false);
    setCurrentStep('confirm-child');
  };

  // Confirm Child
  const handleConfirmChild = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      
      // Simulate pending approval scenario
      const needsApproval = false; // Change to true to test
      
      if (needsApproval) {
        setPendingApproval(true);
      } else {
        setCurrentStep('relationship');
      }
    }, 1000);
  };

  // Relationship Submit
  const handleRelationshipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!relationship) {
      setError('Please select your relationship');
      return;
    }
    setError('');
    setCurrentStep('notifications');
  };

  // Notifications Submit
  const handleNotificationsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCurrentStep('success');
    }, 1000);
  };

  // Go to dashboard
  const handleGoToDashboard = () => {
    navigate('/parent-portal');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col">
      {/* Header */}
      <header className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setShowExitModal(true)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            <span className="text-sm font-medium whitespace-nowrap">Exit Signup</span>
          </button>
          
          {currentStep !== 'success' && (
            <div className="text-xs sm:text-sm text-gray-600">
              Step {currentStepIndex + 1} of {steps.length}
            </div>
          )}
        </div>
      </header>

      {/* Progress Bar */}
      {currentStep !== 'success' && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            {/* Mobile: Scrollable horizontal progress */}
            <div className="flex items-center justify-between mb-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              {steps.map((step, index) => (
                <div key={step.key} className="flex items-center flex-shrink-0">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
                        index < currentStepIndex
                          ? 'bg-green-600 text-white'
                          : index === currentStepIndex
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {index < currentStepIndex ? (
                        <i className="ri-check-line text-base sm:text-lg"></i>
                      ) : (
                        <i className={`${step.icon} text-base sm:text-lg`}></i>
                      )}
                    </div>
                    <span
                      className={`text-xs mt-1 sm:mt-2 text-center whitespace-nowrap hidden sm:block ${
                        index <= currentStepIndex ? 'text-gray-900 font-medium' : 'text-gray-500'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 w-8 sm:w-12 mx-1 sm:mx-2 transition-all ${
                        index < currentStepIndex ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto">
          {/* Step 1: Basic Info */}
          {currentStep === 'basic-info' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-xl mb-3 sm:mb-4">
                  <i className="ri-parent-line text-2xl sm:text-3xl text-blue-600"></i>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Create Parent Account</h1>
                <p className="text-sm sm:text-base text-gray-600">Let's get started with your basic information</p>
              </div>

              {/* Signup Method Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                <button
                  onClick={() => setSignupMethod('password')}
                  className={`flex-1 py-2 px-3 sm:px-4 rounded-md text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                    signupMethod === 'password'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Password
                </button>
                <button
                  onClick={() => setSignupMethod('otp')}
                  className={`flex-1 py-2 px-3 sm:px-4 rounded-md text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                    signupMethod === 'otp'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  OTP Only
                </button>
              </div>

              {error && (
                <div className="mb-5 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                  <i className="ri-error-warning-line text-red-600 text-lg sm:text-xl mr-2 sm:mr-3 mt-0.5"></i>
                  <p className="text-xs sm:text-sm text-red-800">{error}</p>
                </div>
              )}

              <form onSubmit={handleBasicInfoSubmit} className="space-y-4 sm:space-y-5">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />

                {signupMethod === 'password' && (
                  <>
                    <Input
                      label="Password"
                      type="password"
                      placeholder="At least 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                    <Input
                      label="Confirm Password"
                      type="password"
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </>
                )}

                <div className="pt-4">
                  <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
                    {loading ? (
                      <span className="flex items-center justify-center whitespace-nowrap">
                        <i className="ri-loader-4-line animate-spin mr-2"></i>
                        Creating Account...
                      </span>
                    ) : (
                      'Continue'
                    )}
                  </Button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            </div>
          )}

          {/* Step 2: Verification */}
          {currentStep === 'verification' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <i className="ri-mail-send-line text-xl sm:text-2xl text-green-600"></i>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Verify Your Account</h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  We've sent a 6-digit code to
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-2 mb-4">
                  <button
                    onClick={() => setVerificationMethod('email')}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                      verificationMethod === 'email'
                        ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                        : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:border-gray-300'
                    }`}
                  >
                    <i className="ri-mail-line mr-1"></i>
                    <span className="truncate">{email}</span>
                  </button>
                  <button
                    onClick={() => setVerificationMethod('phone')}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                      verificationMethod === 'phone'
                        ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                        : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:border-gray-300'
                    }`}
                  >
                    <i className="ri-phone-line mr-1"></i>
                    {phone}
                  </button>
                </div>
              </div>

              {error && (
                <div className="mb-5 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                  <i className="ri-error-warning-line text-red-600 text-lg sm:text-xl mr-2 sm:mr-3 mt-0.5"></i>
                  <p className="text-xs sm:text-sm text-red-800">{error}</p>
                </div>
              )}

              <form onSubmit={handleVerificationSubmit} className="space-y-6">
                <div className="flex justify-center gap-1.5 sm:gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    />
                  ))}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={loading || otp.some(d => !d)}
                >
                  {loading ? (
                    <span className="flex items-center justify-center whitespace-nowrap">
                      <i className="ri-loader-4-line animate-spin mr-2"></i>
                      Verifying...
                    </span>
                  ) : (
                    'Verify & Continue'
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">Didn't receive the code?</p>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer whitespace-nowrap"
                  >
                    Resend OTP
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3: Link Child */}
          {currentStep === 'link-child' && !multipleChildren && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-xl mb-3 sm:mb-4">
                  <i className="ri-links-line text-2xl sm:text-3xl text-blue-600"></i>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Link Your Child</h2>
                <p className="text-sm sm:text-base text-gray-600">Connect to your child's school account</p>
              </div>

              {/* Link Method Selector */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-6">
                <button
                  onClick={() => setLinkMethod('student-id')}
                  className={`p-3 sm:p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    linkMethod === 'student-id'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <i className="ri-id-card-line text-xl sm:text-2xl text-blue-600 mb-1 sm:mb-2"></i>
                  <p className="text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">Student ID</p>
                </button>
                <button
                  onClick={() => setLinkMethod('admission')}
                  className={`p-3 sm:p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    linkMethod === 'admission'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <i className="ri-file-list-line text-xl sm:text-2xl text-blue-600 mb-1 sm:mb-2"></i>
                  <p className="text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">Admission No.</p>
                </button>
                <button
                  onClick={() => setLinkMethod('invite')}
                  className={`p-3 sm:p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    linkMethod === 'invite'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <i className="ri-mail-line text-xl sm:text-2xl text-blue-600 mb-1 sm:mb-2"></i>
                  <p className="text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">Invite Code</p>
                </button>
                <button
                  onClick={() => setLinkMethod('school-code')}
                  className={`p-3 sm:p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    linkMethod === 'school-code'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <i className="ri-building-line text-xl sm:text-2xl text-blue-600 mb-1 sm:mb-2"></i>
                  <p className="text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">School Code</p>
                </button>
              </div>

              {error && (
                <div className="mb-5 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                  <i className="ri-error-warning-line text-red-600 text-lg sm:text-xl mr-2 sm:mr-3 mt-0.5"></i>
                  <p className="text-xs sm:text-sm text-red-800">{error}</p>
                </div>
              )}

              <form onSubmit={handleLinkChildSubmit} className="space-y-4 sm:space-y-5">
                {linkMethod === 'student-id' && (
                  <Input
                    label="Student ID"
                    type="text"
                    placeholder="Enter student ID"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    required
                  />
                )}

                {linkMethod === 'admission' && (
                  <Input
                    label="Admission Number"
                    type="text"
                    placeholder="Enter admission number"
                    value={admissionNumber}
                    onChange={(e) => setAdmissionNumber(e.target.value)}
                    required
                  />
                )}

                {linkMethod === 'invite' && (
                  <Input
                    label="Invite Code"
                    type="text"
                    placeholder="Enter invite code from school"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    required
                  />
                )}

                {linkMethod === 'school-code' && (
                  <Input
                    label="School Code"
                    type="text"
                    placeholder="Enter school code"
                    value={schoolCode}
                    onChange={(e) => setSchoolCode(e.target.value)}
                    required
                  />
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                  <div className="flex items-start">
                    <i className="ri-information-line text-blue-600 text-lg sm:text-xl mr-2 sm:mr-3 mt-0.5"></i>
                    <div className="text-xs sm:text-sm text-blue-800">
                      <p className="font-medium mb-1">Need help finding this information?</p>
                      <p>Contact your school office or check the welcome email from your school.</p>
                    </div>
                  </div>
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center justify-center whitespace-nowrap">
                      <i className="ri-loader-4-line animate-spin mr-2"></i>
                      Searching...
                    </span>
                  ) : (
                    'Find Child'
                  )}
                </Button>
              </form>
            </div>
          )}

          {/* Multiple Children Selection */}
          {multipleChildren && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-xl mb-3 sm:mb-4">
                  <i className="ri-group-line text-2xl sm:text-3xl text-green-600"></i>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Multiple Children Found</h2>
                <p className="text-sm sm:text-base text-gray-600">Select the child you want to link</p>
              </div>

              <div className="space-y-3">
                {childrenList.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => handleSelectChild(child)}
                    className="w-full p-4 sm:p-5 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1 min-w-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                          <i className="ri-user-line text-lg sm:text-xl text-blue-600"></i>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{child.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-600">
                            Class {child.class} - Section {child.section}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 truncate">{child.schoolName}</p>
                        </div>
                      </div>
                      <i className="ri-arrow-right-line text-lg sm:text-xl text-gray-400 ml-2 flex-shrink-0"></i>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setMultipleChildren(false);
                  setChildrenList([]);
                }}
                className="w-full mt-4 text-xs sm:text-sm text-gray-600 hover:text-gray-900 cursor-pointer whitespace-nowrap"
              >
                ← Back to search
              </button>
            </div>
          )}

          {/* Step 4: Confirm Child */}
          {currentStep === 'confirm-child' && selectedChild && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-xl mb-3 sm:mb-4">
                  <i className="ri-checkbox-circle-line text-2xl sm:text-3xl text-green-600"></i>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Confirm Child Details</h2>
                <p className="text-sm sm:text-base text-gray-600">Please verify this information is correct</p>
              </div>

              {pendingApproval && (
                <div className="mb-6 p-4 sm:p-5 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start">
                    <i className="ri-time-line text-amber-600 text-xl sm:text-2xl mr-2 sm:mr-3 mt-0.5"></i>
                    <div>
                      <h3 className="font-semibold text-amber-900 mb-1 text-sm sm:text-base">Pending School Approval</h3>
                      <p className="text-xs sm:text-sm text-amber-800">
                        Your request to link with this student has been sent to the school. You'll receive a notification once approved.
                      </p>
                      <Button
                        onClick={handleGoToDashboard}
                        variant="primary"
                        className="mt-4"
                      >
                        Go to Dashboard
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {!pendingApproval && (
                <>
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6">
                    <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-6">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mb-3 sm:mb-0 sm:mr-5">
                        <i className="ri-user-line text-2xl sm:text-3xl text-blue-600"></i>
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{selectedChild.name}</h3>
                        <p className="text-sm sm:text-base text-gray-600">Student ID: {selectedChild.id}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="bg-white rounded-lg p-3 sm:p-4">
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">Class</p>
                        <p className="text-base sm:text-lg font-semibold text-gray-900">{selectedChild.class}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 sm:p-4">
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">Section</p>
                        <p className="text-base sm:text-lg font-semibold text-gray-900">{selectedChild.section}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 sm:p-4 col-span-1 sm:col-span-2">
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">School</p>
                        <p className="text-base sm:text-lg font-semibold text-gray-900">{selectedChild.schoolName}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 sm:p-4 col-span-1 sm:col-span-2">
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">Admission Number</p>
                        <p className="text-base sm:text-lg font-semibold text-gray-900">{selectedChild.admissionNumber}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => {
                        setCurrentStep('link-child');
                        setSelectedChild(null);
                      }}
                      variant="secondary"
                      size="lg"
                      className="flex-1"
                    >
                      Wrong Child
                    </Button>
                    <Button
                      onClick={handleConfirmChild}
                      variant="primary"
                      size="lg"
                      className="flex-1"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center whitespace-nowrap">
                          <i className="ri-loader-4-line animate-spin mr-2"></i>
                          Confirming...
                        </span>
                      ) : (
                        'Confirm & Continue'
                      )}
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 5: Relationship */}
          {currentStep === 'relationship' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-xl mb-3 sm:mb-4">
                  <i className="ri-parent-line text-2xl sm:text-3xl text-blue-600"></i>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Your Relationship</h2>
                <p className="text-sm sm:text-base text-gray-600">How are you related to {selectedChild?.name}?</p>
              </div>

              {error && (
                <div className="mb-5 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                  <i className="ri-error-warning-line text-red-600 text-lg sm:text-xl mr-2 sm:mr-3 mt-0.5"></i>
                  <p className="text-xs sm:text-sm text-red-800">{error}</p>
                </div>
              )}

              <form onSubmit={handleRelationshipSubmit} className="space-y-3 sm:space-y-4">
                <button
                  type="button"
                  onClick={() => setRelationship('mother')}
                  className={`w-full p-4 sm:p-5 border-2 rounded-lg transition-all cursor-pointer ${
                    relationship === 'mother'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-100 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                      <i className="ri-women-line text-xl sm:text-2xl text-pink-600"></i>
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Mother</h3>
                      <p className="text-xs sm:text-sm text-gray-600">I am the mother</p>
                    </div>
                    {relationship === 'mother' && (
                      <i className="ri-checkbox-circle-fill text-xl sm:text-2xl text-blue-600 ml-auto"></i>
                    )}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRelationship('father')}
                  className={`w-full p-4 sm:p-5 border-2 rounded-lg transition-all cursor-pointer ${
                    relationship === 'father'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                      <i className="ri-men-line text-xl sm:text-2xl text-blue-600"></i>
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Father</h3>
                      <p className="text-xs sm:text-sm text-gray-600">I am the father</p>
                    </div>
                    {relationship === 'father' && (
                      <i className="ri-checkbox-circle-fill text-xl sm:text-2xl text-blue-600 ml-auto"></i>
                    )}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRelationship('guardian')}
                  className={`w-full p-4 sm:p-5 border-2 rounded-lg transition-all cursor-pointer ${
                    relationship === 'guardian'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                      <i className="ri-shield-user-line text-xl sm:text-2xl text-green-600"></i>
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Legal Guardian</h3>
                      <p className="text-xs sm:text-sm text-gray-600">I am the legal guardian</p>
                    </div>
                    {relationship === 'guardian' && (
                      <i className="ri-checkbox-circle-fill text-xl sm:text-2xl text-blue-600 ml-auto"></i>
                    )}
                  </div>
                </button>

                <div className="pt-4">
                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    Continue
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Step 6: Notifications */}
          {currentStep === 'notifications' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-xl mb-3 sm:mb-4">
                  <i className="ri-notification-line text-2xl sm:text-3xl text-blue-600"></i>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Notification Preferences</h2>
                <p className="text-sm sm:text-base text-gray-600">Choose how you want to receive updates</p>
              </div>

              <form onSubmit={handleNotificationsSubmit} className="space-y-3 sm:space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1 min-w-0 mr-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                        <i className="ri-message-line text-base sm:text-xl text-blue-600"></i>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">SMS Messages</h3>
                        <p className="text-xs sm:text-sm text-gray-600">Receive text messages</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={notifications.sms}
                        onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1 min-w-0 mr-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                        <i className="ri-whatsapp-line text-base sm:text-xl text-green-600"></i>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">WhatsApp</h3>
                        <p className="text-xs sm:text-sm text-gray-600">Get updates on WhatsApp</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={notifications.whatsapp}
                        onChange={(e) => setNotifications({ ...notifications, whatsapp: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1 min-w-0 mr-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                        <i className="ri-mail-line text-base sm:text-xl text-red-600"></i>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Email</h3>
                        <p className="text-xs sm:text-sm text-gray-600">Receive email notifications</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={notifications.email}
                        onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1 min-w-0 mr-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                        <i className="ri-notification-badge-line text-base sm:text-xl text-purple-600"></i>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Push Notifications</h3>
                        <p className="text-xs sm:text-sm text-gray-600">In-app notifications</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={notifications.app}
                        onChange={(e) => setNotifications({ ...notifications, app: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mt-6">
                  <div className="flex items-start">
                    <i className="ri-information-line text-blue-600 text-lg sm:text-xl mr-2 sm:mr-3 mt-0.5"></i>
                    <p className="text-xs sm:text-sm text-blue-800">
                      You can change these preferences anytime from your account settings.
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
                    {loading ? (
                      <span className="flex items-center justify-center whitespace-nowrap">
                        <i className="ri-loader-4-line animate-spin mr-2"></i>
                        Completing Setup...
                      </span>
                    ) : (
                      'Complete Setup'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Step 7: Success */}
          {currentStep === 'success' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <i className="ri-checkbox-circle-fill text-3xl sm:text-4xl text-green-600"></i>
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Welcome to AttendFlow!</h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                Your parent account has been created successfully
              </p>

              <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row items-center justify-center mb-3 sm:mb-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 sm:mb-0 sm:mr-4">
                    <i className="ri-user-line text-xl sm:text-2xl text-blue-600"></i>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">{selectedChild?.name}</h3>
                    <p className="text-sm sm:text-base text-gray-600">Class {selectedChild?.class} - Section {selectedChild?.section}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">{selectedChild?.schoolName}</p>
              </div>

              <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                <div className="flex items-center text-left">
                  <i className="ri-check-line text-green-600 text-lg sm:text-xl mr-2 sm:mr-3"></i>
                  <span className="text-sm sm:text-base text-gray-700">Real-time attendance tracking</span>
                </div>
                <div className="flex items-center text-left">
                  <i className="ri-check-line text-green-600 text-lg sm:text-xl mr-2 sm:mr-3"></i>
                  <span className="text-sm sm:text-base text-gray-700">Direct communication with teachers</span>
                </div>
                <div className="flex items-center text-left">
                  <i className="ri-check-line text-green-600 text-lg sm:text-xl mr-2 sm:mr-3"></i>
                  <span className="text-sm sm:text-base text-gray-700">Access to grades and homework</span>
                </div>
                <div className="flex items-center text-left">
                  <i className="ri-check-line text-green-600 text-lg sm:text-xl mr-2 sm:mr-3"></i>
                  <span className="text-sm sm:text-base text-gray-700">Meeting scheduling and notifications</span>
                </div>
              </div>

              <Button onClick={handleGoToDashboard} variant="primary" size="lg" className="w-full">
                Go to Parent Portal
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Exit Confirmation Modal */}
      <Modal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        title="Exit Signup?"
      >
        <div className="py-4">
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            Are you sure you want to exit? Your progress will be lost.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => setShowExitModal(false)}
              variant="secondary"
              className="flex-1"
            >
              Continue Signup
            </Button>
            <Button
              onClick={() => navigate('/signup-select')}
              variant="primary"
              className="flex-1"
            >
              Exit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
