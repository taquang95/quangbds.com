import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests for sending contact emails
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Only POST requests are allowed on this endpoint." });
  }

  const {
    clientName,
    clientPhone,
    project,
    apartmentType,
    budget,
    equityNeeded,
    loanAmount,
    loanTerm,
    monthlyPayment,
  } = req.body;

  if (!clientName || !clientPhone) {
    return res.status(400).json({ error: "Missing clientName or clientPhone." });
  }

  let smtpUser = process.env.SMTP_USER || "taquang95@gmail.com";
  if (smtpUser && !smtpUser.includes("@")) {
    smtpUser = smtpUser.trim() + "@gmail.com";
  }
  const smtpPass = process.env.SMTP_PASS || "qvia gnrg uuzp ortc";
  const receiverEmail = process.env.SMTP_RECEIVER || "taquang95@gmail.com";

  // Validate presence of credentials
  if (!smtpUser || !smtpPass) {
    console.warn("⚠️ SMTP Credentials are not configured. Unable to send real email.");
    return res.status(400).json({
      success: false,
      errorCode: "SMTP_NOT_CONFIGURED",
      message: "SMTP chưa được cấu hình. Vui lòng thêm SMTP_USER và SMTP_PASS vào phần Biến môi trường (Environment Variables) trong Vercel.",
    });
  }

  try {
    // Lazy-initialize Nodemailer transport using Gmail SMTP secure connection
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const formatCurrency = (val: number) => {
      if (!val) return "0 VNĐ";
      if (val >= 1000) {
        return `${(val / 1000).toFixed(2).replace(/\.00$/, "")} Tỷ VNĐ`;
      }
      return `${val.toFixed(0)} Triệu VNĐ`;
    };

    // Design a beautifully stylized, responsive HTML email body in Vietnamese
    const htmlBody = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #fafafa; color: #1f2937;">
        <!-- Header -->
        <div style="text-align: center; border-bottom: 2px solid #D71920; padding-bottom: 20px; margin-bottom: 25px;">
          <h2 style="color: #D71920; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: -0.5px;">quangbds.com</h2>
          <p style="color: #6b7280; font-size: 11px; font-family: monospace; text-transform: uppercase; margin: 5px 0 0 0; letter-spacing: 2px;">Thông Báo Đăng Ký Tư Vấn Mới</p>
        </div>

        <!-- Notification Note -->
        <p style="font-size: 15px; line-height: 1.6; color: #374151;">
          Chào anh <strong>Tạ Vinh Quang</strong>, một khách hàng vừa thực hiện tính toán dòng tiền và gửi thông tin đăng ký tư vấn trực tiếp từ website <strong>quangbds.com</strong>.
        </p>

        <!-- Customer Profiler -->
        <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-left: 5px solid #D71920; padding: 18px; border-radius: 10px; margin: 20px 0;">
          <h3 style="margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; color: #111827; letter-spacing: 0.5px;">👤 Thông tin khách hàng</h3>
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; color: #6b7280; width: 40%;">Họ và tên:</td>
              <td style="padding: 6px 0; color: #111827; font-weight: bold;">${clientName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6b7280;">Số điện thoại / Zalo:</td>
              <td style="padding: 6px 0; color: #D71920; font-weight: bold; font-family: monospace; font-size: 15px;">
                <a href="tel:${clientPhone}" style="color: #D71920; text-decoration: none;">${clientPhone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6b7280;">Kênh Chat nhanh:</td>
              <td style="padding: 6px 0;">
                <a href="https://zalo.me/${clientPhone.replace(/[\s.-]/g, "")}" style="color: #2563eb; text-decoration: underline; font-weight: 500;">Mở chat Zalo với khách</a>
              </td>
            </tr>
          </table>
        </div>

        <!-- Calculated Parameters -->
        <div style="background-color: #111827; color: #f9fafb; padding: 20px; border-radius: 12px; margin: 20px 0;">
          <h3 style="margin: 0 0 12px 0; font-size: 13px; text-transform: uppercase; color: #f59e0b; letter-spacing: 1px; font-weight: bold;">📊 Thông Số Phương Án Dòng Tiền</h3>
          <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #374151;">
              <td style="padding: 10px 0; color: #9ca3af;">Dự án định vị:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #ffffff;">${project || "Không xác định"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #374151;">
              <td style="padding: 10px 0; color: #9ca3af;">Loại hình căn hộ:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #ffffff;">${apartmentType || "Chưa chọn"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #374151;">
              <td style="padding: 10px 0; color: #9ca3af;">Tổng giá trị căn hộ:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #f59e0b; font-size: 14px;">${formatCurrency(budget)}</td>
            </tr>
            <tr style="border-bottom: 1px solid #374151;">
              <td style="padding: 10px 0; color: #9ca3af;">Vốn tự có chuẩn bị:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #ffffff;">${formatCurrency(equityNeeded)}</td>
            </tr>
            <tr style="border-bottom: 1px solid #374151;">
              <td style="padding: 10px 0; color: #9ca3af;">Ngân hàng hỗ trợ vay:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #ffffff;">${formatCurrency(loanAmount)} (${((loanAmount / budget) * 100).toFixed(0)}%)</td>
            </tr>
            <tr style="border-bottom: 1px solid #374151;">
              <td style="padding: 10px 0; color: #9ca3af;">Thời hạn vay tối đa:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #ffffff;">${loanTerm} năm</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #9ca3af; font-weight: bold;">Gốc & Lãi hằng tháng ước tính:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #10b981; font-size: 15px;">~${formatCurrency(monthlyPayment)}/tháng</td>
            </tr>
          </table>
        </div>

        <!-- Footer Note -->
        <div style="font-size: 11px; color: #9ca3af; text-align: center; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 15px;">
          <p style="margin: 0 0 5px 0;">Hệ thống gửi thư tự động tích hợp từ quangbds.com</p>
          <p style="margin: 0;">© ${new Date().getFullYear()} Tạ Vinh Quang – All Rights Reserved.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"CRM quangbds.com" <${smtpUser}>`,
      to: receiverEmail,
      subject: `🔥 [Khách Đăng ký BĐS] ${clientName} - ${clientPhone} | Phương án ${project}`,
      text: `Có lượt đăng ký mới từ: ${clientName} (${clientPhone}). Dự án: ${project}, giá trị: ${formatCurrency(budget)}.`,
      html: htmlBody,
    });

    return res.status(200).json({ success: true, message: "Email sent successfully to broker." });
  } catch (error: any) {
    console.error("❌ Failed to send Vercel email through Nodemailer:", error);
    return res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra khi kết nối máy chủ Mail SMTP.",
      details: error.message,
    });
  }
}
