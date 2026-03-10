import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Input from '../../components/base/Input';
import Button from '../../components/base/Button';
import Modal from '../../components/base/Modal';

type LoginMethod = 'password' | 'otp';
type UserRole = 'parent' | 'admin';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const roleFromState = (location.state as { role?: UserRole })?.role || 'parent';
  
  const [role] = useState<UserRole>(roleFromState);
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('password');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [failedAttempts, setFailedAttempts] = useState(0);

  const isParent = role === 'parent';

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
    }, 1000);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const otpValue = otp.join('');
    
    setTimeout(() => {
      setLoading(false);
      if (otpValue === '123456') {
        navigate(isParent ? '/parent-portal' : '/dashboard');
      } else {
        setError('Invalid OTP. Please try again.');
        setOtp(['', '', '', '', '', '']);
      }
    }, 1000);
  };

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (failedAttempts >= 5) {
      setLoading(false);
      setError('Too many failed attempts. Please try again later or reset your password.');
      return;
    }

    setTimeout(() => {
      setLoading(false);
      
      // Simulate different error scenarios
      const scenarios = ['success', 'wrong_password', 'not_registered', 'pending_approval'];
      const scenario = scenarios[0]; // Change to test different scenarios

      switch (scenario) {
        case 'success':
          navigate(isParent ? '/parent-portal' : '/dashboard');
          break;
        case 'wrong_password':
          setFailedAttempts(prev => prev + 1);
          setError('Incorrect password. Please try again.');
          break;
        case 'not_registered':
          setError('Account not found. Please sign up first.');
          break;
        case 'pending_approval':
          setError('Your account is pending approval. Please contact your school administrator.');
          break;
      }
    }, 1000);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setResetSent(true);
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
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

  const handleSwitchRole = () => {
    navigate('/login-select');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <button
            onClick={() => navigate('/login-select')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4 sm:mb-6 cursor-pointer"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            <span className="text-sm font-medium whitespace-nowrap">Change Role</span>
          </button>

          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-xl mb-3 sm:mb-4">
            <i className={`text-2xl sm:text-3xl text-white ${isParent ? 'ri-parent-line' : 'ri-shield-user-line'}`}></i>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {isParent ? 'Parent Login' : 'School Admin Login'}
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            {isParent ? 'Access your child\'s information' : 'Manage your school attendance'}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
          {/* Login Method Toggle (Parent Only) */}
          {isParent && !otpSent && (
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <button
                onClick={() => setLoginMethod('password')}
                className={`flex-1 py-2 px-3 sm:px-4 rounded-md text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  loginMethod === 'password'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Password
              </button>
              <button
                onClick={() => setLoginMethod('otp')}
                className={`flex-1 py-2 px-3 sm:px-4 rounded-md text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  loginMethod === 'otp'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                OTP
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <i className="ri-error-warning-line text-red-600 text-lg sm:text-xl mr-2 sm:mr-3 mt-0.5"></i>
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-red-800">{error}</p>
                {error.includes('Too many failed attempts') && (
                  <button
                    onClick={() => setShowForgotPassword(true)}
                    className="text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium mt-2 cursor-pointer whitespace-nowrap"
                  >
                    Reset Password
                  </button>
                )}
              </div>
            </div>
          )}

          {/* OTP Verification Screen */}
          {otpSent ? (
            <form onSubmit={handleVerifyOTP} className="space-y-5">
              <div className="text-center mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <i className="ri-mail-send-line text-xl sm:text-2xl text-green-600"></i>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Verify OTP</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  We've sent a 6-digit code to<br />
                  <span className="font-medium text-gray-900">{phone || email}</span>
                </p>
              </div>

              <div className="flex justify-center gap-1.5 sm:gap-2 mb-6">
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
                  'Verify & Login'
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

              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setOtp(['', '', '', '', '', '']);
                  setError('');
                }}
                className="w-full text-xs sm:text-sm text-gray-600 hover:text-gray-900 cursor-pointer whitespace-nowrap"
              >
                ← Back to login
              </button>
            </form>
          ) : (
            <>
              {/* Password Login Form */}
              {loginMethod === 'password' && (
                <form onSubmit={handlePasswordLogin} className="space-y-5">
                  <Input
                    label={isParent ? 'Email or Phone' : 'Work Email'}
                    type={isParent ? 'text' : 'email'}
                    placeholder={isParent ? 'Enter email or phone' : 'admin@school.edu'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 text-sm">
                    <label className="flex items-center cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded cursor-pointer" />
                      <span className="ml-2 text-gray-600 whitespace-nowrap">Remember me</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer whitespace-nowrap text-left sm:text-right"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {failedAttempts > 0 && failedAttempts < 5 && (
                    <p className="text-xs sm:text-sm text-amber-600">
                      {5 - failedAttempts} attempts remaining
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={loading || failedAttempts >= 5}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center whitespace-nowrap">
                        <i className="ri-loader-4-line animate-spin mr-2"></i>
                        Signing in...
                      </span>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>
              )}

              {/* OTP Login Form (Parent Only) */}
              {loginMethod === 'otp' && isParent && (
                <form onSubmit={handleSendOTP} className="space-y-5">
                  <div className="space-y-4">
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                    <p className="text-xs text-gray-500">
                      We'll send a 6-digit verification code to this number
                    </p>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center whitespace-nowrap">
                        <i className="ri-loader-4-line animate-spin mr-2"></i>
                        Sending OTP...
                      </span>
                    ) : (
                      'Send OTP'
                    )}
                  </Button>
                </form>
              )}
            </>
          )}

          {/* Footer Links */}
          {!otpSent && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center space-y-3">
                <p className="text-xs sm:text-sm text-gray-600">
                  Wrong account type?{' '}
                  <button
                    onClick={handleSwitchRole}
                    className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer whitespace-nowrap"
                  >
                    Switch to {isParent ? 'School Admin' : 'Parent'}
                  </button>
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    onClick={() => navigate('/signup-select')}
                    className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer whitespace-nowrap"
                  >
                    Sign up here
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Help Text */}
        <p className="text-center text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">
          Need help? <a href="#" className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer whitespace-nowrap">Contact Support</a>
        </p>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={showForgotPassword}
        onClose={() => {
          setShowForgotPassword(false);
          setResetSent(false);
          setResetEmail('');
        }}
        title="Reset Password"
      >
        {resetSent ? (
          <div className="text-center py-4 sm:py-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <i className="ri-mail-check-line text-xl sm:text-2xl text-green-600"></i>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Check Your Email</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
              We've sent password reset instructions to<br />
              <span className="font-medium text-gray-900">{resetEmail}</span>
            </p>
            <Button
              onClick={() => {
                setShowForgotPassword(false);
                setResetSent(false);
                setResetEmail('');
              }}
              variant="primary"
              className="w-full"
            >
              Got it
            </Button>
          </div>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-5">
            <p className="text-xs sm:text-sm text-gray-600">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
            
            <Input
              label="Email Address"
              type="email"
              placeholder="your@email.com"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
            />

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetEmail('');
                }}
                variant="secondary"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
