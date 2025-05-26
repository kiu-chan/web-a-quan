import { 
  AiOutlineBook, 
  AiOutlineUser, 
  AiOutlineTeam, 
  AiOutlineTrophy,
  AiOutlineHeart,
  AiOutlineStar,
  AiOutlineGlobal,
  AiOutlineCheckCircle,
  AiOutlinePlayCircle,
  AiOutlineCrown
} from 'react-icons/ai'

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Cô Hương',
      role: 'Giảng viên chính & Founder',
      experience: '8+ năm kinh nghiệm',
      education: 'Thạc sĩ Ngôn ngữ Đức - ĐH Quốc gia',
      certifications: ['TestDaF C2', 'Goethe Institut Certified', 'CELTA'],
      specialties: ['Phương pháp giảng dạy độc đáo', 'Tâm lý học ngôn ngữ', 'Luyện thi B1-C1'],
      achievements: '500+ học viên thành công',
      avatar: 'teacher-huong',
      color: 'from-pink-400 to-purple-500'
    },
    {
      id: 2,
      name: 'Thầy Thomas',
      role: 'Giảng viên Native Speaker',
      experience: '5+ năm tại Việt Nam',
      education: 'Cử nhân Sư phạm - ĐH Berlin',
      certifications: ['DaF Lehrer', 'Intercultural Communication'],
      specialties: ['Phát âm chuẩn', 'Văn hóa Đức', 'Giao tiếp thực tế'],
      achievements: 'Chuyên gia văn hóa Đức',
      avatar: 'teacher-thomas',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 3,
      name: 'Cô Mai',
      role: 'Giảng viên trợ giảng',
      experience: '3+ năm giảng dạy',
      education: 'Cử nhân Ngôn ngữ Đức - ĐH Hà Nội',
      certifications: ['TestDaF B2', 'Teaching Certificate'],
      specialties: ['Hỗ trợ học viên mới', 'Luyện từ vựng', 'Ngữ pháp cơ bản'],
      achievements: '200+ học viên A1-A2',
      avatar: 'teacher-mai',
      color: 'from-purple-400 to-pink-500'
    }
  ]

  const stats = [
    { number: '3+', label: 'Năm hoạt động', icon: AiOutlineGlobal },
    { number: '800+', label: 'Học viên đã học', icon: AiOutlineTeam },
    { number: '95%', label: 'Tỷ lệ thành công', icon: AiOutlineTrophy },
    { number: '4.9/5', label: 'Đánh giá trung bình', icon: AiOutlineStar }
  ]

  const values = [
    {
      icon: AiOutlineHeart,
      title: 'Tận tâm',
      description: 'Chúng tôi cam kết đồng hành cùng học viên từ những bước đầu tiên đến khi đạt được mục tiêu.',
      color: 'from-pink-400 to-red-400'
    },
    {
      icon: AiOutlineBook,
      title: 'Chuyên nghiệp',
      description: 'Đội ngũ giảng viên có trình độ cao, phương pháp giảng dạy được chứng minh hiệu quả.',
      color: 'from-blue-400 to-purple-500'
    },
    {
      icon: AiOutlineStar,
      title: 'Chất lượng',
      description: 'Cam kết chất lượng giảng dạy cao, tài liệu cập nhật và môi trường học tập tốt nhất.',
      color: 'from-purple-400 to-indigo-500'
    },
    {
      icon: AiOutlineCheckCircle,
      title: 'Hiệu quả',
      description: 'Phương pháp "học để hiểu & đúng trong tâm" giúp học viên tiến bộ nhanh chóng.',
      color: 'from-indigo-400 to-blue-500'
    }
  ]

  const milestones = [
    {
      year: '2022',
      title: 'Thành lập trung tâm',
      description: 'Bắt đầu với ước mơ giúp người Việt học tiếng Đức hiệu quả'
    },
    {
      year: '2023',
      title: '100 học viên đầu tiên',
      description: 'Đạt mốc 100 học viên với tỷ lệ thành công 92%'
    },
    {
      year: '2024',
      title: 'Mở rộng team giảng viên',
      description: 'Có thêm native speaker và chuyên gia tâm lý học ngôn ngữ'
    },
    {
      year: '2025',
      title: 'Hướng tới 1000 học viên',
      description: 'Mục tiêu giúp 1000 học viên Việt Nam chinh phục tiếng Đức'
    }
  ]

  const testimonials = [
    {
      name: 'Nguyễn Minh Anh',
      role: 'Kỹ sư IT',
      content: 'Tôi đã học nhiều nơi nhưng chỉ tại đây tôi mới thực sự hiểu và cảm nhận được tiếng Đức. Phương pháp giảng dạy rất độc đáo và hiệu quả.',
      rating: 5,
      result: 'Đạt B2 sau 18 tháng',
      avatar: 'student-minh-anh'
    },
    {
      name: 'Trần Thị Hoa',
      role: 'Sinh viên Y khoa',
      content: 'Cô Hương và team đã giúp tôi từ A1 lên B1 chỉ trong 10 tháng. Giờ tôi đã có thể giao tiếp tự tin với bác sĩ Đức.',
      rating: 5,
      result: 'Du học Đức thành công',
      avatar: 'student-hoa'
    },
    {
      name: 'Lê Văn Đức',
      role: 'Nhân viên ngân hàng',
      content: 'Lịch học linh hoạt, giảng viên tận tình. Tôi có thể học sau giờ làm mà vẫn đạt kết quả tốt. Rất recommend!',
      rating: 5,
      result: 'Thăng tiến công việc',
      avatar: 'student-duc'
    }
  ]

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
          Về chúng tôi
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
          Chúng tôi là đội ngũ giảng viên đam mê, tận tâm với sứ mệnh giúp người Việt Nam học tiếng Đức một cách hiệu quả và tự nhiên nhất
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/50">
                <Icon className="text-3xl text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white/50 backdrop-blur-sm py-16 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
                Sứ mệnh của chúng tôi
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <strong>"Học tiếng Đức để hiểu & đúng trong tâm"</strong> - đó không chỉ là slogan mà là triết lý giáo dục của chúng tôi. 
                  Chúng tôi tin rằng việc học ngôn ngữ không chỉ là ghi nhớ từ vựng và ngữ pháp, mà là cảm nhận và hiểu được tinh thần, văn hóa của ngôn ngữ đó.
                </p>
                <p>
                  Với hơn 3 năm kinh nghiệm và 800+ học viên thành công, chúng tôi đã chứng minh rằng phương pháp độc đáo của mình 
                  không chỉ giúp học viên học nhanh mà còn học bền vững, ứng dụng thực tế trong cuộc sống và công việc.
                </p>
                <p>
                  Chúng tôi cam kết đồng hành cùng mỗi học viên trên hành trình chinh phục tiếng Đức, từ những bước đầu tiên đến khi 
                  họ tự tin giao tiếp, làm việc hay sinh sống tại môi trường tiếng Đức.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl p-6 border border-pink-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3">🎯 Tầm nhìn 2025</h3>
                <p className="text-gray-700">
                  Trở thành trung tâm đào tạo tiếng Đức hàng đầu Việt Nam, giúp 1000+ học viên đạt được ước mơ du học, làm việc tại Đức.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-6 border border-blue-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3">💡 Phương pháp độc quyền</h3>
                <p className="text-gray-700">
                  Kết hợp tâm lý học ngôn ngữ, công nghệ giáo dục hiện đại và kinh nghiệm thực tế để tạo ra trải nghiệm học tập tối ưu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Đội ngũ giảng viên
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Những chuyên gia tận tâm, giàu kinh nghiệm với tình yêu dành cho việc giảng dạy tiếng Đức
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={member.id} className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/50 group">
              {/* Avatar */}
              <div className={`h-64 bg-gradient-to-br ${member.color} flex items-center justify-center relative`}>
                <span className="text-white text-lg font-medium">{member.avatar}</span>
                <div className="absolute top-4 right-4">
                  <AiOutlineCrown className="text-2xl text-white/80" />
                </div>
              </div>

              <div className="p-6">
                {/* Basic Info */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-purple-600 font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-gray-600">{member.experience}</p>
                </div>

                {/* Education */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">🎓 Học vấn:</h4>
                  <p className="text-sm text-gray-700">{member.education}</p>
                </div>

                {/* Certifications */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">📜 Chứng chỉ:</h4>
                  <div className="flex flex-wrap gap-1">
                    {member.certifications.map((cert, certIndex) => (
                      <span key={certIndex} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">⭐ Chuyên môn:</h4>
                  <ul className="space-y-1">
                    {member.specialties.map((specialty, specIndex) => (
                      <li key={specIndex} className="text-sm text-gray-700 flex items-center">
                        <AiOutlineCheckCircle className="text-green-500 mr-2 flex-shrink-0 text-xs" />
                        {specialty}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Achievement */}
                <div className="pt-4 border-t border-gray-200">
                  <div className={`bg-gradient-to-r ${member.color} bg-clip-text text-transparent font-bold text-sm`}>
                    🏆 {member.achievements}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 py-16 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Giá trị cốt lõi</h2>
            <p className="text-xl text-gray-600">Những nguyên tắc định hướng mọi hoạt động của chúng tôi</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 border border-white/50">
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Hành trình phát triển
          </h2>
          <p className="text-xl text-gray-600">Những cột mốc quan trọng trong quá trình xây dựng và phát triển</p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-400 to-purple-500"></div>
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/50">
                    <div className={`text-2xl font-bold bg-gradient-to-r ${index % 2 === 0 ? 'from-pink-500 to-purple-600' : 'from-purple-500 to-blue-600'} bg-clip-text text-transparent mb-2`}>
                      {milestone.year}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white/50 backdrop-blur-sm py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
              Học viên nói gì về chúng tôi
            </h2>
            <p className="text-xl text-gray-600">Những chia sẻ chân thật từ học viên đã thành công</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-white/50">
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <AiOutlineStar key={i} className="text-yellow-400 text-lg" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>

                {/* Result */}
                <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-3 mb-4 border border-green-200">
                  <p className="text-sm font-medium text-green-700">✅ {testimonial.result}</p>
                </div>

                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center mr-3">
                    <AiOutlineUser className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About