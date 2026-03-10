import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/base/Input';
import Button from '../../components/base/Button';
import Modal from '../../components/base/Modal';

export default function SuperAdminLogin() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (failedAttempts >= 5) {
      setLoading(false);
      setError('Too many failed attempts. Your account has been temporarily locked for security reasons.');
      return;
    }

    // Simulate authentication
    setTimeout(() => {
      setLoading(false);
      
      // Simulate different scenarios
      const scenario = 'success'; // Change to test: 'success', 'wrong_password', 'not_found', 'locked'

      switch (scenario) {
        case 'success':
          // Navigate to 2FA verification
          navigate('/super-admin-2fa', { state: { email } });
          break;
        case 'wrong_password':
          setFailedAttempts(prev => prev + 1);
          setError('Incorrect password. Please try again.');
          break;
        case 'not_found':
          setError('Super Admin account not found. Please check your email.');
          break;
        case 'locked':
          setError('Your account has been locked due to multiple failed login attempts. Please contact support.');
          break;
      }
    }, 1500);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setResetSent(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <button
            onClick={() => navigate('/welcome')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4 sm:mb-6 cursor-pointer"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            <span className="text-sm font-medium whitespace-nowrap">Back to Home</span>
          </button>

          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mb-4 shadow-lg shadow-blue-500/30">
            <i className="ri-shield-keyhole-line text-3xl sm:text-4xl text-white"></i>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Super Admin Portal
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Secure access for platform administrators
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8">
          {/* Security Notice */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start">
            <i className="ri-shield-check-line text-blue-600 text-xl mr-3 mt-0.5"></i>
            <div>
              <p className="text-sm font-medium text-blue-900 mb-1">Secure Login</p>
              <p className="text-xs text-blue-700">
                This portal is protected with two-factor authentication
              </p>
            </div>
          </div>

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

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              label="Admin Email"
              type="email"
              placeholder="admin@attendflow.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            
            <Input
              label="Password"
              type="password"
              placeholder="Enter your secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded cursor-pointer focus:ring-2 focus:ring-blue-500" 
                />
                <span className="ml-2 text-gray-600 whitespace-nowrap">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer whitespace-nowrap"
              >
                Forgot password?
              </button>
            </div>

            {failedAttempts > 0 && failedAttempts < 5 && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs sm:text-sm text-amber-800">
                  <i className="ri-alert-line mr-2"></i>
                  {5 - failedAttempts} attempts remaining before account lock
                </p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30"
              disabled={loading || failedAttempts >= 5}
            >
              {loading ? (
                <span className="flex items-center justify-center whitespace-nowrap">
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  Authenticating...
                </span>
              ) : (
                <>
                  <i className="ri-login-box-line mr-2"></i>
                  Sign In Securely
                </>
              )}
            </Button>
          </form>

          {/* Security Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center text-xs text-gray-500">
              <i className="ri-lock-line mr-2"></i>
              <span>Protected by 256-bit SSL encryption</span>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center mt-6">
          <p className="text-xs sm:text-sm text-gray-500">
            Need assistance? Contact{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer whitespace-nowrap">
              Platform Support
            </a>
          </p>
        </div>

        {/* Security Notice */}
        <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex items-start">
            <i className="ri-information-line text-slate-600 text-lg mr-3 mt-0.5"></i>
            <div>
              <p className="text-xs font-medium text-slate-900 mb-1">Security Notice</p>
              <p className="text-xs text-slate-600">
                All login attempts are monitored and logged. Unauthorized access attempts will be reported.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={showForgotPassword}
        onClose={() => {
          setShowForgotPassword(false);
          setResetSent(false);
          setResetEmail('');
        }}
        title="Reset Super Admin Password"
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
            <p className="text-xs text-gray-500 mb-4">
              The link will expire in 15 minutes for security reasons.
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
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs sm:text-sm text-amber-800">
                <i className="ri-shield-line mr-2"></i>
                For security, password resets require additional verification from the platform owner.
              </p>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-600">
              Enter your admin email address and we'll send you secure instructions to reset your password.
            </p>
            
            <Input
              label="Admin Email Address"
              type="email"
              placeholder="admin@attendflow.com"
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
