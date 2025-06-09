// contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth'
import { auth } from '../../firebase'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth phải được sử dụng trong AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Đăng ký tài khoản mới
  const signup = async (email, password, displayName = '') => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      if (displayName) {
        await updateProfile(result.user, { displayName })
      }
      return result
    } catch (error) {
      throw error
    }
  }

  // Đăng nhập
  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Đăng xuất
  const logout = () => {
    return signOut(auth)
  }

  // Đặt lại mật khẩu
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  // Cập nhật thông tin người dùng
  const updateUserProfile = (updates) => {
    return updateProfile(auth.currentUser, updates)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    signin,
    logout,
    resetPassword,
    updateUserProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}