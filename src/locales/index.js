// locales/index.js
import vi from './vi'
import en from './en'
import de from './de'

export { vi, en, de }

export const languages = [
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
]

export const defaultLanguage = 'vi'