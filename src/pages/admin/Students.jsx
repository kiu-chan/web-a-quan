import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiMail } from 'react-icons/fi'

const Students = () => {
  const students = [
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', course: 'React cơ bản', status: 'Đang học' },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@email.com', course: 'JavaScript nâng cao', status: 'Hoàn thành' },
    { id: 3, name: 'Lê Văn C', email: 'levanc@email.com', course: 'NodeJS', status: 'Đang học' },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý học viên</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
          <FiPlus className="w-4 h-4 mr-2" />
          Thêm học viên
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm học viên..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">Tất cả trạng thái</option>
            <option value="active">Đang học</option>
            <option value="completed">Hoàn thành</option>
            <option value="inactive">Tạm dừng</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Học viên</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khóa học</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    <div className="text-sm text-gray-500">{student.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.course}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    student.status === 'Đang học' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <FiMail className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Students