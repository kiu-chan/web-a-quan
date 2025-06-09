const Analytics = () => {
  return (
    <div>
      <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">Thống kê</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Doanh thu tháng này</h3>
          <p className="text-xl lg:text-2xl font-bold text-green-600">45,250,000đ</p>
          <p className="text-sm text-green-500 mt-1">+12% so với tháng trước</p>
        </div>
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Học viên mới</h3>
          <p className="text-xl lg:text-2xl font-bold text-blue-600">28</p>
          <p className="text-sm text-blue-500 mt-1">+8% so với tháng trước</p>
        </div>
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Tỷ lệ hoàn thành</h3>
          <p className="text-xl lg:text-2xl font-bold text-purple-600">87%</p>
          <p className="text-sm text-purple-500 mt-1">+3% so với tháng trước</p>
        </div>
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md sm:col-span-2 xl:col-span-1">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Đánh giá trung bình</h3>
          <p className="text-xl lg:text-2xl font-bold text-yellow-600">4.8/5</p>
          <p className="text-sm text-yellow-500 mt-1">Từ 156 đánh giá</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
        <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-4">Biểu đồ sẽ được thêm vào sau</h3>
        <div className="h-48 lg:h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 text-sm lg:text-base">Biểu đồ thống kê</p>
        </div>
      </div>
    </div>
  )
}

export default Analytics