// components/layout/MobileMenu.jsx
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { 
  AiOutlineHome, 
  AiOutlineUser, 
  AiOutlineBook, 
  AiOutlineUserAdd, 
  AiOutlineFileText, 
  AiOutlinePhone,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineUser as AiOutlineUserCircle
} from 'react-icons/ai'

const MobileMenu = ({ isOpen, onClose }) => {
  const location = useLocation()
  const { currentUser, logout } = useAuth()
  const { t } = useLanguage()

  const menuItems = [
    { path: '/', label: t('nav.home'), icon: AiOutlineHome },
    { path: '/courses', label: t('nav.courses'), icon: AiOutlineBook },
    { path: '/enroll', label: t('nav.enroll'), icon: AiOutlineUserAdd },
    { path: '/contact', label: t('nav.contact'), icon: AiOutlinePhone }
  ]

  const moreMenuItems = [
    { path: '/about', label: t('nav.about'), icon: AiOutlineUser },
    { path: '/blog', label: t('nav.blog'), icon: AiOutlineFileText }
  ]

  const handleLogout = async () => {
    try {
      await logout()
      onClose()
    } catch (error) {
      console.error('Lỗi đăng xuất:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="lg:hidden border-t border-gray-100 bg-white">
      <div className="py-4 space-y-1">
        {/* Mobile Menu Items */}
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg mx-2 font-medium transition-all duration-200 ${
                isActive 
                  ? 'text-purple-600 bg-purple-50' 
                  : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
              }`}
              onClick={onClose}
            >
              <Icon className="text-lg" />
              <span>{item.label}</span>
            </Link>
          )
        })}
        
        {/* Mobile More Items */}
        {moreMenuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg mx-2 font-medium transition-all duration-200 ${
                isActive 
                  ? 'text-purple-600 bg-purple-50' 
                  : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
              }`}
              onClick={onClose}
            >
              <Icon className="text-lg" />
              <span>{item.label}</span>
            </Link>
          )
        })}

        {/* Mobile Auth Section */}
        <div className="border-t border-gray-100 mt-4 pt-4 mx-2">
          {currentUser ? (
            <div className="space-y-2">
              <div className="px-4 py-2 text-sm text-gray-600 font-medium">
                {t('nav.hello')}, {currentUser.displayName || currentUser.email?.split('@')[0]}
              </div>
              
              <Link
                to="/profile"
                className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg transition-all duration-200"
                onClick={onClose}
              >
                <AiOutlineUserCircle className="text-lg" />
                <span>{t('nav.profile')}</span>
              </Link>
              
              {currentUser.role === 'admin' && (
                <Link
                  to="/admin"
                  className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg transition-all duration-200"
                  onClick={onClose}
                >
                  <AiOutlineUser className="text-lg" />
                  <span>{t('nav.admin')}</span>
                </Link>
              )}
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-lg shadow-md transition-all duration-200"
              >
                <AiOutlineLogout className="text-lg" />
                <span>{t('nav.logout')}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                to="/login"
                className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg transition-all duration-200"
                onClick={onClose}
              >
                <AiOutlineLogin className="text-lg" />
                <span>{t('nav.login')}</span>
              </Link>
              <Link
                to="/signup"
                className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-lg shadow-md transition-all duration-200"
                onClick={onClose}
              >
                <AiOutlineUserAdd className="text-lg" />
                <span>{t('nav.signup')}</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MobileMenu