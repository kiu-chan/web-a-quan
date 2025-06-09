const nodemailer = require('nodemailer')

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
      }
    })
  }

  async sendContactEmail(data) {
    const { name, email, phone, subject, message, contactMethod } = data

    // Email cho admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `🔔 Liên hệ mới: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ec4899, #8b5cf6); padding: 20px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
            <h2>📧 Tin nhắn liên hệ mới</h2>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #374151; margin-bottom: 20px;">Thông tin liên hệ:</h3>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #6b7280;">👤 Họ tên:</strong> ${name}
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #6b7280;">📧 Email:</strong> 
                <a href="mailto:${email}" style="color: #3b82f6;">${email}</a>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #6b7280;">📞 Điện thoại:</strong> 
                <a href="tel:${phone}" style="color: #3b82f6;">${phone}</a>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #6b7280;">📋 Chủ đề:</strong> ${subject}
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #6b7280;">📱 Phương thức liên lạc:</strong> ${contactMethod}
              </div>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #6b7280;">💬 Nội dung:</strong>
                <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; margin-top: 10px; line-height: 1.6;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #6b7280;">🕒 Thời gian:</strong> ${new Date().toLocaleString('vi-VN')}
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px;">
              <p>Email được gửi từ website Học tiếng Đức</p>
            </div>
          </div>
        </div>
      `
    }

    // Email xác nhận cho khách hàng
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '✅ Xác nhận đã nhận được tin nhắn của bạn',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #10b981, #3b82f6); padding: 20px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
            <h2>✅ Cảm ơn bạn đã liên hệ!</h2>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <p style="color: #374151; margin-bottom: 15px;">Xin chào <strong>${name}</strong>,</p>
              
              <p style="color: #374151; margin-bottom: 15px;">
                Chúng tôi đã nhận được tin nhắn của bạn với chủ đề: <strong>"${subject}"</strong>
              </p>
              
              <p style="color: #374151; margin-bottom: 15px;">
                Đội ngũ tư vấn sẽ phản hồi bạn trong vòng <strong>2 giờ làm việc</strong> qua phương thức: <strong>${contactMethod}</strong>
              </p>
              
              <div style="background: #dbeafe; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <p style="color: #1e40af; margin: 0; font-weight: 500;">
                  🎯 Cam kết của chúng tôi: Phản hồi nhanh chóng và tư vấn chuyên nghiệp
                </p>
              </div>
              
              <p style="color: #374151; margin-bottom: 0;">
                Trân trọng,<br>
                <strong>Đội ngũ Học tiếng Đức</strong>
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <p style="color: #6b7280; font-size: 14px; margin-bottom: 10px;">
                📞 Hotline: ${process.env.CONTACT_PHONE || '+84 123 456 789'} | 
                📧 Email: ${process.env.EMAIL_USER}
              </p>
              <p style="color: #6b7280; font-size: 12px; margin: 0;">
                Website: Học tiếng Đức - "Học để hiểu & đúng trong tâm"
              </p>
            </div>
          </div>
        </div>
      `
    }

    // Gửi cả 2 email
    await Promise.all([
      this.transporter.sendMail(adminMailOptions),
      this.transporter.sendMail(customerMailOptions)
    ])

    return { messageId: Date.now().toString() }
  }

  async sendEnrollmentEmail(data) {
    const { fullName, email, phone, course, schedule, experience, goals } = data

    const courseNames = {
      'a1': 'A1 - Tiếng Đức cơ bản',
      'a2': 'A2 - Tiếng Đức sơ cấp', 
      'b1': 'B1 - Tiếng Đức trung cấp',
      'b2': 'B2 - Tiếng Đức cao cấp',
      'consultation': 'Tư vấn chọn khóa phù hợp'
    }

    const scheduleNames = {
      'morning': 'Buổi sáng (8:00 - 10:00)',
      'afternoon': 'Buổi chiều (14:00 - 16:00)',
      'evening': 'Buổi tối (19:00 - 21:00)',
      'weekend': 'Cuối tuần (9:00 - 11:00)',
      'flexible': 'Linh hoạt theo lịch cá nhân'
    }

    // Email cho admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `🎓 Đăng ký khóa học mới: ${courseNames[course] || course}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f59e0b, #ef4444); padding: 20px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
            <h2>🎓 Đăng ký khóa học mới</h2>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #374151; margin-bottom: 20px;">Thông tin đăng ký:</h3>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #6b7280;">👤 Họ tên:</strong> ${fullName}
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #6b7280;">📧 Email:</strong> 
                <a href="mailto:${email}" style="color: #3b82f6;">${email}</a>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #6b7280;">📞 Điện thoại:</strong> 
                <a href="tel:${phone}" style="color: #3b82f6;">${phone}</a>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #6b7280;">📚 Khóa học:</strong> ${courseNames[course] || course}
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #6b7280;">⏰ Lịch học:</strong> ${scheduleNames[schedule] || schedule}
              </div>
              
              ${experience ? `
              <div style="margin-bottom: 15px;">
                <strong style="color: #6b7280;">📊 Trình độ hiện tại:</strong> ${experience}
              </div>
              ` : ''}
              
              ${goals ? `
              <div style="margin-bottom: 20px;">
                <strong style="color: #6b7280;">🎯 Mục tiêu:</strong>
                <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; margin-top: 10px; line-height: 1.6;">
                  ${goals.replace(/\n/g, '<br>')}
                </div>
              </div>
              ` : ''}
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #6b7280;">🕒 Thời gian:</strong> ${new Date().toLocaleString('vi-VN')}
              </div>
            </div>
          </div>
        </div>
      `
    }

    // Email xác nhận cho học viên
    const studentMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `🎉 Đăng ký thành công khóa học ${courseNames[course] || course}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #8b5cf6, #3b82f6); padding: 20px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
            <h2>🎉 Chào mừng bạn đến với Học tiếng Đức!</h2>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <p style="color: #374151; margin-bottom: 15px;">Xin chào <strong>${fullName}</strong>,</p>
              
              <p style="color: #374151; margin-bottom: 15px;">
                Cảm ơn bạn đã đăng ký khóa học <strong>${courseNames[course] || course}</strong>!
              </p>
              
              <div style="background: #dbeafe; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <h4 style="color: #1e40af; margin: 0 0 10px 0;">📋 Thông tin đăng ký:</h4>
                <p style="color: #1e40af; margin: 5px 0;">📚 Khóa học: ${courseNames[course] || course}</p>
                <p style="color: #1e40af; margin: 5px 0;">⏰ Lịch học: ${scheduleNames[schedule] || schedule}</p>
              </div>
              
              <p style="color: #374151; margin-bottom: 15px;">
                <strong>Bước tiếp theo:</strong><br>
                Đội ngũ tư vấn sẽ liên hệ với bạn trong vòng <strong>24 giờ</strong> để:
              </p>
              
              <ul style="color: #374151; margin-bottom: 20px; padding-left: 20px;">
                <li>Tư vấn chi tiết về khóa học</li>
                <li>Sắp xếp buổi học thử miễn phí</li>
                <li>Hướng dẫn quy trình đăng ký</li>
                <li>Giải đáp mọi thắc mắc</li>
              </ul>
              
              <div style="background: #d1fae5; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <p style="color: #065f46; margin: 0; font-weight: 500;">
                  🎁 Ưu đãi đặc biệt: Giảm 10% học phí cho khóa đầu tiên + Tặng bộ tài liệu học tập!
                </p>
              </div>
              
              <p style="color: #374151; margin-bottom: 0;">
                Trân trọng,<br>
                <strong>Đội ngũ Học tiếng Đức</strong><br>
                <em>"Học để hiểu & đúng trong tâm"</em>
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <p style="color: #6b7280; font-size: 14px; margin-bottom: 10px;">
                📞 Hotline: ${process.env.CONTACT_PHONE || '+84 123 456 789'} | 
                📧 Email: ${process.env.EMAIL_USER}
              </p>
              <p style="color: #6b7280; font-size: 12px; margin: 0;">
                Nếu có thắc mắc, hãy liên hệ ngay với chúng tôi!
              </p>
            </div>
          </div>
        </div>
      `
    }

    // Gửi cả 2 email
    await Promise.all([
      this.transporter.sendMail(adminMailOptions),
      this.transporter.sendMail(studentMailOptions)
    ])

    return { messageId: Date.now().toString() }
  }
}

module.exports = new EmailService()