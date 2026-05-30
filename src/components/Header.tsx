import { Calculator } from 'lucide-react';
import { contactData } from '../data';

export default function Header() {
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[540px] px-4 py-3.5 flex items-center justify-between glass-panel border-b border-x border-white/10 backdrop-blur-xl bg-premium-dark/90 shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2.5">
        <div className="relative flex items-center justify-center">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-red to-brand-red-dark flex items-center justify-center text-white font-display font-extrabold text-base shadow-md shadow-brand-red/25 border border-white/10">
            Q
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-premium-dark" />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-display font-black tracking-tight text-sm uppercase">
            quang<span className="text-brand-red">bds</span>.com
          </span>
          <span className="text-[9px] text-gray-400 font-mono tracking-widest uppercase font-semibold">Tạ Vinh Quang</span>
        </div>
      </div>

      <div className="flex items-center">
        <a 
          href="#interactive-calculator"
          className="px-3 py-1.5 bg-gradient-to-r from-brand-red to-brand-red-dark hover:from-brand-red-dark hover:to-brand-red text-white text-[12px] font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-[0_2px_12px_rgba(215,25,32,0.25)] cursor-pointer"
        >
          <Calculator className="w-3.5 h-3.5 text-white" />
          <span>Tính dòng tiền</span>
        </a>
      </div>
    </header>
  );
}
