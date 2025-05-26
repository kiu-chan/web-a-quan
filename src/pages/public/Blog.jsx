import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  AiOutlineCalendar, 
  AiOutlineUser, 
  AiOutlineEye, 
  AiOutlineHeart, 
  AiOutlineComment,
  AiOutlineSearch,
  AiOutlineBook,
  AiOutlinePlayCircle,
  AiOutlineFileText,
  AiOutlineTags
} from 'react-icons/ai'

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', name: 'Tất cả', count: 24 },
    { id: 'tips', name: 'Meo học tiếng Đức', count: 8 },
    { id: 'b1-b2', name: 'Kinh nghiệm thi B1, B2', count: 6 },
    { id: 'vocabulary', name: 'Từ vựng theo chủ đề', count: 5 },
    { id: 'culture', name: 'Văn hóa Đức', count: 3 },
    { id: 'success', name: 'Câu chuyện thành công', count: 2 }
  ]

  const blogPosts = [
    {
      id: 1,
      title: '10 Mẹo học tiếng Đức hiệu quả cho người mới bắt đầu',
      excerpt: 'Khám phá những phương pháp học tiếng Đức đã được chứng minh hiệu quả, giúp bạn tiến bộ nhanh chóng từ những ngày đầu.',
      category: 'tips',
      categoryName: 'Mẹo học tiếng Đức',
      author: 'Giảng viên Hương',
      date: '2025-01-15',
      readTime: '5 phút đọc',
      views: 1205,
      likes: 89,
      comments: 12,
      thumbnail: 'tips-learning',
      featured: true,
      tags: ['mẹo học', 'người mới', 'hiệu quả']
    },
    {
      id: 2,
      title: 'Cách chuẩn bị thi B1 tiếng Đức - Kinh nghiệm từ học viên đạt 95 điểm',
      excerpt: 'Chia sẻ chi tiết về quá trình ôn thi B1, từ việc lựa chọn tài liệu đến chiến lược làm bài trong ngày thi.',
      category: 'b1-b2',
      categoryName: 'Kinh nghiệm thi B1, B2',
      author: 'Học viên Mai Anh',
      date: '2025-01-12',
      readTime: '8 phút đọc',
      views: 892,
      likes: 67,
      comments: 23,
      thumbnail: 'b1-exam',
      featured: true,
      tags: ['thi B1', 'kinh nghiệm', 'chiến lược']
    },
    {
      id: 3,
      title: 'Từ vựng tiếng Đức về chủ đề Du lịch - 50 từ quan trọng nhất',
      excerpt: 'Tổng hợp các từ vựng thiết yếu khi du lịch Đức, từ đặt phòng khách sạn đến hỏi đường và mua sắm.',
      category: 'vocabulary',
      categoryName: 'Từ vựng theo chủ đề',
      author: 'Giảng viên Hương',
      date: '2025-01-10',
      readTime: '6 phút đọc',
      views: 756,
      likes: 54,
      comments: 8,
      thumbnail: 'vocabulary-travel',
      featured: false,
      tags: ['từ vựng', 'du lịch', 'thực hành']
    },
    {
      id: 4,
      title: 'Văn hóa làm việc tại Đức - Những điều cần biết',
      excerpt: 'Hiểu rõ văn hóa doanh nghiệp Đức để chuẩn bị tốt nhất cho cơ hội làm việc tại đây.',
      category: 'culture',
      categoryName: 'Văn hóa Đức',
      author: 'Chuyên gia Thomas',
      date: '2025-01-08',
      readTime: '7 phút đọc',
      views: 654,
      likes: 43,
      comments: 15,
      thumbnail: 'german-culture',
      featured: false,
      tags: ['văn hóa', 'làm việc', 'germany']
    },
    {
      id: 5,
      title: 'Từ A1 lên B2 trong 18 tháng - Câu chuyện của học viên Minh',
      excerpt: 'Hành trình học tiếng Đức đầy cảm hứng của một kỹ sư IT, từ không biết gì đến đạt B2 và nhận được visa làm việc.',
      category: 'success',
      categoryName: 'Câu chuyện thành công',
      author: 'Học viên Minh',
      date: '2025-01-05',
      readTime: '10 phút đọc',
      views: 1123,
      likes: 98,
      comments: 31,
      thumbnail: 'success-story',
      featured: true,
      tags: ['thành công', 'động lực', 'visa']
    },
    {
      id: 6,
      title: 'Lỗi ngữ pháp phổ biến người Việt thường mắc khi học tiếng Đức',
      excerpt: 'Phân tích những lỗi sai thường gặp và cách khắc phục hiệu quả để cải thiện khả năng giao tiếp.',
      category: 'tips',
      categoryName: 'Mẹo học tiếng Đức',
      author: 'Giảng viên Hương',
      date: '2025-01-03',
      readTime: '6 phút đọc',
      views: 567,
      likes: 41,
      comments: 9,
      thumbnail: 'grammar-mistakes',
      featured: false,
      tags: ['ngữ pháp', 'lỗi sai', 'cải thiện']
    }
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
          Blog / Kiến thức
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Tạo nội dung SEO & giúp học viên với các mẹo học tiếng Đức, kinh nghiệm thi B1, B2, từ vựng theo chủ đề, chia sẻ văn hóa Đức
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <AiOutlineSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors text-lg"
          />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Posts */}
            {selectedCategory === 'all' && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
                  Bài viết nổi bật
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredPosts.slice(0, 2).map((post) => (
                    <article key={post.id} className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/50 group">
                      {/* Thumbnail */}
                      <div className="h-48 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center relative overflow-hidden">
                        <span className="text-purple-600 font-medium">{post.thumbnail}</span>
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <AiOutlineEye className="text-white text-2xl" />
                        </div>
                      </div>

                      <div className="p-6">
                        {/* Category */}
                        <span className="inline-block bg-gradient-to-r from-pink-100 to-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium mb-3 border border-purple-200">
                          {post.categoryName}
                        </span>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <AiOutlineUser className="mr-1" />
                              {post.author}
                            </span>
                            <span className="flex items-center">
                              <AiOutlineCalendar className="mr-1" />
                              {new Date(post.date).toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                          <span>{post.readTime}</span>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <AiOutlineEye className="mr-1" />
                              {post.views}
                            </span>
                            <span className="flex items-center">
                              <AiOutlineHeart className="mr-1" />
                              {post.likes}
                            </span>
                            <span className="flex items-center">
                              <AiOutlineComment className="mr-1" />
                              {post.comments}
                            </span>
                          </div>
                          <button className="text-purple-600 hover:text-purple-700 font-medium">
                            Đọc tiếp →
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* All Posts */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedCategory === 'all' ? 'Tất cả bài viết' : categories.find(cat => cat.id === selectedCategory)?.name}
                </h2>
                <span className="text-gray-500">
                  {filteredPosts.length} bài viết
                </span>
              </div>

              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="bg-white/60 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-white/50 group">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
                      {/* Thumbnail */}
                      <div className="h-40 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                        <span className="text-purple-600 font-medium text-sm">{post.thumbnail}</span>
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <AiOutlineEye className="text-white text-xl" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="md:col-span-3">
                        {/* Category */}
                        <span className="inline-block bg-gradient-to-r from-pink-100 to-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium mb-3 border border-purple-200">
                          {post.categoryName}
                        </span>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-600 mb-4">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <AiOutlineUser className="mr-1" />
                              {post.author}
                            </span>
                            <span className="flex items-center">
                              <AiOutlineCalendar className="mr-1" />
                              {new Date(post.date).toLocaleDateString('vi-VN')}
                            </span>
                            <span>{post.readTime}</span>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <AiOutlineEye className="mr-1" />
                              {post.views}
                            </span>
                            <span className="flex items-center">
                              <AiOutlineHeart className="mr-1" />
                              {post.likes}
                            </span>
                            <span className="flex items-center">
                              <AiOutlineComment className="mr-1" />
                              {post.comments}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <button className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                  Xem thêm bài viết
                </button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Categories */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/50">
              <h3 className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
                Danh mục
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-purple-600 border border-purple-200'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-sm">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Posts */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/50">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                <AiOutlineFileText className="inline mr-2" />
                Bài viết phổ biến
              </h3>
              <div className="space-y-4">
                {blogPosts.slice(0, 4).map((post) => (
                  <div key={post.id} className="flex space-x-3 group cursor-pointer">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <AiOutlineBook className="text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                        <span>{post.views} lượt xem</span>
                        <span>•</span>
                        <span>{new Date(post.date).toLocaleDateString('vi-VN')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-200">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                📧 Đăng ký nhận bài viết mới
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Nhận thông báo khi có bài viết mới về học tiếng Đức
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
                <button className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white py-2 rounded-lg font-medium text-sm hover:from-pink-500 hover:to-purple-600 transition-all duration-300">
                  Đăng ký ngay
                </button>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 rounded-xl p-6 text-white text-center">
              <h3 className="text-lg font-bold mb-2">Cần hỗ trợ?</h3>
              <p className="text-sm opacity-90 mb-4">
                Liên hệ với chúng tôi để được tư vấn miễn phí
              </p>
              <Link
                to="/contact"
                className="inline-block bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Liên hệ ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog