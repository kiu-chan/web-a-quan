import { Link } from 'react-router-dom'
import { useCollection } from '../../hooks/useFirestore'
import { AiOutlineBook, AiOutlineClockCircle, AiOutlineUser, AiOutlineStar, AiOutlineCheckCircle, AiOutlinePlayCircle } from 'react-icons/ai'

const Courses = () => {
  // Lấy dữ liệu từ Firebase
  const { documents: courses, loading, error } = useCollection('courses')

  // Lọc chỉ các khóa học được kích hoạt và sắp xếp theo level
  const activeCourses = courses.filter(course => course.active !== false)
  const sortedCourses = activeCourses.sort((a, b) => {
    const levelOrder = { 'A1': 1, 'A2': 2, 'B1': 3, 'B2': 4 }
    return levelOrder[a.level] - levelOrder[b.level]
  })

  if (loading) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xl text-gray-600">Đang tải khóa học...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xl text-red-600">Lỗi: {error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
          Khóa học tiếng Đức
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Giới thiệu các khóa học đang mở với mô tả, học gì, thời gian, học phí và nút "Đăng ký" hoặc "Xem chi tiết"
        </p>
        
        {/* Course Levels Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {['A1', 'A2', 'B1', 'B2'].map((level, index) => {
            const courseExists = activeCourses.find(course => course.level === level)
            return (
              <div key={level} className={`p-4 rounded-lg bg-gradient-to-br ${
                index === 0 ? 'from-pink-50 to-purple-50 border-pink-200' :
                index === 1 ? 'from-purple-50 to-blue-50 border-purple-200' :
                index === 2 ? 'from-blue-50 to-indigo-50 border-blue-200' :
                'from-indigo-50 to-purple-50 border-indigo-200'
              } border ${!courseExists ? 'opacity-50' : ''}`}>
                <div className={`text-2xl font-bold bg-gradient-to-r ${
                  index === 0 ? 'from-pink-400 to-purple-500' :
                  index === 1 ? 'from-purple-400 to-blue-500' :
                  index === 2 ? 'from-blue-400 to-indigo-500' :
                  'from-indigo-400 to-purple-500'
                } bg-clip-text text-transparent mb-1`}>
                  {level}
                </div>
                <div className="text-sm text-gray-600">
                  {level === 'A1' ? 'Cơ bản' : level === 'A2' ? 'Sơ cấp' : level === 'B1' ? 'Trung cấp' : 'Cao cấp'}
                </div>
                {!courseExists && (
                  <div className="text-xs text-gray-400 mt-1">Sắp ra mắt</div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Courses Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {sortedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sortedCourses.map((course) => (
              <div key={course.id} className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/50">
                {/* Course Header */}
                <div className={`bg-gradient-to-r ${course.color || 'from-pink-400 to-purple-500'} p-6 text-white`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                        Cấp độ {course.level}
                      </span>
                      <h3 className="text-2xl font-bold mt-3">{course.title}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">{course.price?.toLocaleString()}</div>
                      <div className="text-sm opacity-90">VNĐ</div>
                    </div>
                  </div>
                  <p className="text-white/90 leading-relaxed">{course.description}</p>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  {/* Course Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <AiOutlineClockCircle className="text-lg" />
                      <span className="text-sm">{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <AiOutlineBook className="text-lg" />
                      <span className="text-sm">{course.lessons}</span>
                    </div>
                  </div>

                  {/* Course Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Nội dung khóa học:</h4>
                    <ul className="space-y-2">
                      {course.features?.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 text-gray-600">
                          <AiOutlineCheckCircle className="text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Link
                      to="/enroll"
                      className={`flex-1 bg-gradient-to-r ${course.color || 'from-pink-400 to-purple-500'} text-white py-3 px-4 rounded-lg text-center font-semibold hover:shadow-lg transition-all duration-300`}
                    >
                      Đăng ký ngay
                    </Link>
                    <button className="px-4 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                      Chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-xl text-gray-600 mb-4">Hiện tại chưa có khóa học nào đang mở</div>
            <p className="text-gray-500">Vui lòng quay lại sau hoặc liên hệ với chúng tôi để biết thêm thông tin</p>
          </div>
        )}
      </section>

      {/* Additional Info Section */}
      <section className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Teaching Method */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AiOutlineUser className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Lớp học nhỏ</h3>
              <p className="text-gray-600">
                Tối đa 8 học viên/lớp để đảm bảo chất lượng học tập và sự quan tâm đến từng người
              </p>
            </div>

            {/* Flexible Schedule */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AiOutlineClockCircle className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Thời gian linh hoạt</h3>
              <p className="text-gray-600">
                Nhiều khung giờ học để bạn lựa chọn: sáng, chiều, tối và cuối tuần
              </p>
            </div>

            {/* Quality Assurance */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AiOutlineStar className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Cam kết chất lượng</h3>
              <p className="text-gray-600">
                Đảm bảo đạt được mục tiêu học tập hoặc hỗ trợ học lại miễn phí
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
        <div className="bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Bắt đầu hành trình học tiếng Đức của bạn
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Đăng ký tư vấn miễn phí để chọn khóa học phù hợp với trình độ và mục tiêu của bạn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/enroll"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Đăng ký tư vấn miễn phí
            </Link>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Xem lịch khai giảng
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Courses