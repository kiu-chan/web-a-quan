import { useState } from 'react'
import { useCollection, useFirestore } from '../../hooks/useFirestore'
import { useAuth } from '../../contexts/AuthContext'
import { 
  FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiEye, 
  FiCalendar, FiUser, FiTag, FiImage 
} from 'react-icons/fi'

const AdminPosts = () => {
  const { currentUser } = useAuth()
  const { documents: posts, loading } = useCollection('blog')
  const { addDocument, updateDocument, deleteDocument } = useFirestore('blog')
  
  const [showModal, setShowModal] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    thumbnail: '',
    published: false,
    featured: false
  })

  const categories = [
    { value: 'tips', label: 'Mẹo học tiếng Đức' },
    { value: 'b1-b2', label: 'Kinh nghiệm thi B1, B2' },
    { value: 'vocabulary', label: 'Từ vựng theo chủ đề' },
    { value: 'culture', label: 'Văn hóa Đức' },
    { value: 'success', label: 'Câu chuyện thành công' },
    { value: 'grammar', label: 'Ngữ pháp' },
    { value: 'pronunciation', label: 'Phát âm' },
    { value: 'study-abroad', label: 'Du học Đức' }
  ]

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: '',
      thumbnail: '',
      published: false,
      featured: false
    })
    setEditingPost(null)
  }

  const openModal = (post = null) => {
    if (post) {
      setEditingPost(post)
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        tags: post.tags?.join(', ') || '',
        thumbnail: post.thumbnail || '',
        published: post.published !== false,
        featured: post.featured || false
      })
    } else {
      resetForm()
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    resetForm()
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const postData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      author: currentUser?.displayName || currentUser?.email || 'Admin',
      authorId: currentUser?.uid,
      updatedAt: new Date()
    }

    // Tính toán readTime dựa trên content
    const wordsPerMinute = 200
    const wordCount = formData.content.split(' ').length
    postData.readTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute))

    // Tạo slug từ title
    postData.slug = formData.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')

    if (!editingPost) {
      postData.createdAt = new Date()
      postData.views = 0
      postData.likes = 0
      postData.comments = 0
    }

    try {
      if (editingPost) {
        await updateDocument(editingPost.id, postData)
      } else {
        await addDocument(postData)
      }
      closeModal()
    } catch (error) {
      console.error('Lỗi lưu bài viết:', error)
      alert('Có lỗi xảy ra khi lưu bài viết')
    }
  }

  const handleDelete = async (postId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      try {
        await deleteDocument(postId)
      } catch (error) {
        console.error('Lỗi xóa bài viết:', error)
        alert('Có lỗi xảy ra khi xóa bài viết')
      }
    }
  }

  const getCategoryName = (categoryValue) => {
    return categories.find(cat => cat.value === categoryValue)?.label || categoryValue
  }

  const formatDate = (date) => {
    if (!date) return ''
    const d = date.toDate ? date.toDate() : new Date(date)
    return d.toLocaleDateString('vi-VN')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Đang tải...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Quản lý bài viết</h2>
          <p className="text-sm text-gray-600 mt-1">
            Tổng cộng {posts.length} bài viết - {posts.filter(p => p.published).length} đã xuất bản
          </p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Viết bài mới
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tác giả</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thống kê</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900 line-clamp-1">{post.title}</div>
                      {post.featured && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                          Nổi bật
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getCategoryName(post.category)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{post.author}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(post.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {post.published ? 'Công khai' : 'Nháp'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center">
                      <FiEye className="w-4 h-4 mr-1" />
                      {post.views || 0}
                    </span>
                    <span>{post.readTime || 1} phút đọc</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => openModal(post)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:text-red-900 p-1"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Cards */}
      <div className="lg:hidden space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 mr-2">
                <h3 className="text-base font-medium text-gray-900 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{getCategoryName(post.category)}</p>
              </div>
              <div className="flex flex-col gap-1">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                  post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {post.published ? 'Công khai' : 'Nháp'}
                </span>
                {post.featured && (
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Nổi bật
                  </span>
                )}
              </div>
            </div>
            
            <div className="text-sm text-gray-600 mb-4 space-y-1">
              <p>Tác giả: <span className="font-medium">{post.author}</span></p>
              <p>Ngày tạo: <span className="font-medium">{formatDate(post.createdAt)}</span></p>
              <div className="flex items-center space-x-3">
                <span className="flex items-center">
                  <FiEye className="w-4 h-4 mr-1" />
                  {post.views || 0} lượt xem
                </span>
                <span>{post.readTime || 1} phút đọc</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => openModal(post)}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <FiEdit2 className="w-4 h-4 mr-1" />
                Sửa
              </button>
              <button 
                onClick={() => handleDelete(post.id)}
                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm hover:bg-red-50 transition-colors"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-xl text-gray-600 mb-4">Chưa có bài viết nào</div>
          <button 
            onClick={() => openModal()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Viết bài đầu tiên
          </button>
        </div>
      )}

      {/* Modal thêm/sửa bài viết */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  {editingPost ? 'Chỉnh sửa bài viết' : 'Viết bài mới'}
                </h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tiêu đề bài viết *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nhập tiêu đề bài viết..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Danh mục *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Chọn danh mục</option>
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tags (phân cách bằng dấu phẩy)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="mẹo học, ngữ pháp, từ vựng"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mô tả ngắn *
                    </label>
                    <textarea
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Mô tả ngắn gọn về nội dung bài viết..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nội dung bài viết *
                    </label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      required
                      rows="12"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Viết nội dung bài viết ở đây..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ảnh thumbnail (URL)
                    </label>
                    <input
                      type="url"
                      name="thumbnail"
                      value={formData.thumbnail}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="md:col-span-2 flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="published"
                        checked={formData.published}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label className="text-sm text-gray-700">Xuất bản bài viết</label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label className="text-sm text-gray-700">Bài viết nổi bật</label>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 order-2 sm:order-1"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center order-1 sm:order-2"
                  >
                    <FiSave className="w-4 h-4 mr-2" />
                    {editingPost ? 'Cập nhật' : 'Lưu bài viết'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPosts