import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  // Logic kiểm tra authentication sẽ thêm sau
  const isAuthenticated = false // Tạm thời set false

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute