// components/layout/Header.jsx
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import LanguageSelector from '../../components/LanguageSelector'
import Navigation from './Navigation'
import MobileMenu from './MobileMenu'
import UserMenu from './UserMenu'
import { 
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineLogin,
  AiOutlineUserAdd
} from 'react-icons/ai'

const Header = () => {
  const location = useLocation()
  const { currentUser } = useAuth()
  const { t } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
          >
            Học tiếng Đức
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Navigation />

            {/* Right Side: Language + Auth */}
            <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-200">
              {/* Language Selector */}
              <LanguageSelector showLabel={false} />

              {/* Auth Buttons */}
              {currentUser ? (
                <UserMenu />
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-all duration-200"
                  >
                    <AiOutlineLogin className="text-lg" />
                    <span>{t('nav.login')}</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <AiOutlineUserAdd className="text-lg" />
                    <span>{t('nav.signup')}</span>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-3">
            <LanguageSelector showLabel={false} />
            <button 
              className="p-2 rounded-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <AiOutlineClose className="h-6 w-6" />
              ) : (
                <AiOutlineMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileMenu 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>
    </header>
  )
}

export default Header