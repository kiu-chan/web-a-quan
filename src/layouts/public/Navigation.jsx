// components/layout/Navigation.jsx
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { 
  AiOutlineHome, 
  AiOutlineUser, 
  AiOutlineBook, 
  AiOutlineUserAdd, 
  AiOutlineFileText, 
  AiOutlinePhone,
  AiOutlineDown
} from 'react-icons/ai'

const Navigation = () => {
  const location = useLocation()
  const { t } = useLanguage()
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)

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

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMoreMenuOpen && !event.target.closest('.dropdown-container')) {
        setIsMoreMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMoreMenuOpen])

  return (
    <div className="flex items-center space-x-1">
      {/* Main Menu Items */}
      {menuItems.map((item) => {
        const Icon = item.icon
        const isActive = location.pathname === item.path
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isActive 
                ? 'text-purple-600 bg-purple-50 shadow-sm' 
                : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
            }`}
          >
            <Icon className="text-18" />
            <span className="text-sm">{item.label}</span>
          </Link>
        )
      })}

      {/* Dropdown Menu */}
      <div className="relative dropdown-container">
        <button
          onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 text-gray-700 hover:text-purple-600 hover:bg-purple-50"
        >
          <span className="text-sm">{t('nav.more')}</span>
          <AiOutlineDown className={`text-sm transition-transform duration-200 ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Content */}
        {isMoreMenuOpen && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
            {moreMenuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'text-purple-600 bg-purple-50' 
                      : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
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
      </div>
    </div>
  )
}

export default Navigation