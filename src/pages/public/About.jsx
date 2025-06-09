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
import { useCollection, useDocument } from '../../hooks/useFirestore'

const About = () => {
  // Lấy dữ liệu từ Firebase
  const { document: aboutInfo, loading: aboutLoading } = useDocument('about', 'info')
  const { document: statsInfo, loading: statsLoading } = useDocument('stats', 'general')
  const { documents: teamMembers, loading: teamLoading } = useCollection('team')
  const { documents: values, loading: valuesLoading } = useCollection('values')
  const { documents: milestones, loading: milestonesLoading } = useCollection('milestones')
  const { documents: testimonials, loading: testimonialsLoading } = useCollection('testimonials')

  // Sắp xếp dữ liệu theo order
  const sortedTeam = teamMembers.filter(member => member.active !== false).sort((a, b) => (a.order || 0) - (b.order || 0))
  const sortedValues = values.sort((a, b) => (a.order || 0) - (b.order || 0))
  const sortedMilestones = milestones.sort((a, b) => (a.order || 0) - (b.order || 0))
  const sortedTestimonials = testimonials.filter(t => t.featured).sort((a, b) => (a.order || 0) - (b.order || 0))

  // Default stats nếu chưa có dữ liệu
  const defaultStats = [
    { number: '3+', label: 'Năm hoạt động', icon: AiOutlineGlobal },
    { number: '800+', label: 'Học viên đã học', icon: AiOutlineTeam },
    { number: '95%', label: 'Tỷ lệ thành công', icon: AiOutlineTrophy },
    { number: '4.9/5', label: 'Đánh giá trung bình', icon: AiOutlineStar }
  ]

  const stats = statsInfo ? [
    { number: statsInfo.yearsActive || '3+', label: 'Năm hoạt động', icon: AiOutlineGlobal },
    { number: statsInfo.totalStudents || '800+', label: 'Học viên đã học', icon: AiOutlineTeam },
    { number: statsInfo.successRate || '95%', label: 'Tỷ lệ thành công', icon: AiOutlineTrophy },
    { number: statsInfo.averageRating || '4.9/5', label: 'Đánh giá trung bình', icon: AiOutlineStar }
  ] : defaultStats

  // Icon mapping cho values
  const iconMap = {
    heart: AiOutlineHeart,
    book: AiOutlineBook,
    star: AiOutlineStar,
    check: AiOutlineCheckCircle,
    user: AiOutlineUser,
    team: AiOutlineTeam
  }

  if (aboutLoading || statsLoading || teamLoading || valuesLoading || milestonesLoading || testimonialsLoading) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xl text-gray-600">Đang tải thông tin...</div>
        </div>
      </div>
    )
  }

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
                {aboutInfo?.mission && (
                  <p>
                    <strong>"Học tiếng Đức để hiểu & đúng trong tâm"</strong> - {aboutInfo.mission}
                  </p>
                )}
                {aboutInfo?.description && (
                  <p>{aboutInfo.description}</p>
                )}
                {aboutInfo?.commitment && (
                  <p>{aboutInfo.commitment}</p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {aboutInfo?.vision && (
                <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl p-6 border border-pink-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">🎯 Tầm nhìn 2025</h3>
                  <p className="text-gray-700">{aboutInfo.vision}</p>
                </div>
              )}
              
              {aboutInfo?.method && (
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">💡 Phương pháp độc quyền</h3>
                  <p className="text-gray-700">{aboutInfo.method}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {sortedTeam.length > 0 && (
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
            {sortedTeam.map((member, index) => (
              <div key={member.id} className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/50 group">
                {/* Avatar */}
                <div className={`h-64 bg-gradient-to-br ${member.color || 'from-pink-400 to-purple-500'} flex items-center justify-center relative`}>
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
                  {member.education && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm">🎓 Học vấn:</h4>
                      <p className="text-sm text-gray-700">{member.education}</p>
                    </div>
                  )}

                  {/* Certifications */}
                  {member.certifications && member.certifications.length > 0 && (
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
                  )}

                  {/* Specialties */}
                  {member.specialties && member.specialties.length > 0 && (
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
                  )}

                  {/* Achievement */}
                  {member.achievements && (
                    <div className="pt-4 border-t border-gray-200">
                      <div className={`bg-gradient-to-r ${member.color || 'from-pink-400 to-purple-500'} bg-clip-text text-transparent font-bold text-sm`}>
                        🏆 {member.achievements}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Values */}
      {sortedValues.length > 0 && (
        <section className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 py-16 mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Giá trị cốt lõi</h2>
              <p className="text-xl text-gray-600">Những nguyên tắc định hướng mọi hoạt động của chúng tôi</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sortedValues.map((value, index) => {
                const Icon = iconMap[value.icon] || AiOutlineStar
                return (
                  <div key={value.id} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 border border-white/50">
                    <div className={`w-16 h-16 bg-gradient-to-r ${value.color || 'from-pink-400 to-purple-500'} rounded-full flex items-center justify-center mx-auto mb-4`}>
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
      )}

      {/* Timeline */}
      {sortedMilestones.length > 0 && (
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
              {sortedMilestones.map((milestone, index) => (
                <div key={milestone.id} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
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
      )}

      {/* Testimonials */}
      {sortedTestimonials.length > 0 && (
        <section className="bg-white/50 backdrop-blur-sm py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
                Học viên nói gì về chúng tôi
              </h2>
              <p className="text-xl text-gray-600">Những chia sẻ chân thật từ học viên đã thành công</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedTestimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-white/50">
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <AiOutlineStar key={i} className="text-yellow-400 text-lg" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>

                  {/* Result */}
                  {testimonial.result && (
                    <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-3 mb-4 border border-green-200">
                      <p className="text-sm font-medium text-green-700">✅ {testimonial.result}</p>
                    </div>
                  )}

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
      )}
    </div>
  )
}

export default About