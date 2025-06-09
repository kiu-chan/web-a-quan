import { Link } from 'react-router-dom'

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 relative">
      {/* Header với logo */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            to="/" 
            className="inline-block text-2xl font-bold bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent hover:from-teal-600 hover:to-cyan-700 transition-all duration-200"
          >
            Học tiếng Đức
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-0">
        {children}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-teal-200/30 rounded-full blur-xl"></div>
      <div className="absolute top-32 right-20 w-32 h-32 bg-cyan-200/30 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-200/30 rounded-full blur-xl"></div>
      <div className="absolute bottom-40 right-10 w-16 h-16 bg-teal-300/30 rounded-full blur-xl"></div>
    </div>
  )
}

export default AuthLayout