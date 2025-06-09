const Profile = () => {
  return (
    <div>
      <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">Thông tin tài khoản</h2>
      <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6 mb-6">
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto sm:mx-0">
            <span className="text-white text-xl lg:text-2xl font-bold">A</span>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900">Admin User</h3>
            <p className="text-gray-600">admin@example.com</p>
            <p className="text-sm text-gray-500">Quản trị viên hệ thống</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
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
          <button className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Cập nhật thông tin
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile