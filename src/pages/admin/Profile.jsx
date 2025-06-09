const Profile = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Thông tin tài khoản</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">A</span>
          </div>
          <div className="ml-6">
            <h3 className="text-xl font-semibold text-gray-900">Admin User</h3>
            <p className="text-gray-600">admin@example.com</p>
            <p className="text-sm text-gray-500">Quản trị viên hệ thống</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
            <input type="text" value="Admin User" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" value="admin@example.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>
        
        <div className="mt-6">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Cập nhật thông tin
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile