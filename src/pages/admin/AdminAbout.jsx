import { useState } from 'react'
import { useCollection, useDocument, useFirestore } from '../../hooks/useFirestore'
import { 
  FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiUsers, FiAward, 
  FiHeart, FiBook, FiStar, FiCheckCircle, FiTarget, FiFlag 
} from 'react-icons/fi'

const AdminAbout = () => {
  // Firebase hooks
  const { document: aboutInfo } = useDocument('about', 'info')
  const { document: statsInfo } = useDocument('stats', 'general')
  const { documents: teamMembers } = useCollection('team')
  const { documents: values } = useCollection('values')
  const { documents: milestones } = useCollection('milestones')
  const { documents: testimonials } = useCollection('testimonials')

  const { updateDocument: updateAbout } = useFirestore('about')
  const { updateDocument: updateStats } = useFirestore('stats')
  const { addDocument: addTeam, updateDocument: updateTeam, deleteDocument: deleteTeam } = useFirestore('team')
  const { addDocument: addValue, updateDocument: updateValue, deleteDocument: deleteValue } = useFirestore('values')
  const { addDocument: addMilestone, updateDocument: updateMilestone, deleteDocument: deleteMilestone } = useFirestore('milestones')
  const { addDocument: addTestimonial, updateDocument: updateTestimonial, deleteDocument: deleteTestimonial } = useFirestore('testimonials')

  // State management
  const [activeTab, setActiveTab] = useState('about')
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({})

  const tabs = [
    { id: 'about', label: 'Thông tin chung', icon: FiFlag },
    { id: 'stats', label: 'Thống kê', icon: FiTarget },
    { id: 'team', label: 'Đội ngũ', icon: FiUsers },
    { id: 'values', label: 'Giá trị', icon: FiHeart },
    { id: 'milestones', label: 'Cột mốc', icon: FiAward },
    { id: 'testimonials', label: 'Đánh giá', icon: FiStar }
  ]

  const iconOptions = [
    { value: 'heart', label: '❤️ Trái tim', component: FiHeart },
    { value: 'book', label: '📚 Sách', component: FiBook },
    { value: 'star', label: '⭐ Ngôi sao', component: FiStar },
    { value: 'check', label: '✅ Tích', component: FiCheckCircle },
    { value: 'user', label: '👤 Người dùng', component: FiUsers },
    { value: 'award', label: '🏆 Giải thưởng', component: FiAward }
  ]

  const colorOptions = [
    { value: 'from-pink-400 to-red-400', label: 'Hồng đến Đỏ' },
    { value: 'from-blue-400 to-purple-500', label: 'Xanh đến Tím' },
    { value: 'from-purple-400 to-indigo-500', label: 'Tím đến Indigo' },
    { value: 'from-indigo-400 to-blue-500', label: 'Indigo đến Xanh' },
    { value: 'from-green-400 to-blue-500', label: 'Xanh lá đến Xanh' },
    { value: 'from-orange-400 to-red-500', label: 'Cam đến Đỏ' }
  ]

  // Form handlers
  const openModal = (type, item = null) => {
    setModalType(type)
    setEditingItem(item)
    
    if (type === 'about') {
      setFormData({
        mission: aboutInfo?.mission || '',
        vision: aboutInfo?.vision || '',
        method: aboutInfo?.method || '',
        description: aboutInfo?.description || '',
        commitment: aboutInfo?.commitment || ''
      })
    } else if (type === 'stats') {
      setFormData({
        yearsActive: statsInfo?.yearsActive || '',
        totalStudents: statsInfo?.totalStudents || '',
        successRate: statsInfo?.successRate || '',
        averageRating: statsInfo?.averageRating || ''
      })
    } else if (type === 'team') {
      setFormData(item ? {
        name: item.name,
        role: item.role,
        experience: item.experience,
        education: item.education || '',
        certifications: item.certifications?.join(', ') || '',
        specialties: item.specialties?.join(', ') || '',
        achievements: item.achievements || '',
        avatar: item.avatar || '',
        color: item.color || 'from-pink-400 to-purple-500',
        order: item.order || 1,
        active: item.active !== false
      } : {
        name: '', role: '', experience: '', education: '', certifications: '',
        specialties: '', achievements: '', avatar: '', 
        color: 'from-pink-400 to-purple-500', order: 1, active: true
      })
    } else if (type === 'value') {
      setFormData(item ? {
        title: item.title,
        description: item.description,
        icon: item.icon || 'heart',
        color: item.color || 'from-pink-400 to-red-400',
        order: item.order || 1
      } : {
        title: '', description: '', icon: 'heart',
        color: 'from-pink-400 to-red-400', order: 1
      })
    } else if (type === 'milestone') {
      setFormData(item ? {
        year: item.year,
        title: item.title,
        description: item.description,
        order: item.order || 1
      } : {
        year: '', title: '', description: '', order: 1
      })
    } else if (type === 'testimonial') {
      setFormData(item ? {
        name: item.name,
        role: item.role,
        content: item.content,
        rating: item.rating || 5,
        result: item.result || '',
        avatar: item.avatar || '',
        featured: item.featured !== false,
        order: item.order || 1
      } : {
        name: '', role: '', content: '', rating: 5, result: '', avatar: '',
        featured: true, order: 1
      })
    }
    
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setModalType('')
    setEditingItem(null)
    setFormData({})
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (modalType === 'about') {
        await updateAbout('info', { ...formData, updatedAt: new Date() })
      } else if (modalType === 'stats') {
        await updateStats('general', { ...formData, updatedAt: new Date() })
      } else if (modalType === 'team') {
        const teamData = {
          ...formData,
          certifications: formData.certifications.split(',').map(c => c.trim()).filter(c => c),
          specialties: formData.specialties.split(',').map(s => s.trim()).filter(s => s),
          updatedAt: new Date()
        }
        if (editingItem) {
          await updateTeam(editingItem.id, teamData)
        } else {
          await addTeam({ ...teamData, createdAt: new Date() })
        }
      } else if (modalType === 'value') {
        const valueData = { ...formData, updatedAt: new Date() }
        if (editingItem) {
          await updateValue(editingItem.id, valueData)
        } else {
          await addValue({ ...valueData, createdAt: new Date() })
        }
      } else if (modalType === 'milestone') {
        const milestoneData = { ...formData, updatedAt: new Date() }
        if (editingItem) {
          await updateMilestone(editingItem.id, milestoneData)
        } else {
          await addMilestone({ ...milestoneData, createdAt: new Date() })
        }
      } else if (modalType === 'testimonial') {
        const testimonialData = { ...formData, updatedAt: new Date() }
        if (editingItem) {
          await updateTestimonial(editingItem.id, testimonialData)
        } else {
          await addTestimonial({ ...testimonialData, createdAt: new Date() })
        }
      }
      closeModal()
    } catch (error) {
      console.error('Lỗi lưu dữ liệu:', error)
      alert('Có lỗi xảy ra khi lưu dữ liệu')
    }
  }

  const handleDelete = async (type, id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa?')) return
    
    try {
      if (type === 'team') await deleteTeam(id)
      else if (type === 'value') await deleteValue(id)
      else if (type === 'milestone') await deleteMilestone(id)
      else if (type === 'testimonial') await deleteTestimonial(id)
    } catch (error) {
      console.error('Lỗi xóa:', error)
      alert('Có lỗi xảy ra khi xóa')
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Thông tin chung về công ty</h3>
              <button
                onClick={() => openModal('about')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <FiEdit2 className="w-4 h-4 mr-2" />
                Chỉnh sửa
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-gray-800 mb-2">Sứ mệnh</h4>
                <p className="text-gray-600">{aboutInfo?.mission || 'Chưa có thông tin'}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-gray-800 mb-2">Tầm nhìn</h4>
                <p className="text-gray-600">{aboutInfo?.vision || 'Chưa có thông tin'}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-gray-800 mb-2">Phương pháp</h4>
                <p className="text-gray-600">{aboutInfo?.method || 'Chưa có thông tin'}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-gray-800 mb-2">Mô tả</h4>
                <p className="text-gray-600">{aboutInfo?.description || 'Chưa có thông tin'}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-gray-800 mb-2">Cam kết</h4>
                <p className="text-gray-600">{aboutInfo?.commitment || 'Chưa có thông tin'}</p>
              </div>
            </div>
          </div>
        )

      case 'stats':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Thống kê hiển thị</h3>
              <button
                onClick={() => openModal('stats')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <FiEdit2 className="w-4 h-4 mr-2" />
                Chỉnh sửa
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-gray-800 mb-2">Năm hoạt động</h4>
                <p className="text-2xl font-bold text-blue-600">{statsInfo?.yearsActive || '3+'}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-gray-800 mb-2">Tổng học viên</h4>
                <p className="text-2xl font-bold text-green-600">{statsInfo?.totalStudents || '800+'}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-gray-800 mb-2">Tỷ lệ thành công</h4>
                <p className="text-2xl font-bold text-purple-600">{statsInfo?.successRate || '95%'}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-gray-800 mb-2">Đánh giá trung bình</h4>
                <p className="text-2xl font-bold text-yellow-600">{statsInfo?.averageRating || '4.9/5'}</p>
              </div>
            </div>
          </div>
        )

      case 'team':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Đội ngũ giảng viên</h3>
              <button
                onClick={() => openModal('team')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <FiPlus className="w-4 h-4 mr-2" />
                Thêm thành viên
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.sort((a, b) => (a.order || 0) - (b.order || 0)).map((member) => (
                <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className={`h-32 bg-gradient-to-r ${member.color || 'from-pink-400 to-purple-500'} flex items-center justify-center`}>
                    <span className="text-white font-medium">{member.avatar}</span>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-800">{member.name}</h4>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        member.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {member.active ? 'Hoạt động' : 'Ẩn'}
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-500 mb-3">{member.experience}</p>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal('team', member)}
                        className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700"
                      >
                        <FiEdit2 className="w-3 h-3 inline mr-1" />
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete('team', member.id)}
                        className="px-3 py-2 border border-red-300 text-red-600 rounded text-sm hover:bg-red-50"
                      >
                        <FiTrash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'values':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Giá trị cốt lõi</h3>
              <button
                onClick={() => openModal('value')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <FiPlus className="w-4 h-4 mr-2" />
                Thêm giá trị
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.sort((a, b) => (a.order || 0) - (b.order || 0)).map((value) => {
                const IconComponent = iconOptions.find(opt => opt.value === value.icon)?.component || FiHeart
                return (
                  <div key={value.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className={`w-12 h-12 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                      <IconComponent className="text-white" />
                    </div>
                    
                    <h4 className="font-semibold text-gray-800 text-center mb-2">{value.title}</h4>
                    <p className="text-sm text-gray-600 text-center mb-4">{value.description}</p>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal('value', value)}
                        className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700"
                      >
                        <FiEdit2 className="w-3 h-3 inline mr-1" />
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete('value', value.id)}
                        className="px-3 py-2 border border-red-300 text-red-600 rounded text-sm hover:bg-red-50"
                      >
                        <FiTrash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )

      case 'milestones':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Cột mốc phát triển</h3>
              <button
                onClick={() => openModal('milestone')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <FiPlus className="w-4 h-4 mr-2" />
                Thêm cột mốc
              </button>
            </div>
            
            <div className="space-y-4">
              {milestones.sort((a, b) => (a.order || 0) - (b.order || 0)).map((milestone) => (
                <div key={milestone.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-2xl font-bold text-blue-600">{milestone.year}</span>
                        <h4 className="text-lg font-semibold text-gray-800">{milestone.title}</h4>
                      </div>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => openModal('milestone', milestone)}
                        className="bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700"
                      >
                        <FiEdit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDelete('milestone', milestone.id)}
                        className="px-3 py-2 border border-red-300 text-red-600 rounded text-sm hover:bg-red-50"
                      >
                        <FiTrash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'testimonials':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Đánh giá học viên</h3>
              <button
                onClick={() => openModal('testimonial')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <FiPlus className="w-4 h-4 mr-2" />
                Thêm đánh giá
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.sort((a, b) => (a.order || 0) - (b.order || 0)).map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <FiStar key={i} className="text-yellow-400 w-4 h-4" />
                      ))}
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      testimonial.featured ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {testimonial.featured ? 'Nổi bật' : 'Thường'}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-3 italic">"{testimonial.content}"</p>
                  
                  {testimonial.result && (
                    <div className="bg-green-50 p-2 rounded mb-3">
                      <p className="text-xs text-green-700">✅ {testimonial.result}</p>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal('testimonial', testimonial)}
                      className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700"
                    >
                      <FiEdit2 className="w-3 h-3 inline mr-1" />
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete('testimonial', testimonial.id)}
                      className="px-3 py-2 border border-red-300 text-red-600 rounded text-sm hover:bg-red-50"
                    >
                      <FiTrash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const renderModal = () => {
    if (!showModal) return null

    const getModalTitle = () => {
      const action = editingItem ? 'Chỉnh sửa' : 'Thêm'
      switch (modalType) {
        case 'about': return 'Chỉnh sửa thông tin chung'
        case 'stats': return 'Chỉnh sửa thống kê'
        case 'team': return `${action} thành viên`
        case 'value': return `${action} giá trị`
        case 'milestone': return `${action} cột mốc`
        case 'testimonial': return `${action} đánh giá`
        default: return ''
      }
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">{getModalTitle()}</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {modalType === 'about' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sứ mệnh</label>
                    <textarea
                      name="mission"
                      value={formData.mission || ''}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tầm nhìn</label>
                    <textarea
                      name="vision"
                      value={formData.vision || ''}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phương pháp</label>
                    <textarea
                      name="method"
                      value={formData.method || ''}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                    <textarea
                      name="description"
                      value={formData.description || ''}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cam kết</label>
                    <textarea
                      name="commitment"
                      value={formData.commitment || ''}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              {modalType === 'stats' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Năm hoạt động</label>
                    <input
                      type="text"
                      name="yearsActive"
                      value={formData.yearsActive || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="3+"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tổng học viên</label>
                    <input
                      type="text"
                      name="totalStudents"
                      value={formData.totalStudents || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="800+"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tỷ lệ thành công</label>
                    <input
                      type="text"
                      name="successRate"
                      value={formData.successRate || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="95%"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Đánh giá trung bình</label>
                    <input
                      type="text"
                      name="averageRating"
                      value={formData.averageRating || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="4.9/5"
                    />
                  </div>
                </div>
              )}

              {modalType === 'team' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Vị trí *</label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Kinh nghiệm *</label>
                      <input
                        type="text"
                        name="experience"
                        value={formData.experience || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="5+ năm kinh nghiệm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự hiển thị</label>
                      <input
                        type="number"
                        name="order"
                        value={formData.order || 1}
                        onChange={handleInputChange}
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Học vấn</label>
                    <input
                      type="text"
                      name="education"
                      value={formData.education || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Thạc sĩ Ngôn ngữ Đức - ĐH Quốc gia"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Chứng chỉ (phân cách bằng dấu phẩy)</label>
                    <input
                      type="text"
                      name="certifications"
                      value={formData.certifications || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="TestDaF C2, Goethe Institut Certified"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Chuyên môn (phân cách bằng dấu phẩy)</label>
                    <input
                      type="text"
                      name="specialties"
                      value={formData.specialties || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Phương pháp giảng dạy độc đáo, Tâm lý học ngôn ngữ"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Thành tựu</label>
                      <input
                        type="text"
                        name="achievements"
                        value={formData.achievements || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="500+ học viên thành công"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Avatar</label>
                      <input
                        type="text"
                        name="avatar"
                        value={formData.avatar || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="teacher-name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Màu nền</label>
                    <select
                      name="color"
                      value={formData.color || 'from-pink-400 to-purple-500'}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {colorOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="active"
                      checked={formData.active !== false}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label className="text-sm text-gray-700">Hiển thị trên website</label>
                  </div>
                </>
              )}

              {modalType === 'value' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự hiển thị</label>
                      <input
                        type="number"
                        name="order"
                        value={formData.order || 1}
                        onChange={handleInputChange}
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả *</label>
                    <textarea
                      name="description"
                      value={formData.description || ''}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                      <select
                        name="icon"
                        value={formData.icon || 'heart'}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        {iconOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Màu</label>
                      <select
                        name="color"
                        value={formData.color || 'from-pink-400 to-red-400'}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        {colorOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}

              {modalType === 'milestone' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Năm *</label>
                      <input
                        type="text"
                        name="year"
                        value={formData.year || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="2022"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự hiển thị</label>
                      <input
                        type="number"
                        name="order"
                        value={formData.order || 1}
                        onChange={handleInputChange}
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Thành lập trung tâm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả *</label>
                    <textarea
                      name="description"
                      value={formData.description || ''}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Mô tả chi tiết về cột mốc này"
                    />
                  </div>
                </>
              )}

              {modalType === 'testimonial' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nghề nghiệp *</label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Kỹ sư IT"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung đánh giá *</label>
                    <textarea
                      name="content"
                      value={formData.content || ''}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Chia sẻ về trải nghiệm học tại trung tâm..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Số sao</label>
                      <select
                        name="rating"
                        value={formData.rating || 5}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        {[1,2,3,4,5].map(star => (
                          <option key={star} value={star}>{star} sao</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự</label>
                      <input
                        type="number"
                        name="order"
                        value={formData.order || 1}
                        onChange={handleInputChange}
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center pt-6">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured !== false}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label className="text-sm text-gray-700">Nổi bật</label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Kết quả đạt được</label>
                      <input
                        type="text"
                        name="result"
                        value={formData.result || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Đạt B2 sau 18 tháng"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Avatar</label>
                      <input
                        type="text"
                        name="avatar"
                        value={formData.avatar || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="student-name"
                      />
                    </div>
                  </div>
                </>
              )}

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
                  {editingItem ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
          Quản lý trang About
        </h1>
        <p className="text-gray-600">Chỉnh sửa tất cả nội dung hiển thị trên trang "Về chúng tôi"</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Modal */}
      {renderModal()}
    </div>
  )
}

export default AdminAbout