import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Tag, Check, ArrowRight, Sparkles, MessageCircle, PhoneCall, X } from 'lucide-react';
import { projectsData, contactData } from '../data';
import { Project } from '../types';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');

  const handleOpenConsult = (project: Project) => {
    if (project.status === 'sold-out') return;
    setSelectedProject(project);
  };

  const handleClose = () => {
    setSelectedProject(null);
    setLeadName('');
    setLeadPhone('');
  };

  const handleSendLead = (e: FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) {
      alert('Vui lòng điền đủ Tên và Số điện thoại.');
      return;
    }
    
    // Build direct prefilled Zalo text message
    const message = `Xin chào Quang! Tôi là ${leadName} (${leadPhone}). Tôi quan tâm đến dự án ${selectedProject?.name} của bạn. Hãy gửi thông tin bảng hàng tư vấn và chiết khấu mới nhất cho tôi nhé!`;
    const zaloUrl = `https://zalo.me/${contactData.phone}?text=${encodeURIComponent(message)}`;
    
    // Open in new tab
    window.open(zaloUrl, '_blank');
    handleClose();
  };

  return (
    <section className="relative w-full py-8 px-4">
      {/* SECTION TITLE */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] text-gray-400 font-mono font-bold tracking-wider uppercase mb-2">
          <Building2 className="w-3.5 h-3.5 text-brand-red" />
          QUỸ CĂN & DỰ ÁN
        </div>
        <h2 className="text-2xl font-sans font-black text-white tracking-tight uppercase">
          Dự án đang tư vấn chính
        </h2>
        <div className="w-12 h-1 bg-brand-red rounded mt-3" />
      </div>

      {/* PROJECTS LIST */}
      <div className="space-y-6">
        {projectsData.map((project, idx) => {
          const isActive = project.status === 'active';
          
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className={`relative rounded-3xl overflow-hidden border transition-all ${
                isActive 
                  ? 'glass-card-red border-brand-red/35 hover:shadow-[0_8px_30px_rgba(215,25,32,0.15)]' 
                  : 'bg-white/[0.02] border-white/5 opacity-80 hover:opacity-100'
              }`}
            >
              {/* Cover Image of building with gradient overlay */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-premium-dark via-premium-dark/40 to-transparent" />
                
                {/* Badge Tag */}
                <div className="absolute top-4 left-4">
                  {isActive ? (
                    <span className="px-3 py-1 bg-green-500/15 border border-green-500/40 text-green-400 font-mono text-[10px] uppercase font-bold rounded-full flex items-center gap-1.5 backdrop-blur-md shadow-sm">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" />
                      Đang Triển Khai
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-white/10 border border-white/15 text-gray-300 font-mono text-[10px] uppercase font-semibold rounded-full backdrop-blur-md">
                      Đã Bán Hết
                    </span>
                  )}
                </div>

                {/* Developer Badge */}
                <div className="absolute bottom-3 left-4">
                  <span className="text-[10px] text-brand-gold font-bold bg-black/40 border border-brand-gold/20 px-2 py-0.5 rounded backdrop-blur-md">
                    {project.developer}
                  </span>
                </div>

                {/* Estimated Price Range Indicator */}
                {isActive && project.priceEstimate && (
                  <div className="absolute bottom-3 right-4">
                    <span className="text-[10px] font-mono font-bold text-white bg-brand-red px-2.5 py-0.5 rounded-full shadow-sm">
                      {project.priceEstimate}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold text-white font-sans flex items-center gap-1.5">
                    {project.name}
                    {isActive && <Sparkles className="w-4 h-4 text-brand-gold fill-brand-gold/20" />}
                  </h3>
                  <p className="text-[11px] text-gray-400 leading-snug">
                    📍 {project.location}
                  </p>
                </div>

                <p className="text-xs text-gray-350 leading-relaxed font-sans">
                  {project.description}
                </p>

                {/* Highlight Checkmarks */}
                {project.highlights && (
                  <ul className="space-y-1.5 pt-2 border-t border-white/5">
                    {project.highlights.map((hlt, hidx) => (
                      <li key={hidx} className="flex items-start gap-2 text-[11px] text-gray-400 font-sans">
                        <span className="flex-shrink-0 w-4 h-4 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                        <span className="leading-snug">{hlt}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Dynamic Button Action */}
                <div className="pt-3">
                  {isActive ? (
                    <button
                      type="button"
                      onClick={() => handleOpenConsult(project)}
                      className="w-full bg-white/5 hover:bg-brand-red hover:text-white border border-white/10 hover:border-brand-red text-xs font-bold text-brand-gold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm group"
                    >
                      {project.ctaText}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="w-full bg-white/[0.02] border border-white/5 text-xs text-gray-500 py-3 px-4 rounded-xl font-medium cursor-not-allowed"
                    >
                      {project.ctaText}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CONSULTATION OVERLAY MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-hidden">
            {/* Dark glass backdrop layout */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Popup Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-sm glass-card-red rounded-3xl p-6 border border-white/15 shadow-2x bg-[#0B0B0F]"
            >
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mb-5 mt-1">
                <span className="text-[10px] text-brand-gold font-mono uppercase tracking-wider font-bold">NHẬN CHÍNH SÁCH ĐẶC QUYỀN</span>
                <h3 className="text-xl font-bold text-white tracking-tight mt-1">
                  {selectedProject.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Quang sẽ gửi trực tiếp bảng hàng, danh sách chuyển nhượng nội bộ qua Zalo.
                </p>
              </div>

              <form onSubmit={handleSendLead} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Tên của anh/chị *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Anh Hoàng"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full bg-premium-dark border border-white/10 focus:border-brand-red text-white text-xs rounded-xl p-3 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Số điện thoại Zalo của anh/chị *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ví dụ: 0912 xxx xxx"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    className="w-full bg-premium-dark border border-white/10 focus:border-brand-red text-white text-xs rounded-xl p-3 outline-none transition-all"
                  />
                </div>

                <div className="text-[11px] text-gray-400 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                  🛡️ <strong className="text-white">Cam kết từ Quang:</strong> Bảo mật tuyệt đối thông tin, không làm phiền, chỉ cung cấp thông tin trung thực, phân tích kỹ tối ưu nhất cho nhu cầu của anh/chị.
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-[0_4px_15px_rgba(215,25,32,0.3)] flex items-center justify-center gap-2 text-xs cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  MỞ CHAT TƯ VẤN TRỰC TIẾP
                </button>

                <div className="text-center pt-1">
                  <span className="text-[10px] text-gray-500">Hoặc liên hệ khẩn cấp Hotline:</span>
                  <a href={`tel:${contactData.phone}`} className="block text-sm font-extrabold text-brand-gold mt-0.5 hover:underline font-mono">
                    {contactData.phoneDisplay}
                  </a>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
