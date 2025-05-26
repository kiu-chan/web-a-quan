import { Link } from 'react-router-dom'
import { AiOutlinePlayCircle, AiOutlineBook, AiOutlineUser } from 'react-icons/ai'

const Home = () => {
  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Học tiếng Đức để hiểu & đúng trong tâm
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Khám phá hành trình học tiếng Đức cùng với phương pháp giảng dạy hiệu quả, 
            giúp bạn thành thạo ngôn ngữ này một cách tự nhiên và bền vững.
          </p>
          
          {/* Video Thumbnail */}
          <div className="relative mb-8 max-w-2xl mx-auto">
            <img 
              src="1(8).jpg" 
              alt="Ảnh bìa video giới thiệu"
              className="w-full rounded-lg shadow-lg"
            />
            <button className="absolute inset-0 flex items-center justify-center">
              <AiOutlinePlayCircle className="text-6xl text-white bg-blue-600 rounded-full p-2 shadow-lg hover:bg-blue-700 transition-colors" />
            </button>
          </div>

          <Link 
            to="/enroll"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-md transition-colors text-lg"
          >
            Đăng ký học thử
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Thu hút và tạo ấn tượng đầu tiên
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-lg bg-blue-50 shadow-md">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AiOutlineBook className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Phương pháp hiệu quả</h3>
              <p className="text-gray-600">
                Học tiếng Đức theo phương pháp độc đáo, giúp bạn tiếp thu kiến thức một cách tự nhiên và bền vững.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-lg bg-blue-50 shadow-md">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AiOutlineUser className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Giảng viên chuyên nghiệp</h3>
              <p className="text-gray-600">
                Đội ngũ giảng viên có kinh nghiệm, am hiểu văn hóa và ngôn ngữ Đức, sẵn sàng hỗ trợ bạn.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-lg bg-blue-50 shadow-md">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AiOutlinePlayCircle className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Lớp học online</h3>
              <p className="text-gray-600">
                Tham gia các lớp học trực tuyến qua Zoom, linh hoạt về thời gian và địa điểm học tập.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Sẵn sàng bắt đầu hành trình học tiếng Đức?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Đăng ký ngay hôm nay để nhận được lộ trình học tập cá nhân hóa và bắt đầu học tiếng Đức hiệu quả.
          </p>
          <Link 
            to="/enroll"
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg shadow-md transition-colors text-lg"
          >
            Đăng ký học thử miễn phí
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home