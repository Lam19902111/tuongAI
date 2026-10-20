import React from 'react';
import { GraduationCap, BookOpen, BarChart3, Upload, UserCheck, Shield } from 'lucide-react';

interface HeaderProps {
  currentView: 'teacher' | 'learning_wall' | 'assignments' | 'student';
  onNavigate: (view: 'teacher' | 'learning_wall' | 'assignments' | 'student') => void;
  userRole: 'teacher' | 'student' | null;
  onLogout: () => void;
  onOpenNewGrading: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  userRole,
  onLogout,
  onOpenNewGrading,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => onNavigate(userRole === 'student' ? 'student' : 'teacher')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-teal-400 flex items-center justify-center text-white shadow-sm">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 whitespace-nowrap">
                Tường học tập
              </span>
              <span className="bg-blue-600 text-white font-bold text-[11px] px-1.5 py-0.5 rounded uppercase tracking-wider">
                AI
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block whitespace-nowrap">
              Truy gốc lỗi · Learning Wall AI
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {userRole === 'teacher' ? (
            <>
              <button
                onClick={() => onNavigate('teacher')}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  currentView === 'teacher'
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Bài làm & Chấm điểm
              </button>
              <button
                onClick={() => onNavigate('learning_wall')}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  currentView === 'learning_wall'
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <BarChart3 className="w-4 h-4 text-amber-500" />
                Tường học tập cả lớp
              </button>
              <button
                onClick={() => onNavigate('assignments')}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  currentView === 'assignments'
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-4 h-4 text-emerald-500" />
                Đề bài & Barem
              </button>
            </>
          ) : (
            <button
              onClick={() => onNavigate('student')}
              className="px-3 py-2 text-sm font-semibold rounded-lg text-blue-700 bg-blue-50 whitespace-nowrap"
            >
              Góc học sinh nộp bài
            </button>
          )}

          {/* Quick switch role */}
          <button
            onClick={() => onNavigate(userRole === 'teacher' ? 'student' : 'teacher')}
            className="text-xs text-slate-500 hover:text-blue-600 px-2 py-1.5 rounded transition-colors whitespace-nowrap border border-dashed border-slate-200"
            title="Đổi vai trò kiểm thử"
          >
            {userRole === 'teacher' ? 'Xem giao diện Học sinh' : 'Chuyển quyền Giáo viên'}
          </button>
        </nav>

        {/* Action Zone */}
        <div className="flex items-center gap-3 shrink-0">
          {userRole === 'teacher' ? (
            <button
              onClick={onOpenNewGrading}
              className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg shadow-sm hover:from-blue-700 hover:to-teal-700 transition-all active:scale-[0.98] whitespace-nowrap"
            >
              <Upload className="w-4 h-4" />
              <span>Chấm bài mới</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Chế độ Học sinh</span>
            </div>
          )}

          {userRole && (
            <button
              onClick={onLogout}
              className="text-xs text-slate-400 hover:text-rose-600 px-2 py-1.5 transition-colors whitespace-nowrap"
            >
              Đăng xuất
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
