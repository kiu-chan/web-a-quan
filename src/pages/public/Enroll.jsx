import { useState } from 'react'
import { 
  AiOutlineUser, 
  AiOutlinePhone, 
  AiOutlineMail, 
  AiOutlineBook, 
  AiOutlineCalendar, 
  AiOutlineCheckCircle, 
  AiOutlineClockCircle, 
  AiOutlineGift 
} from 'react-icons/ai'

const Enroll = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    course: '',
    schedule: '',
    experience: '',
    goals: '',
    hearAbout: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const courses = [
    { value: 'a1', label: 'A1 - Tiếng Đức cơ bản (2.500.000 VNĐ)' },
    { value: 'a2', label: 'A2 - Tiếng Đức sơ cấp (3.000.000 VNĐ)' },
    { value: 'b1', label: 'B1 - Tiếng Đức trung cấp (3.500.000 VNĐ)' },
    { value: 'b2', label: 'B2 - Tiếng Đức cao cấp (4.000.000 VNĐ)' },
    { value: 'consultation', label: 'Tư vấn chọn khóa phù hợp' }
  ]

  const schedules = [
    { value: 'morning', label: 'Buổi sáng (8:00 - 10:00)' },
    { value: 'afternoon', label: 'Buổi chiều (14:00 - 16:00)' },
    { value: 'evening', label: 'Buổi tối (19:00 - 21:00)' },
    { value: 'weekend', label: 'Cuối tuần (9:00 - 11:00)' },
    { value: 'flexible', label: 'Linh hoạt theo lịch cá nhân' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Xử lý submit form ở đây
    console.log('Form data:', formData)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AiOutlineCheckCircle className="text-3xl text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent mb-4">
              Đăng ký thành công!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Cảm ơn bạn đã đăng ký. Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ để tư vấn chi tiết.
            </p>
            <div className="bg-white/70 rounded-lg p-4 mb-6">
              <p className="text-gray-700">
                📧 Email xác nhận đã được gửi đến: <strong>{formData.email}</strong>
              </p>
            </div>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-500 hover:to-purple-600 transition-all duration-300"
            >
              Đăng ký thêm khóa học khác
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
          Đăng ký học tiếng Đức
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Biến người truy cập thành học viên với form đăng ký, tùy chọn đăng ký khóa học cụ thể và tích hợp thanh toán (nếu cần)
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Registration Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/50">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
                Thông tin đăng ký
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <AiOutlineUser className="inline mr-2" />
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      placeholder="Nhập họ và tên của bạn"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <AiOutlinePhone className="inline mr-2" />
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <AiOutlineMail className="inline mr-2" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="Nhập địa chỉ email"
                  />
                </div>

                {/* Course Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <AiOutlineBook className="inline mr-2" />
                    Khóa học muốn đăng ký *
                  </label>
                  <select
                    name="course"
                    required
                    value={formData.course}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Chọn khóa học</option>
                    {courses.map((course) => (
                      <option key={course.value} value={course.value}>
                        {course.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Schedule Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <AiOutlineCalendar className="inline mr-2" />
                    Thời gian học mong muốn *
                  </label>
                  <select
                    name="schedule"
                    required
                    value={formData.schedule}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Chọn thời gian học</option>
                    {schedules.map((schedule) => (
                      <option key={schedule.value} value={schedule.value}>
                        {schedule.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Experience Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trình độ tiếng Đức hiện tại
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Chọn trình độ hiện tại</option>
                    <option value="beginner">Hoàn toàn mới bắt đầu</option>
                    <option value="basic">Có kiến thức cơ bản</option>
                    <option value="intermediate">Trung cấp</option>
                    <option value="advanced">Nâng cao</option>
                  </select>
                </div>

                {/* Learning Goals */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mục tiêu học tiếng Đức
                  </label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="Ví dụ: Học để đi du học, làm việc tại Đức, sở thích cá nhân..."
                  />
                </div>

                {/* How did you hear about us */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bạn biết về chúng tôi qua đâu?
                  </label>
                  <select
                    name="hearAbout"
                    value={formData.hearAbout}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Chọn nguồn thông tin</option>
                    <option value="facebook">Facebook</option>
                    <option value="google">Google Search</option>
                    <option value="friend">Bạn bè giới thiệu</option>
                    <option value="website">Website</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition-all duration-300 text-lg"
                  >
                    Đăng ký ngay
                  </button>
                  <p className="text-sm text-gray-500 mt-3 text-center">
                    Bằng việc đăng ký, bạn đồng ý với các điều khoản sử dụng của chúng tôi
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Special Offer */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-200">
              <div className="flex items-center mb-4">
                <AiOutlineGift className="text-2xl text-pink-500 mr-3" />
                <h3 className="text-lg font-bold text-gray-800">Ưu đãi đặc biệt</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✨ Giảm 10% học phí cho khóa đầu tiên</li>
                <li>📚 Tặng bộ tài liệu học tập</li>
                <li>🎯 Buổi học thử miễn phí</li>
                <li>💬 Hỗ trợ 1-1 với giảng viên</li>
              </ul>
            </div>

            {/* Process Steps */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/50">
              <h3 className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
                Quy trình đăng ký
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Điền form</h4>
                    <p className="text-sm text-gray-600">Hoàn thành thông tin đăng ký</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Tư vấn</h4>
                    <p className="text-sm text-gray-600">Nhận tư vấn từ chuyên gia</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Học thử</h4>
                    <p className="text-sm text-gray-600">Tham gia buổi học thử miễn phí</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Bắt đầu</h4>
                    <p className="text-sm text-gray-600">Chính thức bắt đầu học</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                <AiOutlineClockCircle className="inline mr-2" />
                Hỗ trợ 24/7
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>📞 Hotline: 0123 456 789</p>
                <p>📧 Email: support@hoctiengduc.com</p>
                <p>💬 Zalo: 0123 456 789</p>
                <p>⏰ Phản hồi trong 30 phút</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Enroll