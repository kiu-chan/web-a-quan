import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { 
  FiHome, 
  FiUsers, 
  FiBook, 
  FiFileText, 
  FiSettings, 
  FiLogOut,
  FiBarChart,
  FiMail,
  FiUser,
  FiMenu,
  FiX
} from 'react-icons/fi'

const PrivateLayout = ({ children }) => {
  const location = useLocation()
  const { currentUser, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [imageError, setImageError] = useState(false)

  const menuItems = [
    {
      title: 'Tổng quan',
      path: '/admin',
      icon: FiHome
    },
    {
      title: 'Quản lý học viên',
      path: '/admin/students',
      icon: FiUsers
    },
    {
      title: 'Quản lý khóa học',
      path: '/admin/courses',
      icon: FiBook
    },
    {
      title: 'Quản lý bài viết',
      path: '/admin/posts',
      icon: FiFileText
    },
    {
      title: 'Thống kê',
      path: '/admin/analytics',
      icon: FiBarChart
    },
    {
      title: 'Tin nhắn',
      path: '/admin/messages',
      icon: FiMail
    },
    {
      title: 'Tài khoản',
      path: '/admin/profile',
      icon: FiUser
    },
    {
      title: 'Cài đặt',
      path: '/admin/settings',
      icon: FiSettings
    }
  ]

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin'
    }
    return location.pathname.startsWith(path)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Lỗi đăng xuất:', error)
    }
  }

  // Lấy tên hiển thị và email từ currentUser
  const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Admin'
  const email = currentUser?.email || 'admin@example.com'
  const userInitial = displayName.charAt(0).toUpperCase()

  // Lấy avatar URL nếu có và xử lý lỗi
  const avatarUrl = currentUser?.photoURL
  const showAvatar = avatarUrl && !imageError

  const handleImageError = () => {
    setImageError(true)
  }

  // Debug log để kiểm tra
  console.log('Current User:', currentUser)
  console.log('Avatar URL:', avatarUrl)
  console.log('Show Avatar:', showAvatar)

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className={`w-64 bg-white shadow-lg fixed h-full overflow-y-auto z-30 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
                <p className="text-sm text-gray-600 mt-1">Quản trị hệ thống</p>
              </div>
              <button
                onClick={closeMobileMenu}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="mt-6">
            <div className="px-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                MENU CHÍNH
              </p>
            </div>
            
            {menuItems.map((item, index) => {
              const Icon = item.icon
              return (
                <Link
                  key={index}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.title}
                </Link>
              )
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="absolute bottom-0 w-full border-t border-gray-200 bg-white">
            <div className="p-4">
              <div className="flex items-center mb-3">
                {showAvatar ? (
                  <img 
                    src={avatarUrl} 
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                    onError={handleImageError}
                    onLoad={() => console.log('Image loaded successfully')}
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-2 border-gray-200">
                    <span className="text-white text-sm font-medium">{userInitial}</span>
                  </div>
                )}
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {displayName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {email}
                  </p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
              >
                <FiLogOut className="w-4 h-4 mr-2" />
                Đăng xuất
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={closeMobileMenu}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          {/* Top Header */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-4 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    onClick={toggleMobileMenu}
                    className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 mr-3 transition-colors duration-200"
                  >
                    <FiMenu className="w-5 h-5" />
                  </button>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-800">
                      {menuItems.find(item => isActive(item.path))?.title || 'Admin Dashboard'}
                    </h1>
                    <p className="text-sm text-gray-600 mt-1 hidden sm:block">
                      Chào mừng {displayName} quay trở lại!
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                    <FiMail className="w-5 h-5" />
                  </button>
                  {showAvatar ? (
                    <img 
                      src={avatarUrl} 
                      alt="Avatar"
                      className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-2 border-gray-200">
                      <span className="text-white text-sm font-medium">{userInitial}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-4 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default PrivateLayout