import { Link } from 'react-router-dom'

const PrivateLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Private layout sẽ được thiết kế sau */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md">
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default PrivateLayout