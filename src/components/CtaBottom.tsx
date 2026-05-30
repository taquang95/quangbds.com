import { motion } from 'motion/react';
import { MessageSquare, ArrowUpRight, HelpCircle, Mail, Globe, MapPin } from 'lucide-react';
import { contactData } from '../data';

export default function CtaBottom() {
  const bulletInquiries = [
    'Lựa chọn căn hộ nào khớp nhất với tầm tài chính và phong thủy của bạn?',
    'Phân tích so sánh chính sách vay chiết khấu ưu đãi của phân khu mới?',
    'Kế hoạch bài toán dòng tiền trả góp ngân hàng tối ưu không lo gánh nặng?',
    'Định hướng khai thác kinh doanh cho thuê homestay / căn hộ dịch vụ cao cấp?'
  ];

  return (
    <section className="relative w-full py-10 px-4">
      {/* Decorative light blob */}
      <div className="absolute top-0 left-1/4 w-40 h-40 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main glass card container */}
      <div className="glass-card-red rounded-3xl p-6 sm:p-8 relative border border-white/12 text-center overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/10 rounded-full blur-xl pointer-events-none" />
        
        <h3 className="text-xl sm:text-2xl font-sans font-black text-white tracking-tight leading-snug">
          Anh/chị đang quan tâm căn hộ tại Ocean Park?
        </h3>
        
        <p className="text-sm text-brand-gold font-bold mt-2 font-sans">
          Hãy để Tạ Vinh Quang hỗ trợ phân tích chi tiết:
        </p>

        {/* Customized Question items */}
        <div className="text-left py-6 max-w-md mx-auto space-y-3">
          {bulletInquiries.map((inq, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-2.5 text-xs text-gray-300"
            >
              <span className="w-5 h-5 rounded-full bg-brand-red/15 border border-brand-red/30 flex items-center justify-center text-brand-gold mt-0.5 flex-shrink-0">
                ?
              </span>
              <span className="leading-relaxed">{inq}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <a
            href={contactData.zaloChatUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full inline-flex bg-brand-red hover:bg-brand-red/90 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-[0_4px_25px_rgba(215,25,32,0.4)] hover:shadow-[0_4px_30px_rgba(215,25,32,0.7)] hover:-translate-y-0.5 items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <MessageSquare className="w-4 h-4 text-white fill-white animate-bounce" />
            VÀO NHẬN TƯ VẤN NGAY BÂY GIỜ
            <ArrowUpRight className="w-4 h-4 text-white" />
          </a>
        </div>
      </div>

      {/* FOOTER METRICS & CREDITS */}
      <footer className="mt-12 pt-6 border-t border-white/5 text-center space-y-4">
        <div className="flex flex-col items-center justify-center gap-1.5 text-xs text-gray-400">
          <p className="flex items-center gap-1 text-[11px]">
            <MapPin className="w-3 h-3 text-brand-red" />
            Văn phòng: <strong>Thành Phát Land</strong> – Ocean Park, Gia Lâm, Hà Nội
          </p>
          <p className="flex items-center gap-1 text-[10px] text-gray-500">
            <Globe className="w-3 h-3 text-brand-gold" />
            Website: <a href="https://quangbds.com" className="hover:text-brand-gold transition-colors underline">quangbds.com</a>
          </p>
        </div>

        <p className="text-[10px] text-gray-600 font-mono tracking-wider">
          © {new Date().getFullYear()} TẠ VINH QUANG BDS • CÂU CHUYỆN CỦA NIỀM TIN
        </p>
      </footer>
    </section>
  );
}
