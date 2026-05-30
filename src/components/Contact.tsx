import { motion } from 'motion/react';
import { Phone, MessageCircle, Facebook, Users, Link2 } from 'lucide-react';
import { contactData } from '../data';

export default function Contact() {
  const contactButtons = [
    {
      id: 'c1',
      title: 'Gọi Quang trực tiếp',
      description: 'Hỗ trợ khẩn cấp 24/7',
      label: contactData.phoneDisplay,
      href: `tel:${contactData.phone}`,
      icon: Phone,
      colorClass: 'bg-brand-red border-brand-red text-white hover:bg-brand-red-dark hover:scale-[1.01]',
      isExternal: false
    },
    {
      id: 'c2',
      title: 'Nhắn Zalo cá nhân',
      description: 'Nhận bảng tính file gốc Excel',
      label: 'Nhấn chat Zalo ngay',
      href: contactData.zaloChatUrl,
      icon: MessageCircle,
      colorClass: 'bg-green-600 border-green-600/30 text-white hover:bg-green-500 hover:scale-[1.01]',
      isExternal: true
    },
    {
      id: 'c3',
      title: 'Nhóm Zalo Dự Án',
      description: 'Tin tức, tiến độ & rổ hàng mới',
      label: 'zalo.quangbds.com',
      href: contactData.zaloGroupUrl,
      icon: Users,
      colorClass: 'bg-blue-600 border-blue-600/30 text-white hover:bg-blue-500 hover:scale-[1.01]',
      isExternal: true
    },
    {
      id: 'c4',
      title: 'Fanpage Quang Masterise Homes',
      description: 'Cập nhật bảng giá & chính sách mới nhất',
      label: 'Quang Masterise Homes',
      href: contactData.facebookFanpageUrl || 'https://www.facebook.com/QuangMasteriseHomess',
      icon: Facebook,
      colorClass: 'bg-gradient-to-r from-blue-700 to-indigo-800 border-indigo-700 text-white hover:from-blue-600 hover:to-indigo-700 hover:scale-[1.01]',
      isExternal: true
    },
    {
      id: 'c5',
      title: 'Facebook cá nhân',
      description: 'Xem hoạt động & kết nối cá nhân',
      label: 'Tạ Vinh Quang',
      href: contactData.facebookUrl,
      icon: Facebook,
      colorClass: 'bg-sky-700 border-sky-700/30 text-white hover:bg-sky-600 hover:scale-[1.01]',
      isExternal: true
    }
  ];

  return (
    <section className="relative w-full py-8 px-4">
      {/* SECTION TITLE */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] text-gray-400 font-mono font-bold tracking-wider uppercase mb-2">
          <Link2 className="w-3.5 h-3.5 text-brand-red" />
          KÊNH KẾT NỐI
        </div>
        <h2 className="text-2xl font-sans font-black text-white tracking-tight uppercase">
          Kết nối trực tiếp với Quang
        </h2>
        <div className="w-12 h-1 bg-brand-red rounded mt-3" />
      </div>

      {/* CALL TO ACTION BUTTONS GRID */}
      <div className="grid grid-cols-1 gap-4">
        {contactButtons.map((btn, idx) => {
          const IconComp = btn.icon;
          return (
            <motion.a
              key={btn.id}
              href={btn.href}
              target={btn.isExternal ? '_blank' : undefined}
              rel={btn.isExternal ? 'noreferrer' : undefined}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.3 }}
              className={`w-full px-5 py-4 rounded-2xl flex items-center justify-between border-2 transition-all cursor-pointer shadow-lg hover:shadow-2xl ${btn.colorClass}`}
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                  <IconComp className="w-5 h-5 fill-none" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-white opacity-80">
                    {btn.title}
                  </h3>
                  <p className="text-xs text-white/60">
                    {btn.description}
                  </p>
                  <p className="text-sm font-black font-sans tracking-wide mt-0.5">
                    {btn.label}
                  </p>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white">
                →
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
