const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const emailRoutes = require('./routes/email')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware bảo mật
app.use(helmet())

// CORS
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:5173', 
    'http://localhost:5174'
  ],
  credentials: true
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 10, // tối đa 10 request/15 phút
  message: {
    error: 'Quá nhiều yêu cầu từ IP này, vui lòng thử lại sau 15 phút'
  }
})

app.use('/api/email', limiter)

// Parse JSON
app.use(express.json({ limit: '10mb' }))

// Routes
app.use('/api/email', emailRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Học tiếng Đức API'
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'API endpoint không tồn tại'
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err)
  res.status(500).json({
    error: 'Lỗi server nội bộ'
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy trên port ${PORT}`)
  console.log(`📧 Email service sẵn sàng`)
})