
import { useNavigate } from 'react-router-dom';

export default function SignupSelect() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col">
      {/* Header */}
      <header className="px-4 sm:px-6 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/welcome')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            <span className="text-sm font-medium">Back to Home</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-4xl">
          {/* Logo and Title */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-xl mb-3 sm:mb-4">
              <i className="ri-school-line text-2xl sm:text-3xl text-white"></i>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Join AttendFlow Schools</h1>
            <p className="text-base sm:text-lg text-gray-600">Choose your role to get started</p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {/* Parent Role */}
            <button
              onClick={() => navigate('/signup-parent')}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all p-6 sm:p-8 text-left cursor-pointer group"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-blue-600 transition-colors">
                <i className="ri-parent-line text-2xl sm:text-3xl text-blue-600 group-hover:text-white transition-colors"></i>
              </div>
              
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">I'm a Parent</h2>
              
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                Create an account to stay connected with your child's school activities and progress.
              </p>

              <div className="space-y-2 mb-4 sm:mb-6">
                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Link your child's account</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Real-time attendance updates</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Direct teacher communication</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Track grades & homework</span>
                </div>
              </div>

              <div className="flex items-center text-blue-600 font-semibold text-sm sm:text-base group-hover:text-blue-700">
                <span>Sign up as Parent</span>
                <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </button>

            {/* School Admin Role */}
            <button
              onClick={() => navigate('/signup-school')}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg border-2 border-gray-200 hover:border-green-500 hover:shadow-xl transition-all p-6 sm:p-8 text-left cursor-pointer group"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-green-600 transition-colors">
                <i className="ri-shield-user-line text-2xl sm:text-3xl text-green-600 group-hover:text-white transition-colors"></i>
              </div>
              
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">I'm a School Admin</h2>
              
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                Register your school and set up a complete attendance and communication system.
              </p>

              <div className="space-y-2 mb-4 sm:mb-6">
                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Create school workspace</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Manage staff & students</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Automated attendance tracking</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Analytics & reporting tools</span>
                </div>
              </div>

              <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold mb-4">
                <i className="ri-gift-line mr-1"></i>
                14-day free trial
              </div>

              <div className="flex items-center text-green-600 font-semibold text-sm sm:text-base group-hover:text-green-700">
                <span>Sign up as School</span>
                <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </button>
          </div>

          {/* Help Text */}
          <div className="text-center mt-6 sm:mt-8">
            <p className="text-xs sm:text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login-select')}
                className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 sm:px-6 py-4 sm:py-6 border-t border-gray-200 bg-white/50">
        <div className="max-w-7xl mx-auto text-center text-xs sm:text-sm text-gray-600">
          <p>© 2025 AttendFlow Schools. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
