import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
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
  AiOutlineLogout,
  AiOutlineDown,
  AiOutlineUser as AiOutlineUserCircle
} from 'react-icons/ai'

const PublicLayout = ({ children }) => {
  const location = useLocation()
  const { currentUser, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  
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
    { path: '/courses', label: 'Khóa học', icon: AiOutlineBook },
    { path: '/enroll', label: 'Đăng ký học', icon: AiOutlineUserAdd },
    { path: '/contact', label: 'Liên hệ', icon: AiOutlinePhone }
  ]

  const moreMenuItems = [
    { path: '/about', label: 'Về chúng tôi', icon: AiOutlineUser },
    { path: '/blog', label: 'Blog / Kiến thức', icon: AiOutlineFileText }
  ]

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Lỗi đăng xuất:', error)
    }
  }

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMoreMenuOpen && !event.target.closest('.dropdown-container')) {
        setIsMoreMenuOpen(false)
      }
      if (isUserMenuOpen && !event.target.closest('.user-dropdown-container')) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMoreMenuOpen, isUserMenuOpen])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
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
                            ? 'text-purple-600 bg-purple-50' 
                            : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                        }`}
                      >
                        <Icon className="text-lg" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  )
                })}

                {/* Dropdown Menu */}
                <li className="relative dropdown-container">
                  <button
                    onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                  >
                    <span>Thêm</span>
                    <AiOutlineDown className={`text-sm transition-transform ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Content */}
                  {isMoreMenuOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {moreMenuItems.map((item) => {
                        const Icon = item.icon
                        const isActive = location.pathname === item.path
                        
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center space-x-3 px-4 py-2 transition-colors ${
                              isActive 
                                ? 'text-purple-600 bg-purple-50' 
                                : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                            }`}
                            onClick={() => setIsMoreMenuOpen(false)}
                          >
                            <Icon className="text-lg" />
                            <span>{item.label}</span>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </li>
              </ul>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
                {currentUser ? (
                  <div className="relative user-dropdown-container">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                    >
                      <AiOutlineUserCircle className="text-lg" />
                      <span>Xin chào, {currentUser.displayName || currentUser.email?.split('@')[0]}</span>
                      <AiOutlineDown className={`text-sm transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* User Dropdown */}
                    {isUserMenuOpen && (
                      <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        <Link
                          to="/profile"
                          className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <AiOutlineUserCircle className="text-lg" />
                          <span>Người dùng</span>
                        </Link>
                        
                        {currentUser.role === 'admin' && (
                          <Link
                            to="/admin"
                            className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <AiOutlineUser className="text-lg" />
                            <span>Quản lý (Admin)</span>
                          </Link>
                        )}
                        
                        <hr className="my-2 border-gray-200" />
                        
                        <button
                          onClick={() => {
                            handleLogout()
                            setIsUserMenuOpen(false)
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <AiOutlineLogout className="text-lg" />
                          <span>Đăng xuất</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Link
                      to="/login"
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors"
                    >
                      <AiOutlineLogin className="text-lg" />
                      <span>Đăng nhập</span>
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 rounded-lg transition-all duration-200"
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
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-purple-600"
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
                            ? 'text-purple-600 bg-purple-50' 
                            : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className="text-lg" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  )
                })}
                
                {/* Mobile More Items */}
                {moreMenuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.path
                  
                  return (
                    <li key={item.path}>
                      <Link 
                        to={item.path}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive 
                            ? 'text-purple-600 bg-purple-50' 
                            : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
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
                    <div className="px-4 py-2 text-sm text-gray-600 border-b border-gray-200 pb-2">
                      Xin chào, {currentUser.displayName || currentUser.email?.split('@')[0]}
                    </div>
                    
                    <Link
                      to="/profile"
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium text-purple-600 border border-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <AiOutlineUserCircle className="text-lg" />
                      <span>Người dùng</span>
                    </Link>
                    
                    {currentUser.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium text-blue-600 border border-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <AiOutlineUser className="text-lg" />
                        <span>Quản lý (Admin)</span>
                      </Link>
                    )}
                    
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 rounded-lg transition-all duration-200"
                    >
                      <AiOutlineLogout className="text-lg" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium text-purple-600 border border-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <AiOutlineLogin className="text-lg" />
                      <span>Đăng nhập</span>
                    </Link>
                    <Link
                      to="/signup"
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 rounded-lg transition-all duration-200"
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
              <h3 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-4">
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
                {[...menuItems, ...moreMenuItems].map((item) => (
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
            <p className="text-gray-400 mb-2">© 2025 Học tiếng Đức. Tất cả quyền được bảo lưu.</p>
            <p className="text-gray-500 text-sm">
              Designed with ❤ by{' '}
              <a 
                href="https://monlycute.id.vn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                Khanh
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PublicLayout