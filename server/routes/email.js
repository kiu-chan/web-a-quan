const express = require('express')
const router = express.Router()
const emailService = require('../services/emailService')

// POST /api/email/contact - Gửi email liên hệ
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message, contactMethod } = req.body

    // Validation
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        error: 'Thiếu thông tin bắt buộc',
        required: ['name', 'email', 'phone', 'subject', 'message']
      })
    }

    // Email validation đơn giản
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Email không hợp lệ'
      })
    }

    // Gửi email
    const result = await emailService.sendContactEmail({
      name,
      email,
      phone,
      subject,
      message,
      contactMethod
    })

    res.json({
      success: true,
      message: 'Gửi email thành công',
      messageId: result.messageId
    })

  } catch (error) {
    console.error('Lỗi gửi email:', error)
    res.status(500).json({
      error: 'Không thể gửi email, vui lòng thử lại'
    })
  }
})

// POST /api/email/enrollment - Gửi email đăng ký khóa học
router.post('/enrollment', async (req, res) => {
  try {
    const { 
      fullName, 
      email, 
      phone, 
      course, 
      schedule, 
      experience, 
      goals 
    } = req.body

    // Validation
    if (!fullName || !email || !phone || !course) {
      return res.status(400).json({
        error: 'Thiếu thông tin bắt buộc',
        required: ['fullName', 'email', 'phone', 'course']
      })
    }

    // Gửi email
    const result = await emailService.sendEnrollmentEmail({
      fullName,
      email,
      phone,
      course,
      schedule,
      experience,
      goals
    })

    res.json({
      success: true,
      message: 'Gửi email đăng ký thành công',
      messageId: result.messageId
    })

  } catch (error) {
    console.error('Lỗi gửi email đăng ký:', error)
    res.status(500).json({
      error: 'Không thể gửi email đăng ký, vui lòng thử lại'
    })
  }
})

module.exports = router