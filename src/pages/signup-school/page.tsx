import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/base/Input';
import Button from '../../components/base/Button';
import Modal from '../../components/base/Modal';

type SignupStep = 
  | 'account-creation'
  | 'verification'
  | 'school-profile'
  | 'workspace-setup'
  | 'class-setup'
  | 'staff-invitation'
  | 'attendance-rules'
  | 'subscription'
  | 'success';

type SchoolType = 'primary' | 'secondary' | 'high-school' | 'k-12' | 'international' | '';
type StudentCountRange = '1-100' | '101-500' | '501-1000' | '1000+' | '';
type SubscriptionPlan = 'free-trial' | 'basic' | 'professional' | 'enterprise' | '';

interface ClassSection {
  id: string;
  className: string;
  section: string;
}

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: 'teacher' | 'coordinator';
}

interface AttendanceRules {
  level1Threshold: number;
  level2Threshold: number;
  level3Threshold: number;
  autoNotifyParents: boolean;
  requireExcuseNote: boolean;
}

export default function SignupSchool() {
  const navigate = useNavigate();
  
  // Step management
  const [currentStep, setCurrentStep] = useState<SignupStep>('account-creation');
  
  // Account creation
  const [adminName, setAdminName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Verification
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'phone'>('email');
  
  // School profile
  const [schoolType, setSchoolType] = useState<SchoolType>('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [studentCount, setStudentCount] = useState<StudentCountRange>('');
  
  // Workspace setup
  const [workspaceCode, setWorkspaceCode] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [workspaceAvailable, setWorkspaceAvailable] = useState<boolean | null>(null);
  const [brandColor, setBrandColor] = useState('#3B82F6');
  
  // Class setup
  const [classes, setClasses] = useState<ClassSection[]>([
    { id: '1', className: '', section: '' }
  ]);
  
  // Staff invitation
  const [staff, setStaff] = useState<StaffMember[]>([
    { id: '1', name: '', email: '', role: 'teacher' }
  ]);
  
  // Attendance rules
  const [attendanceRules, setAttendanceRules] = useState<AttendanceRules>({
    level1Threshold: 3,
    level2Threshold: 5,
    level3Threshold: 7,
    autoNotifyParents: true,
    requireExcuseNote: true,
  });
  
  // Subscription
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>('');
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showExitModal, setShowExitModal] = useState(false);
  const [schoolExists, setSchoolExists] = useState(false);

  const steps = [
    { key: 'account-creation', label: 'Account', icon: 'ri-user-line' },
    { key: 'verification', label: 'Verify', icon: 'ri-shield-check-line' },
    { key: 'school-profile', label: 'Profile', icon: 'ri-building-line' },
    { key: 'workspace-setup', label: 'Workspace', icon: 'ri-settings-line' },
    { key: 'class-setup', label: 'Classes', icon: 'ri-book-line' },
    { key: 'staff-invitation', label: 'Staff', icon: 'ri-team-line' },
    { key: 'attendance-rules', label: 'Rules', icon: 'ri-file-list-line' },
    { key: 'subscription', label: 'Plan', icon: 'ri-vip-crown-line' },
  ];

  const currentStepIndex = steps.findIndex(s => s.key === currentStep);

  // Account Creation Submit
  const handleAccountCreationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSchoolExists(false);
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      
      // Simulate school already exists scenario
      const exists = false; // Change to true to test
      
      if (exists) {
        setSchoolExists(true);
        setError('A school with this name or email already exists. Please contact support or use a different email.');
      } else {
        setCurrentStep('verification');
      }
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
        setCurrentStep('school-profile');
      } else {
        setError('Invalid OTP. Please try again.');
        setOtp(['', '', '', '', '', '']);
      }
    }, 1000);
  };

  // School Profile Submit
  const handleSchoolProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolType || !studentCount) {
      setError('Please fill in all required fields');
      return;
    }
    setError('');
    setCurrentStep('workspace-setup');
  };

  // Generate workspace code
  const generateWorkspaceCode = () => {
    const code = schoolName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 8) + Math.floor(Math.random() * 1000);
    setWorkspaceCode(code);
    setSubdomain(code);
  };

  // Check workspace availability
  const checkWorkspaceAvailability = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Simulate availability check
      const available = Math.random() > 0.3;
      setWorkspaceAvailable(available);
      if (!available) {
        setError('This workspace name is already taken. Please try another.');
      } else {
        setError('');
      }
    }, 800);
  };

  // Workspace Setup Submit
  const handleWorkspaceSetupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceCode || workspaceAvailable !== true) {
      setError('Please set up a valid workspace');
      return;
    }
    setError('');
    setCurrentStep('class-setup');
  };

  // Class management
  const addClassSection = () => {
    setClasses([...classes, { id: Date.now().toString(), className: '', section: '' }]);
  };

  const removeClassSection = (id: string) => {
    if (classes.length > 1) {
      setClasses(classes.filter(c => c.id !== id));
    }
  };

  const updateClassSection = (id: string, field: 'className' | 'section', value: string) => {
    setClasses(classes.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  // Class Setup Submit
  const handleClassSetupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('staff-invitation');
  };

  const skipClassSetup = () => {
    setCurrentStep('staff-invitation');
  };

  // Staff management
  const addStaffMember = () => {
    setStaff([...staff, { id: Date.now().toString(), name: '', email: '', role: 'teacher' }]);
  };

  const removeStaffMember = (id: string) => {
    if (staff.length > 1) {
      setStaff(staff.filter(s => s.id !== id));
    }
  };

  const updateStaffMember = (id: string, field: keyof StaffMember, value: string) => {
    setStaff(staff.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  // Staff Invitation Submit
  const handleStaffInvitationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('attendance-rules');
  };

  const skipStaffInvitation = () => {
    setCurrentStep('attendance-rules');
  };

  // Attendance Rules Submit
  const handleAttendanceRulesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('subscription');
  };

  const skipAttendanceRules = () => {
    setCurrentStep('subscription');
  };

  // Subscription Submit
  const handleSubscriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) {
      setError('Please select a plan');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCurrentStep('success');
    }, 1500);
  };

  // Go to dashboard
  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col">
      {/* Header */}
      <header className="px-6 py-5 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setShowExitModal(true)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            <span className="text-sm font-medium whitespace-nowrap">Exit Signup</span>
          </button>
          
          {currentStep !== 'success' && (
            <div className="text-sm text-gray-600">
              Step {currentStepIndex + 1} of {steps.length}
            </div>
          )}
        </div>
      </header>

      {/* Progress Bar */}
      {currentStep !== 'success' && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.key} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        index < currentStepIndex
                          ? 'bg-green-600 text-white'
                          : index === currentStepIndex
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {index < currentStepIndex ? (
                        <i className="ri-check-line text-lg"></i>
                      ) : (
                        <i className={`${step.icon} text-lg`}></i>
                      )}
                    </div>
                    <span
                      className={`text-xs mt-2 text-center whitespace-nowrap ${
                        index <= currentStepIndex ? 'text-gray-900 font-medium' : 'text-gray-500'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 transition-all ${
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
      <main className="flex-1 px-6 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Step 1: Account Creation */}
          {currentStep === 'account-creation' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-4">
                  <i className="ri-building-line text-3xl text-blue-600"></i>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create School Account</h1>
                <p className="text-gray-600">Register your school with AttendFlow</p>
              </div>

              {error && (
                <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                  <i className="ri-error-warning-line text-red-600 text-xl mr-3 mt-0.5"></i>
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {schoolExists && (
                <div className="mb-5 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start">
                    <i className="ri-information-line text-amber-600 text-xl mr-3 mt-0.5"></i>
                    <div className="text-sm text-amber-800">
                      <p className="font-medium mb-1">School Already Registered</p>
                      <p>If you're a staff member, ask your admin to invite you. If you believe this is an error, contact support.</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleAccountCreationSubmit} className="space-y-5">
                <Input
                  label="Admin Full Name"
                  type="text"
                  placeholder="Your full name"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  required
                />

                <Input
                  label="School Name"
                  type="text"
                  placeholder="Official school name"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  required
                />

                <Input
                  label="Work Email Address"
                  type="email"
                  placeholder="admin@school.edu"
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
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-mail-send-line text-2xl text-green-600"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Account</h2>
                <p className="text-gray-600 mb-4">
                  We've sent a 6-digit code to
                </p>
                
                <div className="flex justify-center gap-2 mb-4">
                  <button
                    onClick={() => setVerificationMethod('email')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                      verificationMethod === 'email'
                        ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                        : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:border-gray-300'
                    }`}
                  >
                    <i className="ri-mail-line mr-1"></i>
                    {email}
                  </button>
                  <button
                    onClick={() => setVerificationMethod('phone')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
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
                <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                  <i className="ri-error-warning-line text-red-600 text-xl mr-3 mt-0.5"></i>
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <form onSubmit={handleVerificationSubmit} className="space-y-6">
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
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
                  <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer whitespace-nowrap"
                  >
                    Resend OTP
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3: School Profile */}
          {currentStep === 'school-profile' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-4">
                  <i className="ri-building-line text-3xl text-blue-600"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">School Profile</h2>
                <p className="text-gray-600">Tell us about your school</p>
              </div>

              {error && (
                <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                  <i className="ri-error-warning-line text-red-600 text-xl mr-3 mt-0.5"></i>
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <form onSubmit={handleSchoolProfileSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    School Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={schoolType}
                    onChange={(e) => setSchoolType(e.target.value as SchoolType)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  >
                    <option value="">Select school type</option>
                    <option value="primary">Primary School</option>
                    <option value="secondary">Secondary School</option>
                    <option value="high-school">High School</option>
                    <option value="k-12">K-12 School</option>
                    <option value="international">International School</option>
                  </select>
                </div>

                <Input
                  label="City"
                  type="text"
                  placeholder="School city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    School Address
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Full school address"
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Students <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={studentCount}
                    onChange={(e) => setStudentCount(e.target.value as StudentCountRange)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  >
                    <option value="">Select student count</option>
                    <option value="1-100">1 - 100 students</option>
                    <option value="101-500">101 - 500 students</option>
                    <option value="501-1000">501 - 1,000 students</option>
                    <option value="1000+">1,000+ students</option>
                  </select>
                </div>

                <div className="pt-4">
                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    Continue
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Step 4: Workspace Setup */}
          {currentStep === 'workspace-setup' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-4">
                  <i className="ri-settings-line text-3xl text-blue-600"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Workspace</h2>
                <p className="text-gray-600">Set up your school's unique workspace</p>
              </div>

              {error && (
                <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                  <i className="ri-error-warning-line text-red-600 text-xl mr-3 mt-0.5"></i>
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <form onSubmit={handleWorkspaceSetupSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Workspace Code
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="e.g., greenwood2024"
                      value={workspaceCode}
                      onChange={(e) => {
                        setWorkspaceCode(e.target.value);
                        setWorkspaceAvailable(null);
                      }}
                      required
                    />
                    <Button
                      type="button"
                      onClick={generateWorkspaceCode}
                      variant="secondary"
                      className="whitespace-nowrap"
                    >
                      Generate
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    This will be used for parent and staff access
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subdomain
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      placeholder="yourschool"
                      value={subdomain}
                      onChange={(e) => {
                        setSubdomain(e.target.value);
                        setWorkspaceAvailable(null);
                      }}
                      required
                    />
                    <span className="text-gray-600 whitespace-nowrap">.attendflow.com</span>
                  </div>
                  {workspaceAvailable === true && (
                    <p className="text-xs text-green-600 mt-1 flex items-center">
                      <i className="ri-check-line mr-1"></i>
                      Available!
                    </p>
                  )}
                  {workspaceAvailable === false && (
                    <p className="text-xs text-red-600 mt-1 flex items-center">
                      <i className="ri-close-line mr-1"></i>
                      Not available
                    </p>
                  )}
                </div>

                <Button
                  type="button"
                  onClick={checkWorkspaceAvailability}
                  variant="secondary"
                  className="w-full"
                  disabled={loading || !workspaceCode || !subdomain}
                >
                  {loading ? (
                    <span className="flex items-center justify-center whitespace-nowrap">
                      <i className="ri-loader-4-line animate-spin mr-2"></i>
                      Checking...
                    </span>
                  ) : (
                    'Check Availability'
                  )}
                </Button>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={brandColor}
                      onChange={(e) => setBrandColor(e.target.value)}
                      className="w-16 h-12 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={brandColor}
                      onChange={(e) => setBrandColor(e.target.value)}
                      placeholder="#3B82F6"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    This color will be used in your school's portal
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <i className="ri-information-line text-blue-600 text-xl mr-3 mt-0.5"></i>
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Preview</p>
                      <p>Your portal will be accessible at: <strong>{subdomain || 'yourschool'}.attendflow.com</strong></p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={workspaceAvailable !== true}
                  >
                    Continue
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Step 5: Class Setup */}
          {currentStep === 'class-setup' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-4">
                  <i className="ri-book-line text-3xl text-blue-600"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Classes & Sections</h2>
                <p className="text-gray-600">Quick setup for your classes (optional)</p>
              </div>

              <form onSubmit={handleClassSetupSubmit} className="space-y-4">
                {classes.map((classItem, index) => (
                  <div key={classItem.id} className="flex gap-3 items-start">
                    <div className="flex-1">
                      <Input
                        type="text"
                        placeholder="Class (e.g., 5, Grade 10)"
                        value={classItem.className}
                        onChange={(e) => updateClassSection(classItem.id, 'className', e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        type="text"
                        placeholder="Section (e.g., A, B)"
                        value={classItem.section}
                        onChange={(e) => updateClassSection(classItem.id, 'section', e.target.value)}
                      />
                    </div>
                    {classes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeClassSection(classItem.id)}
                        className="w-10 h-10 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <i className="ri-delete-bin-line text-lg"></i>
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addClassSection}
                  className="w-full py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-add-line mr-2"></i>
                  Add Another Class
                </button>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <div className="flex items-start">
                    <i className="ri-information-line text-blue-600 text-xl mr-3 mt-0.5"></i>
                    <p className="text-sm text-blue-800">
                      You can add more classes later from your dashboard settings.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    onClick={skipClassSetup}
                    variant="secondary"
                    size="lg"
                    className="flex-1"
                  >
                    Skip for Now
                  </Button>
                  <Button type="submit" variant="primary" size="lg" className="flex-1">
                    Continue
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Step 6: Staff Invitation */}
          {currentStep === 'staff-invitation' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-4">
                  <i className="ri-team-line text-3xl text-blue-600"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Invite Staff Members</h2>
                <p className="text-gray-600">Add teachers and coordinators (optional)</p>
              </div>

              <form onSubmit={handleStaffInvitationSubmit} className="space-y-4">
                {staff.map((member, index) => (
                  <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="space-y-3">
                      <Input
                        type="text"
                        placeholder="Full name"
                        value={member.name}
                        onChange={(e) => updateStaffMember(member.id, 'name', e.target.value)}
                      />
                      <Input
                        type="email"
                        placeholder="Email address"
                        value={member.email}
                        onChange={(e) => updateStaffMember(member.id, 'email', e.target.value)}
                      />
                      <div className="flex items-center justify-between">
                        <select
                          value={member.role}
                          onChange={(e) => updateStaffMember(member.id, 'role', e.target.value)}
                          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        >
                          <option value="teacher">Teacher</option>
                          <option value="coordinator">Coordinator</option>
                        </select>
                        {staff.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeStaffMember(member.id)}
                            className="ml-3 w-10 h-10 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <i className="ri-delete-bin-line text-lg"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addStaffMember}
                  className="w-full py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-add-line mr-2"></i>
                  Add Another Staff Member
                </button>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <div className="flex items-start">
                    <i className="ri-information-line text-blue-600 text-xl mr-3 mt-0.5"></i>
                    <p className="text-sm text-blue-800">
                      Invitation emails will be sent to all staff members with instructions to join.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    onClick={skipStaffInvitation}
                    variant="secondary"
                    size="lg"
                    className="flex-1"
                  >
                    Skip for Now
                  </Button>
                  <Button type="submit" variant="primary" size="lg" className="flex-1">
                    Continue
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Step 7: Attendance Rules */}
          {currentStep === 'attendance-rules' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-4">
                  <i className="ri-file-list-line text-3xl text-blue-600"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Attendance Rules</h2>
                <p className="text-gray-600">Configure risk thresholds (optional)</p>
              </div>

              <form onSubmit={handleAttendanceRulesSubmit} className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-4">Risk Level Thresholds</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Level 1 (Low Risk) - Absences
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={attendanceRules.level1Threshold}
                        onChange={(e) => setAttendanceRules({
                          ...attendanceRules,
                          level1Threshold: parseInt(e.target.value)
                        })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Flag student after this many absences
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Level 2 (Medium Risk) - Absences
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="15"
                        value={attendanceRules.level2Threshold}
                        onChange={(e) => setAttendanceRules({
                          ...attendanceRules,
                          level2Threshold: parseInt(e.target.value)
                        })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Escalate to medium risk
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Level 3 (High Risk) - Absences
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={attendanceRules.level3Threshold}
                        onChange={(e) => setAttendanceRules({
                          ...attendanceRules,
                          level3Threshold: parseInt(e.target.value)
                        })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Escalate to high risk
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-4">Notification Settings</h3>
                  
                  <div className="space-y-3">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <p className="font-medium text-gray-900">Auto-notify Parents</p>
                        <p className="text-sm text-gray-600">Send automatic alerts when thresholds are reached</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={attendanceRules.autoNotifyParents}
                        onChange={(e) => setAttendanceRules({
                          ...attendanceRules,
                          autoNotifyParents: e.target.checked
                        })}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <p className="font-medium text-gray-900">Require Excuse Note</p>
                        <p className="text-sm text-gray-600">Parents must provide reason for absences</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={attendanceRules.requireExcuseNote}
                        onChange={(e) => setAttendanceRules({
                          ...attendanceRules,
                          requireExcuseNote: e.target.checked
                        })}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </label>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <i className="ri-information-line text-blue-600 text-xl mr-3 mt-0.5"></i>
                    <p className="text-sm text-blue-800">
                      You can modify these rules anytime from your settings dashboard.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    onClick={skipAttendanceRules}
                    variant="secondary"
                    size="lg"
                    className="flex-1"
                  >
                    Use Defaults
                  </Button>
                  <Button type="submit" variant="primary" size="lg" className="flex-1">
                    Continue
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Step 8: Subscription */}
          {currentStep === 'subscription' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-4">
                  <i className="ri-vip-crown-line text-3xl text-blue-600"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
                <p className="text-gray-600">Select the best plan for your school</p>
              </div>

              {error && (
                <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                  <i className="ri-error-warning-line text-red-600 text-xl mr-3 mt-0.5"></i>
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubscriptionSubmit} className="space-y-4">
                {/* Free Trial */}
                <button
                  type="button"
                  onClick={() => setSelectedPlan('free-trial')}
                  className={`w-full p-6 border-2 rounded-xl transition-all cursor-pointer text-left ${
                    selectedPlan === 'free-trial'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Free Trial</h3>
                      <p className="text-sm text-gray-600">Try all features for 30 days</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">$0</p>
                      <p className="text-sm text-gray-600">30 days</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      Up to 100 students
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      All core features
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      Email support
                    </li>
                  </ul>
                </button>

                {/* Basic Plan */}
                <button
                  type="button"
                  onClick={() => setSelectedPlan('basic')}
                  className={`w-full p-6 border-2 rounded-xl transition-all cursor-pointer text-left ${
                    selectedPlan === 'basic'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Basic</h3>
                      <p className="text-sm text-gray-600">For small schools</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">$49</p>
                      <p className="text-sm text-gray-600">per month</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      Up to 500 students
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      All core features
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      Priority email support
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      Basic reports
                    </li>
                  </ul>
                </button>

                {/* Professional Plan */}
                <button
                  type="button"
                  onClick={() => setSelectedPlan('professional')}
                  className={`w-full p-6 border-2 rounded-xl transition-all cursor-pointer text-left relative ${
                    selectedPlan === 'professional'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    POPULAR
                  </div>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Professional</h3>
                      <p className="text-sm text-gray-600">For growing schools</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">$99</p>
                      <p className="text-sm text-gray-600">per month</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      Up to 1,000 students
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      All features
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      Phone & email support
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      Advanced reports & analytics
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      Custom branding
                    </li>
                  </ul>
                </button>

                {/* Enterprise Plan */}
                <button
                  type="button"
                  onClick={() => setSelectedPlan('enterprise')}
                  className={`w-full p-6 border-2 rounded-xl transition-all cursor-pointer text-left ${
                    selectedPlan === 'enterprise'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Enterprise</h3>
                      <p className="text-sm text-gray-600">For large institutions</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">Custom</p>
                      <p className="text-sm text-gray-600">Contact us</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      Unlimited students
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      All features + custom development
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      Dedicated account manager
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      Custom integrations
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      SLA guarantee
                    </li>
                  </ul>
                </button>

                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={loading || !selectedPlan}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center whitespace-nowrap">
                        <i className="ri-loader-4-line animate-spin mr-2"></i>
                        Processing...
                      </span>
                    ) : (
                      'Complete Setup'
                    )}
                  </Button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  You can change or cancel your plan anytime
                </p>
              </form>
            </div>
          )}

          {/* Step 9: Success */}
          {currentStep === 'success' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-checkbox-circle-fill text-4xl text-green-600"></i>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-3">Welcome to AttendFlow!</h1>
              <p className="text-lg text-gray-600 mb-8">
                Your school workspace has been created successfully
              </p>

              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <i className="ri-building-line text-2xl text-blue-600"></i>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-gray-900">{schoolName}</h3>
                    <p className="text-gray-600">{subdomain}.attendflow.com</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center text-left">
                  <i className="ri-check-line text-green-600 text-xl mr-3"></i>
                  <span className="text-gray-700">Workspace configured and ready</span>
                </div>
                <div className="flex items-center text-left">
                  <i className="ri-check-line text-green-600 text-xl mr-3"></i>
                  <span className="text-gray-700">Staff invitations sent</span>
                </div>
                <div className="flex items-center text-left">
                  <i className="ri-check-line text-green-600 text-xl mr-3"></i>
                  <span className="text-gray-700">Attendance rules configured</span>
                </div>
                <div className="flex items-center text-left">
                  <i className="ri-check-line text-green-600 text-xl mr-3"></i>
                  <span className="text-gray-700">
                    {selectedPlan === 'free-trial' ? '30-day free trial activated' : 'Subscription activated'}
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8">
                <h3 className="font-semibold text-gray-900 mb-2">Next Steps:</h3>
                <ul className="text-sm text-gray-700 space-y-1 text-left">
                  <li>• Complete your school profile</li>
                  <li>• Add more classes and sections</li>
                  <li>• Import student data</li>
                  <li>• Customize notification templates</li>
                </ul>
              </div>

              <Button onClick={handleGoToDashboard} variant="primary" size="lg" className="w-full">
                Go to Admin Dashboard
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
          <p className="text-gray-600 mb-6">
            Are you sure you want to exit? Your progress will be lost.
          </p>
          <div className="flex gap-3">
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
