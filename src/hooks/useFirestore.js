// hooks/useFirestore.js
import { useState, useEffect } from 'react'
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot 
} from 'firebase/firestore'
import { db } from '../../firebase'

// Hook để lấy một collection
export const useCollection = (collectionName, queryConstraints = []) => {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    
    const collectionRef = collection(db, collectionName)
    const q = query(collectionRef, ...queryConstraints)
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const docs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setDocuments(docs)
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      }
    )

    return unsubscribe
  }, [collectionName, JSON.stringify(queryConstraints)])

  return { documents, loading, error }
}

// Hook để lấy một document
export const useDocument = (collectionName, docId) => {
  const [document, setDocument] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!docId) {
      setLoading(false)
      return
    }

    const docRef = doc(db, collectionName, docId)
    
    const unsubscribe = onSnapshot(docRef,
      (doc) => {
        if (doc.exists()) {
          setDocument({ id: doc.id, ...doc.data() })
        } else {
          setDocument(null)
        }
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      }
    )

    return unsubscribe
  }, [collectionName, docId])

  return { document, loading, error }
}

// Hook để thực hiện các thao tác CRUD
export const useFirestore = (collectionName) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Thêm document mới
  const addDocument = async (data) => {
    setLoading(true)
    setError(null)
    
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      setLoading(false)
      return docRef
    } catch (err) {
      setError(err.message)
      setLoading(false)
      throw err
    }
  }

  // Cập nhật document
  const updateDocument = async (docId, data) => {
    setLoading(true)
    setError(null)
    
    try {
      const docRef = doc(db, collectionName, docId)
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date()
      })
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
      throw err
    }
  }

  // Xóa document
  const deleteDocument = async (docId) => {
    setLoading(true)
    setError(null)
    
    try {
      await deleteDoc(doc(db, collectionName, docId))
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
      throw err
    }
  }

  return {
    addDocument,
    updateDocument,
    deleteDocument,
    loading,
    error
  }
}