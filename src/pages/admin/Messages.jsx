import { FiMail } from 'react-icons/fi'

const Messages = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tin nhắn</h2>
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <FiMail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Chức năng tin nhắn</h3>
        <p className="text-gray-500">Tính năng này sẽ được phát triển trong phiên bản tiếp theo</p>
      </div>
    </div>
  )
}

export default Messages