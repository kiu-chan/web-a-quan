import { Link, useLocation } from 'react-router-dom'
import { 
  AiOutlineHome, 
  AiOutlineUser, 
  AiOutlineBook, 
  AiOutlineUserAdd, 
  AiOutlineFileText, 
  AiOutlinePhone,
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter
} from 'react-icons/ai'

const PublicLayout = ({ children }) => {
  const location = useLocation()

  const menuItems = [
    { path: '/', label: 'Trang chủ', icon: AiOutlineHome },
    { path: '/about', label: 'Về tôi', icon: AiOutlineUser },
    { path: '/courses', label: 'Khóa học', icon: AiOutlineBook },
    { path: '/enroll', label: 'Đăng ký học', icon: AiOutlineUserAdd },
    { path: '/blog', label: 'Blog / Kiến thức', icon: AiOutlineFileText },
    { path: '/contact', label: 'Liên hệ', icon: AiOutlinePhone }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Học tiếng Đức
            </Link>
            
            {/* Navigation */}
            <nav className="hidden md:flex">
              <ul className="flex space-x-8">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.path
                  
                  return (
                    <li key={item.path}>
                      <Link 
                        to={item.path}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                          isActive 
                            ? 'text-blue-600 bg-blue-50' 
                            : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        <Icon className="text-lg" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo & Description */}
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-4">Học tiếng Đức</h3>
              <p className="text-gray-300 mb-4">
                Học tiếng Đức để hiểu & đúng trong tâm
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <AiOutlineFacebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <AiOutlineInstagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <AiOutlineTwitter className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Liên kết nhanh</h4>
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Link 
                      to={item.path}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Thông tin liên hệ</h4>
              <div className="text-gray-300 space-y-2">
                <p>Email: contact@hoctiengduc.com</p>
                <p>Phone: +84 123 456 789</p>
                <p>Địa chỉ: Thái Nguyên, Việt Nam</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2025 Học tiếng Đức. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PublicLayout