import React, { useState } from 'react';
import { Camera, Sparkles, BookOpen, Eye, EyeOff, Lock, Mail, Shield, ArrowRight, UserCheck } from 'lucide-react';

interface AuthGatewayProps {
  onLoginTeacher: (email: string) => void;
  onEnterAsStudent: (code?: string) => void;
  onQuickDemo: (subject: string) => void;
}

export const AuthGateway: React.FC<AuthGatewayProps> = ({
  onLoginTeacher,
  onEnterAsStudent,
  onQuickDemo,
}) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('giao.vien@tuonghoctap.edu.vn');
  const [password, setPassword] = useState('giaovien2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [studentCodeInput, setStudentCodeInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginTeacher(email);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between bg-slate-50 relative overflow-hidden">
      {/* Background doodles watermark pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#1e40af 1px, transparent 1px), radial-gradient(#0d9488 1px, #f8fafc 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 w-full relative z-10 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          
          {/* Left Column: Brand & Hero Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Logo Badge */}
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-teal-400 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-white rounded-[14px] flex flex-col items-center justify-center p-1.5">
                  <span className="text-2xl" role="img" aria-label="owl">🦉</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                    Tường học tập
                  </h1>
                  <span className="bg-blue-600 text-white font-bold text-xs px-2 py-0.5 rounded-md shadow-sm">
                    AI
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-amber-600 font-semibold mt-0.5">
                  <span>✦</span>
                  <span className="uppercase tracking-wide">Truy gốc lỗi</span>
                  <span className="text-slate-400 font-normal">· Learning Wall AI — Error Root Tracer</span>
                </div>
              </div>
            </div>

            {/* Tagline & Headline */}
            <div>
              <p className="text-xs uppercase font-bold text-slate-500 tracking-widest mb-1.5">
                Mỗi ý tưởng đều có một chỗ
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Chụp bài, nộp bài, <span className="text-blue-600">AI chấm ngay.</span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Giáo viên chụp bài làm hoặc học sinh nộp bằng điện thoại. AI đọc cả chữ viết tay, cho điểm, chỉ đúng chỗ sai và gợi ý bài luyện thêm cho từng em.
            </p>

            {/* Feature Bullets */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Chụp ảnh vở ô li, giấy kiểm tra hoặc gõ bài trực tiếp.
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Hỗ trợ trích xuất chữ viết tay và công thức toán học sắc nét.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    AI chấm theo đáp án của thầy cô, chỉ lỗi sai từng dòng kèm cách sửa.
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Bóc tách nguyên nhân: nhầm công thức, sai dấu hay hổng kiến thức nền.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Định hướng luyện tập và bài tập gợi ý riêng cho mỗi em.
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Tạo ngay câu hỏi rèn luyện thích ứng để học sinh làm lại và gỡ điểm.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Demo Shortcuts */}
            <div className="pt-4 border-t border-slate-200">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Trải nghiệm nhanh các đề bài mẫu:
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => onQuickDemo('Toán')}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600 shadow-2xs transition-colors"
                >
                  📐 Bài kiểm tra Toán 9 (Viète)
                </button>
                <button
                  type="button"
                  onClick={() => onQuickDemo('Ngữ văn')}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600 shadow-2xs transition-colors"
                >
                  📖 Tập làm văn 8 (Hịch Tướng Sĩ)
                </button>
                <button
                  type="button"
                  onClick={() => onQuickDemo('Tiếng Anh')}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600 shadow-2xs transition-colors"
                >
                  🇬🇧 English 9 (Conditionals)
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Auth / Entry Card (Faithfully matching mockup) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-8 relative">
              {/* Tabs */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl mb-4">
                <button
                  type="button"
                  onClick={() => setTab('login')}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                    tab === 'login'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Đăng nhập
                </button>
                <button
                  type="button"
                  onClick={() => setTab('register')}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                    tab === 'register'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Đăng ký
                </button>
              </div>

              {/* Subtitle */}
              <p className="text-xs text-slate-600 leading-relaxed mb-6 bg-blue-50/60 p-3 rounded-lg border border-blue-100/70">
                <strong className="text-blue-900">Dành cho giáo viên.</strong> Học sinh vào lớp bằng <strong>đường link hoặc mã bài</strong> thầy cô gửi, không cần tạo tài khoản.
              </p>

              {/* Teacher Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email đã đăng ký"
                      required
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 transition-colors"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mật khẩu của bạn"
                      required
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 pr-16 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-2.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
                    >
                      {showPassword ? 'Ẩn' : 'Hiện'}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                    <span className="text-slate-700 font-medium">Ghi nhớ đăng nhập</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Vui lòng liên hệ quản trị viên nhà trường để cấp lại mật khẩu.')}
                    className="font-semibold text-blue-600 hover:text-blue-800"
                  >
                    Quên mật khẩu?
                  </button>
                </div>

                {/* Primary Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <span>{tab === 'login' ? 'Đăng nhập giáo viên' : 'Đăng ký tài khoản giáo viên'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Student Entry Section */}
              <div className="mt-6 pt-5 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Dành cho Học sinh nộp bài:</span>
                  <span className="text-[11px] text-teal-600 font-semibold bg-teal-50 px-2 py-0.5 rounded">
                    Không cần đăng ký
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={studentCodeInput}
                    onChange={(e) => setStudentCodeInput(e.target.value.toUpperCase())}
                    placeholder="Nhập mã bài (vd: TOAN9-VIETE-01)"
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => onEnterAsStudent(studentCodeInput || 'TOAN9-VIETE-01')}
                    className="px-3.5 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors shrink-0"
                  >
                    Vào nộp bài
                  </button>
                </div>
              </div>

              {/* Trust Footer Note */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-start gap-2.5 text-slate-500">
                <Shield className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  Dữ liệu lưu trên máy chủ Tường học tập AI. Mỗi giáo viên chỉ thấy bảng và bài của mình; học sinh chỉ thấy bài của em.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer bar */}
      <footer className="w-full bg-slate-900 text-slate-400 text-xs py-3.5 text-center font-medium border-t border-slate-800">
        Học Tập AI © 2026 · Nền tảng chấm bài & phân tích gốc rễ lỗi sai sư phạm
      </footer>
    </div>
  );
};
