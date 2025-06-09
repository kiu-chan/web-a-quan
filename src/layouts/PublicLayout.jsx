import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useCollection } from '../hooks/useFirestore'
import { useAuth } from '../contexts/AuthContext'
import { 
  AiOutlineHome, 
  AiOutlineUser, 
  AiOutlineBook, 
  AiOutlineUserAdd, 
  AiOutlineFileText, 
  AiOutlinePhone,
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineLogin,
  AiOutlineLogout
} from 'react-icons/ai'

const PublicLayout = ({ children }) => {
  const location = useLocation()
  const { currentUser, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Lấy thông tin liên hệ từ Firebase
  const { documents: contacts } = useCollection('contacts')
  const contactInfo = contacts.length > 0 ? contacts[0] : {
    address: "Việt Nam",
    description: "Học tiếng Đức để hiểu & đúng trong tâm",
    email: "khanhk66uet@gmail.com",
    facebook: "https://facebook.com/hoctiengduc",
    instagram: "https://instagram.com/hoctiengduc",
    phone: "+84 123 456 789",
    twitter: "https://twitter.com/hoctiengduc"
  }

  const menuItems = [
    { path: '/', label: 'Trang chủ', icon: AiOutlineHome },
    { path: '/about', label: 'Về chúng tôi', icon: AiOutlineUser },
    { path: '/courses', label: 'Khóa học', icon: AiOutlineBook },
    { path: '/enroll', label: 'Đăng ký học', icon: AiOutlineUserAdd },
    { path: '/blog', label: 'Blog / Kiến thức', icon: AiOutlineFileText },
    { path: '/contact', label: 'Liên hệ', icon: AiOutlinePhone }
  ]

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Lỗi đăng xuất:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
              Học tiếng Đức
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
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
                            ? 'text-teal-600 bg-teal-50' 
                            : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50'
                        }`}
                      >
                        <Icon className="text-lg" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
                {currentUser ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">
                      Xin chào, {currentUser.displayName || currentUser.email}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 rounded-lg transition-all duration-200"
                    >
                      <AiOutlineLogout className="text-lg" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Link
                      to="/login"
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-teal-600 hover:text-teal-800 transition-colors"
                    >
                      <AiOutlineLogin className="text-lg" />
                      <span>Đăng nhập</span>
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 rounded-lg transition-all duration-200"
                    >
                      <AiOutlineUserAdd className="text-lg" />
                      <span>Đăng ký</span>
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-teal-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <AiOutlineClose className="h-6 w-6" />
              ) : (
                <AiOutlineMenu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.path
                  
                  return (
                    <li key={item.path}>
                      <Link 
                        to={item.path}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive 
                            ? 'text-teal-600 bg-teal-50' 
                            : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className="text-lg" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>

              {/* Mobile Auth Buttons */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                {currentUser ? (
                  <div className="space-y-2">
                    <div className="px-4 py-2 text-sm text-gray-600">
                      Xin chào, {currentUser.displayName || currentUser.email}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 rounded-lg transition-all duration-200"
                    >
                      <AiOutlineLogout className="text-lg" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium text-teal-600 border border-teal-600 hover:bg-teal-50 rounded-lg transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <AiOutlineLogin className="text-lg" />
                      <span>Đăng nhập</span>
                    </Link>
                    <Link
                      to="/signup"
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 rounded-lg transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <AiOutlineUserAdd className="text-lg" />
                      <span>Đăng ký</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
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
              <h3 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent mb-4">
                Học tiếng Đức
              </h3>
              <p className="text-gray-300 mb-4">
                {contactInfo.description}
              </p>
              <div className="flex space-x-4">
                {contactInfo.facebook && (
                  <a href={contactInfo.facebook} className="text-gray-400 hover:text-white transition-colors">
                    <AiOutlineFacebook className="h-6 w-6" />
                  </a>
                )}
                {contactInfo.instagram && (
                  <a href={contactInfo.instagram} className="text-gray-400 hover:text-white transition-colors">
                    <AiOutlineInstagram className="h-6 w-6" />
                  </a>
                )}
                {contactInfo.twitter && (
                  <a href={contactInfo.twitter} className="text-gray-400 hover:text-white transition-colors">
                    <AiOutlineTwitter className="h-6 w-6" />
                  </a>
                )}
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
                <p>Email: {contactInfo.email}</p>
                <p>Phone: {contactInfo.phone}</p>
                <p>Địa chỉ: {contactInfo.address}</p>
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