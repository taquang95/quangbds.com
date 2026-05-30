import { ComponentType } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, LineChart, Home, FileText, ShieldCheck } from 'lucide-react';
import { benefitsData } from '../data';

// Map icon string names to actual Lucide Icon components
const iconMap: Record<string, ComponentType<any>> = {
  LineChart: LineChart,
  Home: Home,
  FileText: FileText,
  ShieldCheck: ShieldCheck,
};

export default function Services() {
  return (
    <section className="relative w-full py-8 px-4">
      {/* SECTION TITLE */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] text-gray-400 font-mono font-bold tracking-wider uppercase mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-brand-red animate-pulse" />
          DỊCH VỤ CHUYÊN NGHIỆP
        </div>
        <h2 className="text-2xl font-sans font-black text-white tracking-tight uppercase">
          Tôi có thể giúp ích gì cho quý anh/chị?
        </h2>
        <div className="w-12 h-1 bg-brand-red rounded mt-3" />
      </div>

      {/* SERVICES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {benefitsData.map((benefit, idx) => {
          const IconComponent = iconMap[benefit.iconName] || Home;
          return (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-brand-red/30 transition-all group flex gap-4"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-brand-red/10 border border-brand-red/20 group-hover:bg-brand-red/25 group-hover:border-brand-red/50 flex items-center justify-center text-brand-red transition-all">
                  <IconComponent className="w-6 h-6 stroke-[2]" />
                </div>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-white group-hover:text-brand-gold transition-colors font-sans">
                  {benefit.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
