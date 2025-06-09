import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'

const Posts = () => {
  const posts = [
    { id: 1, title: 'Cách học React hiệu quả', author: 'Admin', date: '2024-01-15', status: 'Công khai' },
    { id: 2, title: 'JavaScript Tips & Tricks', author: 'Admin', date: '2024-01-10', status: 'Nháp' },
    { id: 3, title: 'Tương lai của Web Development', author: 'Admin', date: '2024-01-05', status: 'Công khai' },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý bài viết</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
          <FiPlus className="w-4 h-4 mr-2" />
          Viết bài mới
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tác giả</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{post.author}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{post.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    post.status === 'Công khai' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <FiEdit2 className="w-4 h-4" />
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

export default Posts