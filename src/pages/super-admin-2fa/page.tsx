import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/base/Button';

export default function SuperAdmin2FA() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendCountdown, setResendCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendCountdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);
    
    const lastFilledIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setError('');
    setLoading(true);

    // Simulate verification
    setTimeout(() => {
      setLoading(false);

      // Simulate different scenarios
      const scenario = 'success'; // Change to test: 'success', 'invalid', 'expired'

      switch (scenario) {
        case 'success':
          // Navigate to Super Admin Dashboard
          navigate('/super-admin-dashboard');
          break;
        case 'invalid':
          setError('Invalid verification code. Please try again.');
          setOtp(['', '', '', '', '', '']);
          inputRefs.current[0]?.focus();
          break;
        case 'expired':
          setError('Verification code has expired. Please request a new one.');
          setOtp(['', '', '', '', '', '']);
          inputRefs.current[0]?.focus();
          break;
      }
    }, 1500);
  };

  const handleResend = () => {
    if (!canResend) return;

    setCanResend(false);
    setResendCountdown(60);
    setError('');
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();

    // Simulate resend
    setTimeout(() => {
      // Show success message (you could use a toast here)
      console.log('New code sent');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <button
            onClick={() => navigate('/super-admin-login')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4 sm:mb-6 cursor-pointer"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            <span className="text-sm font-medium whitespace-nowrap">Back to Login</span>
          </button>

          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mb-4 shadow-lg shadow-blue-500/30">
            <i className="ri-shield-check-line text-3xl sm:text-4xl text-white"></i>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Two-Factor Authentication
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Enter the 6-digit code sent to
          </p>
          <p className="text-sm sm:text-base font-medium text-gray-900 mt-1">
            {email || 'your registered email'}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8">
          {/* Security Notice */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start">
            <i className="ri-time-line text-blue-600 text-xl mr-3 mt-0.5"></i>
            <div>
              <p className="text-sm font-medium text-blue-900 mb-1">Code Expires Soon</p>
              <p className="text-xs text-blue-700">
                This verification code will expire in 10 minutes
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <i className="ri-error-warning-line text-red-600 text-lg sm:text-xl mr-2 sm:mr-3 mt-0.5"></i>
              <p className="text-xs sm:text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* OTP Form */}
          <form onSubmit={handleVerify} className="space-y-6">
            {/* OTP Input Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                Verification Code
              </label>
              <div className="flex justify-center gap-2 sm:gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className={`w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-bold border-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      error
                        ? 'border-red-300 bg-red-50'
                        : digit
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Verify Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30"
              disabled={loading || otp.join('').length !== 6}
            >
              {loading ? (
                <span className="flex items-center justify-center whitespace-nowrap">
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  Verifying...
                </span>
              ) : (
                <>
                  <i className="ri-check-line mr-2"></i>
                  Verify Code
                </>
              )}
            </Button>

            {/* Resend Code */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Didn't receive the code?
              </p>
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-refresh-line mr-1"></i>
                  Resend Code
                </button>
              ) : (
                <p className="text-sm text-gray-500">
                  Resend available in{' '}
                  <span className="font-medium text-gray-700">{resendCountdown}s</span>
                </p>
              )}
            </div>
          </form>

          {/* Help Text */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-start text-xs text-gray-500">
              <i className="ri-information-line mr-2 mt-0.5"></i>
              <p>
                Check your email inbox and spam folder. The code is valid for 10 minutes.
              </p>
            </div>
          </div>
        </div>

        {/* Support Link */}
        <div className="text-center mt-6">
          <p className="text-xs sm:text-sm text-gray-500">
            Having trouble?{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer whitespace-nowrap">
              Contact Support
            </a>
          </p>
        </div>

        {/* Security Badge */}
        <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex items-center justify-center text-xs text-slate-600">
            <i className="ri-lock-line mr-2"></i>
            <span>Secured with end-to-end encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}
