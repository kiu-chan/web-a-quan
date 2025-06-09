// contexts/LanguageContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import vi from '../locales/vi'
import en from '../locales/en'
import de from '../locales/de'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Import translations from separate files
const translations = {
  vi,
  en,
  de
}

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('vi')

  // Load language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage')
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage)
    }
  }, [])

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('preferredLanguage', currentLanguage)
  }, [currentLanguage])

  const changeLanguage = (languageCode) => {
    if (translations[languageCode]) {
      setCurrentLanguage(languageCode)
    }
  }

  const t = (key) => {
    const keys = key.split('.')
    let translation = translations[currentLanguage]
    
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k]
      } else {
        // Fallback to Vietnamese if translation not found
        translation = translations.vi
        for (const k of keys) {
          if (translation && translation[k]) {
            translation = translation[k]
          } else {
            return key // Return the key itself if no translation found
          }
        }
        break
      }
    }
    
    return translation || key
  }

  const availableLanguages = [
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ]

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    availableLanguages
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}