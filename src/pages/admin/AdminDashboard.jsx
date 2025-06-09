const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Bảng điều khiển Admin
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Tổng học viên</h3>
          <p className="text-3xl font-bold text-teal-600">150</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Khóa học</h3>
          <p className="text-3xl font-bold text-cyan-600">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Bài viết</h3>
          <p className="text-3xl font-bold text-blue-600">24</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard