// contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'

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

  // Google Auth Provider
  const googleProvider = new GoogleAuthProvider()
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  })

  // Tạo user document trong Firestore
  const createUserDocument = async (user, additionalData = {}) => {
    if (!user) return
    
    const userRef = doc(db, 'users', user.uid)
    const userDoc = await getDoc(userRef)
    
    if (!userDoc.exists()) {
      const { displayName, email, photoURL } = user
      const createdAt = new Date()
      
      const userData = {
        displayName: displayName || '',
        email,
        photoURL: photoURL || '',
        role: 'user', // Mặc định là user, admin sẽ set thủ công
        createdAt,
        updatedAt: createdAt,
        ...additionalData
      }
      
      try {
        await setDoc(userRef, userData)
        console.log('Created user document:', userData)
        return userData
      } catch (error) {
        console.error('Lỗi tạo user document:', error)
        return { role: 'user' }
      }
    }
    
    return userDoc.data()
  }

  // Đăng ký tài khoản mới
  const signup = async (email, password, displayName = '') => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      if (displayName) {
        await updateProfile(result.user, { displayName })
      }
      
      // Tạo user document trong Firestore
      await createUserDocument(result.user, { displayName })
      
      return result
    } catch (error) {
      throw error
    }
  }

  // Đăng nhập
  const signin = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      
      // Tạo user document nếu chưa có (cho trường hợp user cũ)
      await createUserDocument(result.user)
      
      return result
    } catch (error) {
      throw error
    }
  }

  // Đăng nhập với Google
  const signinWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      
      // Tạo user document trong Firestore
      await createUserDocument(result.user)
      
      return result
    } catch (error) {
      throw error
    }
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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user?.email)
      
      if (user) {
        try {
          // Lấy thông tin user từ Firestore
          const userRef = doc(db, 'users', user.uid)
          const userDoc = await getDoc(userRef)
          
          let userData
          if (userDoc.exists()) {
            userData = userDoc.data()
            console.log('User data from Firestore:', userData)
          } else {
            console.log('User doc not found, creating...')
            // Tạo document nếu chưa có và lấy dữ liệu
            userData = await createUserDocument(user)
          }
          
          setCurrentUser({
            ...user,
            role: userData.role || 'user'
          })
          
          console.log('Final user role:', userData.role || 'user')
        } catch (error) {
          console.error('Error fetching user data:', error)
          setCurrentUser({
            ...user,
            role: 'user'
          })
        }
      } else {
        setCurrentUser(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    loading,
    signup,
    signin,
    signinWithGoogle,
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