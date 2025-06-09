// layouts/PublicLayout.jsx
import Header from '../public/Header'
import Footer from '../public/Footer'

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <Header />
      
      {/* Main Content */}
      <main className="min-h-screen">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default PublicLayout