import { useState } from 'react'
import { useCollection, useFirestore } from '../../hooks/useFirestore'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave } from 'react-icons/fi'

const AdminCourses = () => {
  const { documents: courses, loading } = useCollection('courses')
  const { addDocument, updateDocument, deleteDocument } = useFirestore('courses')
  
  const [showModal, setShowModal] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [formData, setFormData] = useState({
    level: '',
    title: '',
    description: '',
    duration: '',
    lessons: '',
    price: '',
    features: [''],
    color: 'from-pink-400 to-purple-500',
    active: true
  })

  const colorOptions = [
    { value: 'from-pink-400 to-purple-500', label: 'Pink to Purple' },
    { value: 'from-purple-400 to-blue-500', label: 'Purple to Blue' },
    { value: 'from-blue-400 to-indigo-500', label: 'Blue to Indigo' },
    { value: 'from-indigo-400 to-purple-500', label: 'Indigo to Purple' },
    { value: 'from-green-400 to-blue-500', label: 'Green to Blue' },
    { value: 'from-orange-400 to-red-500', label: 'Orange to Red' }
  ]

  const resetForm = () => {
    setFormData({
      level: '',
      title: '',
      description: '',
      duration: '',
      lessons: '',
      price: '',
      features: [''],
      color: 'from-pink-400 to-purple-500',
      active: true
    })
    setEditingCourse(null)
  }

  const openModal = (course = null) => {
    if (course) {
      setEditingCourse(course)
      setFormData({
        level: course.level,
        title: course.title,
        description: course.description,
        duration: course.duration,
        lessons: course.lessons,
        price: course.price.toString(),
        features: course.features || [''],
        color: course.color || 'from-pink-400 to-purple-500',
        active: course.active !== false
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

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData(prev => ({ ...prev, features: newFeatures }))
  }

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }))
  }

  const removeFeature = (index) => {
    if (formData.features.length > 1) {
      const newFeatures = formData.features.filter((_, i) => i !== index)
      setFormData(prev => ({ ...prev, features: newFeatures }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const courseData = {
      ...formData,
      price: parseInt(formData.price),
      features: formData.features.filter(feature => feature.trim() !== ''),
      updatedAt: new Date()
    }

    if (!editingCourse) {
      courseData.createdAt = new Date()
    }

    try {
      if (editingCourse) {
        await updateDocument(editingCourse.id, courseData)
      } else {
        await addDocument(courseData)
      }
      closeModal()
    } catch (error) {
      console.error('Lỗi lưu khóa học:', error)
      alert('Có lỗi xảy ra khi lưu khóa học')
    }
  }

  const handleDelete = async (courseId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khóa học này?')) {
      try {
        await deleteDocument(courseId)
      } catch (error) {
        console.error('Lỗi xóa khóa học:', error)
        alert('Có lỗi xảy ra khi xóa khóa học')
      }
    }
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
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Quản lý khóa học</h2>
        <button 
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Thêm khóa học
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md p-4 lg:p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1 mr-2">
                <h3 className="text-base lg:text-lg font-semibold text-gray-800">{course.title}</h3>
                <span className="text-sm text-gray-500">Cấp độ {course.level}</span>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                course.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {course.active ? 'Đang mở' : 'Đã đóng'}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600">
                Thời gian: <span className="font-medium">{course.duration}</span>
              </p>
              <p className="text-sm text-gray-600">
                Số buổi: <span className="font-medium">{course.lessons}</span>
              </p>
              <p className="text-sm text-gray-600">
                Giá: <span className="font-medium text-green-600">{course.price?.toLocaleString()}đ</span>
              </p>
            </div>
            
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <button 
                onClick={() => openModal(course)}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <FiEdit2 className="w-4 h-4 mr-1" />
                Chỉnh sửa
              </button>
              <button 
                onClick={() => handleDelete(course.id)}
                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm hover:bg-red-50 transition-colors flex items-center justify-center sm:w-auto"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-xl text-gray-600 mb-4">Chưa có khóa học nào</div>
          <button 
            onClick={() => openModal()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Thêm khóa học đầu tiên
          </button>
        </div>
      )}

      {/* Modal thêm/sửa khóa học */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 lg:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg lg:text-xl font-bold text-gray-800">
                  {editingCourse ? 'Chỉnh sửa khóa học' : 'Thêm khóa học mới'}
                </h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cấp độ *
                    </label>
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Chọn cấp độ</option>
                      <option value="A1">A1</option>
                      <option value="A2">A2</option>
                      <option value="B1">B1</option>
                      <option value="B2">B2</option>
                      <option value="C1">C1</option>
                      <option value="C2">C2</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Giá (VNĐ) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="2500000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên khóa học *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tiếng Đức cơ bản A1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Mô tả ngắn gọn về khóa học..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Thời gian *
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="3-4 tháng"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số buổi học *
                    </label>
                    <input
                      type="text"
                      name="lessons"
                      value={formData.lessons}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="12 buổi học"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Màu hiển thị
                  </label>
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {colorOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nội dung khóa học *
                  </label>
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nội dung học..."
                      />
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    + Thêm nội dung
                  </button>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label className="text-sm text-gray-700">
                    Kích hoạt khóa học
                  </label>
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
                    {editingCourse ? 'Cập nhật' : 'Thêm khóa học'}
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

export default AdminCourses