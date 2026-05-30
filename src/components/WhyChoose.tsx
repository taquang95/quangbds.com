import { motion } from 'motion/react';
import { ShieldCheck, Award, Heart, CheckCircle2 } from 'lucide-react';
import { reasonsData } from '../data';

export default function WhyChoose() {
  return (
    <section className="relative w-full py-8 px-4">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />

      {/* SECTION TITLE */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] text-gray-400 font-mono font-bold tracking-wider uppercase mb-2">
          <Award className="w-3.5 h-3.5 text-brand-red" />
          CHỮ TÍN HÀNG ĐẦU
        </div>
        <h2 className="text-2xl font-sans font-black text-white tracking-tight uppercase">
          Vì sao nên làm việc với Quang?
        </h2>
        <div className="w-12 h-1 bg-brand-red rounded mt-3" />
      </div>

      {/* REASONS LIST */}
      <div className="space-y-4">
        {reasonsData.map((reason, idx) => (
          <motion.div
            key={reason.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            className="glass-panel p-5 rounded-2xl border border-white/8 relative overflow-hidden flex gap-4 hover:border-brand-gold/30 transition-all group"
          >
            {/* Number Counter Badge */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-red/10 to-brand-red/5 border border-brand-red/15 flex items-center justify-center font-mono font-bold text-sm text-brand-gold group-hover:from-brand-red/25 group-hover:border-brand-red/40 transition-all">
                0{idx + 1}
              </div>
            </div>

            {/* Reason content */}
            <div className="space-y-1 flex-1">
              {reason.highlightText && (
                <span className="text-[9px] uppercase font-mono font-bold text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded border border-brand-gold/10 inline-block mb-1">
                  {reason.highlightText}
                </span>
              )}
              <h3 className="text-sm font-extrabold text-white font-sans tracking-tight">
                {reason.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                {reason.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Trust Badge */}
      <div className="mt-8 p-4 bg-gradient-to-tr from-brand-red/10 to-transparent border border-brand-red/15 rounded-2xl text-center">
        <p className="text-xs text-gray-300 font-sans leading-relaxed">
          🤝 <strong className="text-white">Đặt uy tín lên danh dự:</strong> Quang luôn tư vấn dựa trên sự thật, minh bạch về giá cả, phân tích khách quan tất cả rủi ro pháp lý nếu có. Giao dịch luôn đính kèm sự an tâm tuyệt đối.
        </p>
      </div>
    </section>
  );
}
