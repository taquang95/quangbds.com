import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Calendar, Send, MessageSquare, ArrowRight, TrendingUp, DollarSign, Percent, CheckCircle2 } from 'lucide-react';
import { contactData } from '../data';

export default function InteractiveCallback() {
  const [step, setStep] = useState(1);
  const [project, setProject] = useState('Masteri Grand Coast');
  const [apartmentType, setApartmentType] = useState('2PN');
  const [budget, setBudget] = useState(4000); // triệu VND (e.g., 4 tỷ)
  const [downPaymentPct, setDownPaymentPct] = useState(20); // % vốn tự có
  const [loanTerm, setLoanTerm] = useState(20); // năm
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendFeedback, setSendFeedback] = useState<{ type: 'success' | 'warn' | 'error', message: string } | null>(null);

  // Financial calculations
  const apartmentPrice = budget; // Triệu đồng
  const equityNeeded = (apartmentPrice * downPaymentPct) / 100;
  const loanAmount = apartmentPrice - equityNeeded;
  
  // Assumed interest rate after incentive period (e.g., 8.5% year)
  const annualInterestRate = 0.085;
  const monthlyInterestRate = annualInterestRate / 12;
  const totalMonths = loanTerm * 12;
  
  // PMT formula for monthly payment (equal installments Gốc + Lãi)
  const monthlyPaymentTotal = totalMonths > 0 
    ? (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) / (Math.pow(1 + monthlyInterestRate, totalMonths) - 1)
    : 0;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) {
      alert('Vui lòng nhập đầy đủ Tên và Số điện thoại để Quang hỗ trợ.');
      return;
    }
    
    setIsSending(true);
    setSendFeedback(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientName,
          clientPhone,
          project,
          apartmentType,
          budget,
          equityNeeded,
          loanAmount,
          loanTerm,
          monthlyPayment: monthlyPaymentTotal,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setSendFeedback({
          type: 'success',
          message: 'Hệ thống đã tự động gửi email thông báo thành công đến Tạ Vinh Quang!'
        });
      } else {
        if (data.errorCode === "SMTP_NOT_CONFIGURED") {
          setSendFeedback({
            type: 'warn',
            message: 'Thông tin phương án đã được chụp. (Chú ý: Chưa gởi email vì máy chủ SMTP chưa được thiết lập tài khoản).'
          });
        } else {
          setSendFeedback({
            type: 'error',
            message: data.message || 'Cổng kết nối SMTP bận, thông tin phân phối đã lưu. Hãy tiếp tục gởi qua Zalo bên dưới.'
          });
        }
      }
    } catch (err: any) {
      console.error("Fetch SMTP failed:", err);
      setSendFeedback({
        type: 'error',
        message: 'Không kết nối được máy chủ SMTP. Vui lòng nhấn gởi trực tiếp qua Zalo phía dưới.'
      });
    } finally {
      setIsSending(false);
      setIsSubmitted(true);
    }
  };

  const getZaloPrefilledUrl = () => {
    const textMessage = `Xin chào Quang! Tôi là ${clientName} (${clientPhone}). Tôi vừa làm tính toán dòng tiền trên quangbds.com:
- Dự án: ${project}
- Căn hộ mục tiêu: ${apartmentType}
- Giá trị căn: ${budget / 1000} Tỷ VNĐ
- Vốn tự có: ${equityNeeded / 1000} Tỷ (${downPaymentPct}%)
- Vay ngân hàng: ${loanAmount / 1000} Tỷ trong ${loanTerm} năm.
Hãy gửi cho tôi bảng phân tích dòng tiền chi tiết và quỹ căn ngoại giao mới nhất nhé!`;
    
    return `https://zalo.me/${contactData.phone}?text=${encodeURIComponent(textMessage)}`;
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(2).replace(/\.00$/, '')} Tỷ VNĐ`;
    }
    return `${value.toFixed(0)} Triệu VNĐ`;
  };

  return (
    <div id="interactive-calculator" className="w-full relative py-6">
      <div className="absolute inset-0 bg-brand-red/5 rounded-3xl blur-2xl pointer-events-none" />
      
      <div className="glass-card-red rounded-3xl p-6 sm:p-8 relative border border-white/10 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col items-start mb-6">
          <div className="flex items-center gap-2 px-3 py-1 bg-brand-red/20 border border-brand-red/30 rounded-full text-brand-gold text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 animate-pulse" />
            Bảng Tính Ước Tính Dòng Tiền Ocean Park
          </div>
          <h3 className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight leading-snug">
            Phân tích nhanh dòng tiền thực tế
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Thiết lập dòng tiền thông minh trước khi quyết định xuống tiền mua căn hộ.
          </p>
        </div>

        {!isSubmitted ? (
          <div>
            {/* Steps indicator */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5 font-mono text-xs text-gray-500">
              <span className={`${step >= 1 ? 'text-brand-gold font-bold' : ''}`}>1. Dự Án & Căn Hộ</span>
              <div className="flex-1 h-px bg-white/5 mx-2" />
              <span className={`${step >= 2 ? 'text-brand-gold font-bold' : ''}`}>2. Khả Năng Tài Chính</span>
              <div className="flex-1 h-px bg-white/5 mx-2" />
              <span className={`${step >= 3 ? 'text-brand-gold font-bold' : ''}`}>3. Đăng Ký Phân Tích</span>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Chọn Dự Án Quan Tâm
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Masteri Grand Coast', 'Masteri Era Landmark'].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setProject(p)}
                          className={`py-3 px-4 rounded-xl text-xs font-semibold border transition-all text-center ${
                            project === p
                              ? 'bg-brand-red/10 border-brand-red text-white shadow-[0_0_15px_rgba(215,25,32,0.15)]'
                              : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Cơ Cấu Căn Hộ Mục Tiêu
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {['Studio', '1PN', '2PN', '3PN'].map((apt) => (
                        <button
                          key={apt}
                          type="button"
                          onClick={() => {
                            setApartmentType(apt);
                            // Adjust default prices based on types
                            if (apt === 'Studio') setBudget(2500);
                            if (apt === '1PN') setBudget(3200);
                            if (apt === '2PN') setBudget(4500);
                            if (apt === '3PN') setBudget(6000);
                          }}
                          className={`py-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                            apartmentType === apt
                              ? 'bg-brand-red/15 border-brand-red/60 text-brand-gold font-bold shadow-[0_0_12px_rgba(215,25,32,0.1)]'
                              : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {apt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <p className="text-xs text-gray-400 leading-relaxed font-sans">
                      💡 <strong className="text-brand-gold">Masteri Homes</strong> bàn giao kính full-height sang trọng, cách âm cách nhiệt tốt, hệ tiện ích Compound đặc quyền cực kỳ thích hợp cho gia đình có con nhỏ hoặc khách thuê sang trọng.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full mt-2 bg-brand-red hover:bg-brand-red/90 text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-[0_4px_20px_rgba(215,25,32,0.3)] hover:shadow-[0_4px_25px_rgba(215,25,32,0.5)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Tiếp Theo: Khả năng Tài Chính
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        Giá trị căn hộ mong muốn
                      </label>
                      <span className="text-sm font-mono font-bold text-brand-gold">
                        {formatCurrency(budget)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1500"
                      max="10000"
                      step="100"
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="w-full accent-brand-red bg-white/10 rounded-lg appearance-none h-2 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-1">
                      <span>1.5 Tỷ</span>
                      <span>5 Tỷ</span>
                      <span>10 Tỷ</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                          Vốn tự có ({downPaymentPct}%)
                        </label>
                      </div>
                      <select
                        value={downPaymentPct}
                        onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                        className="w-full bg-premium-dark border border-white/10 text-white rounded-xl py-2.5 px-3 text-xs focus:border-brand-red transition-all cursor-pointer outline-none"
                      >
                        <option value={15}>15% (Chính sách đặc biệt)</option>
                        <option value={20}>20% (Tiêu chuẩn)</option>
                        <option value={30}>30% (Khuyên dùng)</option>
                        <option value={50}>50% (Đầu tư an toàn)</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                          Thời gian vay ({loanTerm} năm)
                        </label>
                      </div>
                      <select
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Number(e.target.value))}
                        className="w-full bg-premium-dark border border-white/10 text-white rounded-xl py-2.5 px-3 text-xs focus:border-brand-red transition-all cursor-pointer outline-none"
                      >
                        <option value={10}>10 Năm</option>
                        <option value={15}>15 Năm</option>
                        <option value={20}>20 Năm</option>
                        <option value={25}>25 Năm</option>
                        <option value={35}>35 Năm (Max)</option>
                      </select>
                    </div>
                  </div>

                  {/* Dynamic Calculation Cards */}
                  <div className="bg-premium-dark/60 rounded-2xl p-4 border border-white/5 space-y-2 text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5 text-gray-400">
                      <span>Vốn tự có cần chuẩn bị:</span>
                      <span className="text-white font-semibold font-mono">{formatCurrency(equityNeeded)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-white/5 text-gray-400">
                      <span>Số tiền ngân hàng hỗ trợ:</span>
                      <span className="text-brand-gold font-semibold font-mono">{formatCurrency(loanAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-400">
                      <span className="flex items-center gap-1">
                        Thanh toán trung bình hằng tháng:
                        <small className="text-[9px] text-gray-500">(Gốc + Lãi giả định 8.5%)</small>
                      </span>
                      <span className="text-white font-bold font-mono text-sm">
                        ~{formatCurrency(monthlyPaymentTotal)}/tháng
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2.5">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 font-semibold py-3 px-4 rounded-xl transition-all border border-white/5 text-xs text-center cursor-pointer"
                    >
                      Quay Lại
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex-2 bg-brand-red hover:bg-brand-red/90 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-[0_4px_15px_rgba(215,25,32,0.3)] flex items-center justify-center gap-2 cursor-pointer text-xs"
                    >
                      Tiếp tục đăng ký tư vấn
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                        Họ & Tên Anh/Chị *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: Nguyễn Văn A"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full bg-premium-dark border border-white/10 focus:border-brand-red text-white text-xs rounded-xl p-3.5 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                        Số Điện Thoại / Zalo *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Ví dụ: 0912 xxx xxx"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full bg-premium-dark border border-white/10 focus:border-brand-red text-white text-xs rounded-xl p-3.5 outline-none transition-all"
                      />
                    </div>

                    <div className="p-3 bg-brand-gold/10 border border-brand-gold/25 rounded-2xl">
                      <p className="text-[11px] text-brand-gold/90 leading-relaxed">
                        💎 Quang sẽ liên hệ phân tích chuyên sâu cho anh/chị chính sách hỗ trợ lãi suất 0% lên tới 24-36 tháng áp dụng cho từng phân khu và quỹ căn hộ phù hợp!
                      </p>
                    </div>

                    <div className="flex gap-2.5 Pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 font-semibold py-3 px-4 rounded-xl transition-all border border-white/5 text-xs text-center cursor-pointer"
                      >
                        Quay Lại
                      </button>
                      <button
                        type="submit"
                        disabled={isSending}
                        className="flex-2 bg-gradient-to-r from-brand-red to-brand-red-dark hover:shadow-[0_0_20px_rgba(215,25,32,0.4)] text-white font-semibold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-xs disabled:opacity-50"
                      >
                        {isSending ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Đang gửi...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-white" />
                            Tư vấn chi tiết cho tôi
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 space-y-5"
          >
            <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2 text-green-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h4 className="text-xl font-bold text-white tracking-tight">
              Phân Tích Dòng Tiền Đã Sẵn Sàng!
            </h4>
            <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
              Chào anh/chị <strong className="text-brand-gold">{clientName}</strong>, bảng phân tích cơ bản dòng tiền mua căn hộ <strong className="text-white">{apartmentType}</strong> tại <strong className="text-white">{project}</strong> trị giá <strong className="text-brand-gold">{formatCurrency(budget)}</strong> đã được dựng thành công.
            </p>

            <div className="bg-white/5 p-4 rounded-2xl text-[11px] text-gray-400 text-left border border-white/5 space-y-1 my-3 font-mono">
              <div className="flex justify-between"><span className="text-gray-500">Khách hàng:</span> <span className="text-white font-medium">{clientName} - {clientPhone}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Dự án:</span> <span className="text-white font-medium">{project} ({apartmentType})</span></div>
              <div className="flex justify-between"><span className="text-gray-500 font-bold text-brand-gold">Vốn chuẩn bị:</span> <span className="text-brand-gold font-bold">{formatCurrency(equityNeeded)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Khách vay thêm:</span> <span className="text-white font-medium">{formatCurrency(loanAmount)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Gốc & Lãi ước tính:</span> <span className="text-white font-medium">~{formatCurrency(monthlyPaymentTotal)}/tháng</span></div>
            </div>

            {sendFeedback && (
              <div className={`p-3 rounded-xl text-xs text-left border ${
                sendFeedback.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                sendFeedback.type === 'warn' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                'bg-red-500/10 border-red-500/20 text-red-400'
              }`}>
                {sendFeedback.type === 'success' ? '📧 ' : '⚠️ '} {sendFeedback.message}
              </div>
            )}

            <p className="text-xs text-brand-gold font-semibold font-sans">
              🎁 Nhấn nút bên dưới để chuyển trực tiếp bảng tính toán chi tiết này qua Zalo cho Quang!
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={getZaloPrefilledUrl()}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-[0_4px_15px_rgba(74,222,128,0.2)] flex items-center justify-center gap-2 text-xs uppercase"
              >
                Gửi trực tiếp qua Zalo ngay
              </a>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setStep(1);
                  setClientName('');
                  setClientPhone('');
                }}
                className="bg-white/5 hover:bg-white/10 text-gray-400 font-semibold py-3 px-4 rounded-xl transition-all border border-white/5 text-xs text-center cursor-pointer"
              >
                Tính lại phương án khác
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
