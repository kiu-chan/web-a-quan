const Settings = () => {
  return (
    <div>
      <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">Cài đặt hệ thống</h2>
      <div className="space-y-4 lg:space-y-6">
        <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
          <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-4">Cài đặt chung</h3>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex-1">
                <p className="font-medium text-gray-900">Cho phép đăng ký mới</p>
                <p className="text-sm text-gray-600">Cho phép người dùng mới đăng ký tài khoản</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 self-start sm:self-center">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex-1">
                <p className="font-medium text-gray-900">Email thông báo</p>
                <p className="text-sm text-gray-600">Gửi email thông báo cho admin</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 self-start sm:self-center">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
          <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-4">Bảo mật</h3>
          <div className="space-y-3 lg:space-y-4">
            <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Quản lý phiên đăng nhập
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings