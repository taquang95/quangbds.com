import { Phone, MessageCircle } from 'lucide-react';
import { contactData } from '../data';
import { motion } from 'motion/react';

export default function StickyBottomBar() {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[540px] px-4 pb-5 pt-3.5 bg-premium-dark/95 backdrop-blur-xl border-t border-x border-white/10 flex gap-3 shadow-[0_-10px_35px_rgba(0,0,0,0.7)] rounded-t-2xl">
      {/* Call Hotline Button */}
      <a
        href={`tel:${contactData.phone}`}
        className="flex-1 py-3 px-4 rounded-xl bg-white text-[#0B0B0F] font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/95 active:scale-98 transition-all duration-200 cursor-pointer shadow-md"
      >
        <Phone className="w-4 h-4 fill-[#0B0B0F]" />
        <span>HOTLINE</span>
      </a>

      {/* Zalo Premium Chat button */}
      <a
        href={contactData.zaloChatUrl}
        target="_blank"
        rel="noreferrer"
        className="flex-1 py-3 px-4 rounded-xl bg-[#D71920] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#D71920]/90 active:scale-98 transition-all duration-200 cursor-pointer shadow-lg shadow-[#D71920]/30 relative overflow-hidden"
      >
        {/* Subtle glowing pulse effect inside button background */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-pulse" />
        <MessageCircle className="w-4 h-4 fill-white animate-bounce" />
        <span>CHAT ZALO</span>
      </a>
    </div>
  );
}
