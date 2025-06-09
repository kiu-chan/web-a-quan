// components/layout/UserMenu.jsx
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { 
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineDown,
  AiOutlineUser as AiOutlineUserCircle
} from 'react-icons/ai'

const UserMenu = () => {
  const { currentUser, logout } = useAuth()
  const { t } = useLanguage()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

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
      if (isUserMenuOpen && !event.target.closest('.user-dropdown-container')) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isUserMenuOpen])

  return (
    <div className="relative user-dropdown-container">
      <button
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 rounded-lg hover:bg-purple-50 transition-all duration-200"
      >
        <AiOutlineUserCircle className="text-lg" />
        <span className="max-w-24 truncate">
          {t('nav.hello')}, {currentUser.displayName || currentUser.email?.split('@')[0]}
        </span>
        <AiOutlineDown className={`text-sm transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* User Dropdown */}
      {isUserMenuOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
          <Link
            to="/profile"
            className="flex items-center space-x-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200"
            onClick={() => setIsUserMenuOpen(false)}
          >
            <AiOutlineUserCircle className="text-lg" />
            <span>{t('nav.profile')}</span>
          </Link>
          
          {currentUser.role === 'admin' && (
            <Link
              to="/admin"
              className="flex items-center space-x-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200"
              onClick={() => setIsUserMenuOpen(false)}
            >
              <AiOutlineUser className="text-lg" />
              <span>{t('nav.admin')}</span>
            </Link>
          )}
          
          <hr className="my-2 border-gray-100" />
          
          <button
            onClick={() => {
              handleLogout()
              setIsUserMenuOpen(false)
            }}
            className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            <AiOutlineLogout className="text-lg" />
            <span>{t('nav.logout')}</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default UserMenu