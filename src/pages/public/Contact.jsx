import { useState } from 'react'
import { 
  AiOutlinePhone, 
  AiOutlineMail, 
  AiOutlineEnvironment, 
  AiOutlineClockCircle,
  AiOutlineMessage,
  AiOutlineUser,
  AiOutlineCheckCircle,
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineWechat
} from 'react-icons/ai'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    contactMethod: 'email',
    urgency: 'normal'
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const contactInfo = [
    {
      icon: AiOutlinePhone,
      title: 'Hotline',
      info: '+84 123 456 789',
      subInfo: 'Miễn phí cuộc gọi',
      color: 'from-pink-400 to-purple-500'
    },
    {
      icon: AiOutlineMail,
      title: 'Email',
      info: 'contact@hoctiengduc.com',
      subInfo: 'Phản hồi trong 2 giờ',
      color: 'from-purple-400 to-blue-500'
    },
    {
      icon: AiOutlineWechat,
      title: 'Zalo',
      info: '0123 456 789',
      subInfo: 'Chat trực tiếp',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      icon: AiOutlineEnvironment,
      title: 'Địa chỉ',
      info: 'Thái Nguyên, Việt Nam',
      subInfo: 'Gặp mặt trực tiếp',
      color: 'from-indigo-400 to-purple-500'
    }
  ]

  const socialLinks = [
    {
      icon: AiOutlineFacebook,
      name: 'Facebook',
      url: '#',
      color: 'hover:text-blue-600',
      bgColor: 'hover:bg-blue-50'
    },
    {
      icon: AiOutlineInstagram,
      name: 'Instagram',
      url: '#',
      color: 'hover:text-pink-600',
      bgColor: 'hover:bg-pink-50'
    },
    {
      icon: AiOutlineYoutube,
      name: 'YouTube',
      url: '#',
      color: 'hover:text-red-600',
      bgColor: 'hover:bg-red-50'
    },
    {
      icon: AiOutlineWechat,
      name: 'Zalo',
      url: '#',
      color: 'hover:text-blue-500',
      bgColor: 'hover:bg-blue-50'
    }
  ]

  const workingHours = [
    { day: 'Thứ 2 - Thứ 6', time: '8:00 - 21:00' },
    { day: 'Thứ 7 - Chủ nhật', time: '9:00 - 18:00' },
    { day: 'Ngày lễ', time: '10:00 - 16:00' }
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
    console.log('Contact form submitted:', formData)
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
              Gửi thành công!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 2 giờ làm việc.
            </p>
            <div className="bg-white/70 rounded-lg p-4 mb-6">
              <p className="text-gray-700">
                📧 Email xác nhận đã được gửi đến: <strong>{formData.email}</strong>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsSubmitted(false)}
                className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-500 hover:to-purple-600 transition-all duration-300"
              >
                Gửi câu hỏi khác
              </button>
              <a 
                href="tel:+84123456789"
                className="border-2 border-purple-500 text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-500 hover:text-white transition-all duration-300"
              >
                Gọi điện ngay
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
          Liên hệ
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Học viên dễ dạng hỏi thông tin. Link mạng xã hội, form để gửi câu hỏi nhanh
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Info Cards */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((contact, index) => {
              const Icon = contact.icon
              return (
                <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-white/50 text-center group">
                  <div className={`w-16 h-16 bg-gradient-to-r ${contact.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{contact.title}</h3>
                  <p className="text-gray-700 font-medium mb-1">{contact.info}</p>
                  <p className="text-sm text-gray-500">{contact.subInfo}</p>
                </div>
              )
            })}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/50">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
                Gửi câu hỏi cho chúng tôi
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <AiOutlineUser className="inline mr-2" />
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      placeholder="Nhập họ và tên"
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

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chủ đề câu hỏi *
                  </label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Chọn chủ đề</option>
                    <option value="course-info">Thông tin khóa học</option>
                    <option value="pricing">Học phí và ưu đãi</option>
                    <option value="schedule">Lịch học và thời gian</option>
                    <option value="level-test">Test trình độ</option>
                    <option value="teaching-method">Phương pháp giảng dạy</option>
                    <option value="certificate">Chứng chỉ và bằng cấp</option>
                    <option value="technical">Hỗ trợ kỹ thuật</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                {/* Contact Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phương thức liên lạc mong muốn
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="email"
                        checked={formData.contactMethod === 'email'}
                        onChange={handleInputChange}
                        className="text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-700">Email</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="phone"
                        checked={formData.contactMethod === 'phone'}
                        onChange={handleInputChange}
                        className="text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-700">Điện thoại</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="zalo"
                        checked={formData.contactMethod === 'zalo'}
                        onChange={handleInputChange}
                        className="text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-700">Zalo</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="all"
                        checked={formData.contactMethod === 'all'}
                        onChange={handleInputChange}
                        className="text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-700">Tất cả</span>
                    </label>
                  </div>
                </div>

                {/* Urgency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mức độ ưu tiên
                  </label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  >
                    <option value="low">Thấp - Phản hồi trong 24h</option>
                    <option value="normal">Bình thường - Phản hồi trong 4h</option>
                    <option value="high">Cao - Phản hồi trong 2h</option>
                    <option value="urgent">Khẩn cấp - Phản hồi ngay</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <AiOutlineMessage className="inline mr-2" />
                    Nội dung câu hỏi *
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="Nhập câu hỏi chi tiết của bạn..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition-all duration-300 text-lg"
                >
                  Gửi câu hỏi
                </button>
              </form>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-8">
            {/* Working Hours */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/50">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                <AiOutlineClockCircle className="inline mr-2" />
                Giờ làm việc
              </h3>
              <div className="space-y-3">
                {workingHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                    <span className="text-gray-700">{schedule.day}</span>
                    <span className="font-medium text-gray-800">{schedule.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200">
                <p className="text-sm text-gray-600">
                  🎯 <strong>Cam kết phản hồi nhanh:</strong> Chúng tôi luôn phản hồi trong vòng 2 giờ làm việc
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/50">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Kết nối với chúng tôi
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={index}
                      href={social.url}
                      className={`flex items-center space-x-3 p-3 rounded-lg border border-gray-200 ${social.bgColor} ${social.color} transition-all duration-300 group`}
                    >
                      <Icon className="text-xl" />
                      <span className="font-medium">{social.name}</span>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Liên hệ nhanh</h3>
              <div className="space-y-3">
                <a
                  href="tel:+84123456789"
                  className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  <AiOutlinePhone className="text-lg" />
                  <span className="font-medium">Gọi ngay: 0123 456 789</span>
                </a>
                
                <a
                  href="mailto:contact@hoctiengduc.com"
                  className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  <AiOutlineMail className="text-lg" />
                  <span className="font-medium">Gửi email</span>
                </a>

                <a
                  href="#"
                  className="flex items-center justify-center space-x-2 bg-blue-400 hover:bg-blue-500 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  <AiOutlineWechat className="text-lg" />
                  <span className="font-medium">Chat qua Zalo</span>
                </a>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 rounded-xl p-6 text-white text-center">
              <h3 className="text-lg font-bold mb-2">Câu hỏi thường gặp</h3>
              <p className="text-sm opacity-90 mb-4">
                Có thể bạn sẽ tìm thấy câu trả lời tại đây
              </p>
              <button className="inline-block bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Xem FAQ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact