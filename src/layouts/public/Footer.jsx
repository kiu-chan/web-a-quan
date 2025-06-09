// components/layout/Footer.jsx
import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import { useCollection } from '../../hooks/useFirestore'
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

const Footer = () => {
  const { t } = useLanguage()
  
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
    { path: '/', label: t('nav.home'), icon: AiOutlineHome },
    { path: '/courses', label: t('nav.courses'), icon: AiOutlineBook },
    { path: '/enroll', label: t('nav.enroll'), icon: AiOutlineUserAdd },
    { path: '/contact', label: t('nav.contact'), icon: AiOutlinePhone }
  ]

  const moreMenuItems = [
    { path: '/about', label: t('nav.about'), icon: AiOutlineUser },
    { path: '/blog', label: t('nav.blog'), icon: AiOutlineFileText }
  ]

  return (
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
                <a 
                  href={contactInfo.facebook} 
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiOutlineFacebook className="h-6 w-6" />
                </a>
              )}
              {contactInfo.instagram && (
                <a 
                  href={contactInfo.instagram} 
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiOutlineInstagram className="h-6 w-6" />
                </a>
              )}
              {contactInfo.twitter && (
                <a 
                  href={contactInfo.twitter} 
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiOutlineTwitter className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
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
            <h4 className="text-lg font-semibold mb-4">{t('footer.contactInfo')}</h4>
            <div className="text-gray-300 space-y-2">
              <p>Email: {contactInfo.email}</p>
              <p>Phone: {contactInfo.phone}</p>
              <p>{t('footer.address')}: {contactInfo.address}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 mb-2">{t('footer.copyright')}</p>
          <p className="text-gray-500 text-sm">
            {t('footer.designedBy')}{' '}
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
  )
}

export default Footer