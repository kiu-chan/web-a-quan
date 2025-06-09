const Courses = () => {
  const courses = [
    { id: 1, title: 'React cơ bản', students: 45, price: '2,500,000', status: 'Đang mở' },
    { id: 2, title: 'JavaScript nâng cao', students: 32, price: '3,000,000', status: 'Đang mở' },
    { id: 3, title: 'NodeJS', students: 28, price: '3,500,000', status: 'Sắp mở' },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý khóa học</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
          <FiPlus className="w-4 h-4 mr-2" />
          Thêm khóa học
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                course.status === 'Đang mở' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {course.status}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600">Học viên: <span className="font-medium">{course.students}</span></p>
              <p className="text-sm text-gray-600">Giá: <span className="font-medium text-green-600">{course.price}đ</span></p>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                Chỉnh sửa
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Courses