// pages/Home.jsx
import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import { AiOutlinePlayCircle, AiOutlineBook, AiOutlineUser } from 'react-icons/ai'

const Home = () => {
  const { t } = useLanguage()

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-6">
            {t('home.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('home.subtitle')}
          </p>
          
          {/* Video Thumbnail */}
          <div className="relative mb-8 max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 w-full h-64 rounded-lg shadow-lg flex items-center justify-center">
              <span className="text-purple-600 text-lg font-medium">{t('home.videoTitle')}</span>
            </div>
            <button className="absolute inset-0 flex items-center justify-center">
              <AiOutlinePlayCircle className="text-6xl text-white bg-gradient-to-r from-pink-400 to-purple-500 rounded-full p-2 shadow-lg hover:from-pink-500 hover:to-purple-600 transition-all duration-300" />
            </button>
          </div>

          <Link 
            to="/enroll"
            className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-semibold py-4 px-8 rounded-lg shadow-md transition-all duration-300 text-lg"
          >
            {t('home.enrollBtn')}
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white/50 backdrop-blur-sm py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-12">
            {t('home.featuresTitle')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-pink-50 to-purple-50 shadow-md hover:shadow-lg transition-all duration-300 border border-pink-100">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AiOutlineBook className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">{t('home.feature1Title')}</h3>
              <p className="text-gray-600">
                {t('home.feature1Desc')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 shadow-md hover:shadow-lg transition-all duration-300 border border-purple-100">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <AiOutlineUser className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">{t('home.feature2Title')}</h3>
              <p className="text-gray-600">
                {t('home.feature2Desc')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-50 to-pink-50 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <AiOutlinePlayCircle className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">{t('home.feature3Title')}</h3>
              <p className="text-gray-600">
                {t('home.feature3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-md">
            {t('home.ctaTitle')}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {t('home.ctaDesc')}
          </p>
          <Link 
            to="/enroll"
            className="bg-white text-purple-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-lg shadow-md transition-colors text-lg"
          >
            {t('home.ctaBtn')}
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home