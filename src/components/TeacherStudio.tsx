import React, { useState } from 'react';
import {
  Upload,
  Plus,
  Search,
  Filter,
  BarChart3,
  Award,
  Users,
  AlertCircle,
  FileText,
  ChevronRight,
  Sparkles,
  BookOpen,
  Share2,
  Check,
  TrendingUp,
  BrainCircuit,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { Assignment, GradingResult, ErrorCategory } from '../types';

interface TeacherStudioProps {
  assignments: Assignment[];
  submissions: GradingResult[];
  activeTab: 'submissions' | 'learning_wall' | 'assignments';
  onTabChange: (tab: 'submissions' | 'learning_wall' | 'assignments') => void;
  onOpenGradingDetail: (submission: GradingResult) => void;
  onStartNewGrading: () => void;
  onCreateAssignment: () => void;
  onSelectAssignmentForStudent: (code: string) => void;
}

export const TeacherStudio: React.FC<TeacherStudioProps> = ({
  assignments,
  submissions,
  activeTab,
  onTabChange,
  onOpenGradingDetail,
  onStartNewGrading,
  onCreateAssignment,
  onSelectAssignmentForStudent,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Compute metrics
  const totalSubmissions = submissions.length;
  const avgScore = totalSubmissions > 0
    ? (submissions.reduce((acc, curr) => acc + curr.totalScore, 0) / totalSubmissions).toFixed(1)
    : '0';
  const goodScoreCount = submissions.filter((s) => s.totalScore >= 7.0).length;
  const goodScorePercent = totalSubmissions > 0
    ? Math.round((goodScoreCount / totalSubmissions) * 100)
    : 0;

  // Filtered submissions
  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      sub.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.assignmentTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || sub.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  // Aggregate errors for the Learning Wall
  const errorCategoryCounts: Record<ErrorCategory, { count: number; affectedStudents: Set<string>; examples: string[] }> = {
    knowledge_gap: { count: 0, affectedStudents: new Set(), examples: [] },
    calculation_error: { count: 0, affectedStudents: new Set(), examples: [] },
    reading_misunderstanding: { count: 0, affectedStudents: new Set(), examples: [] },
    grammar_spelling: { count: 0, affectedStudents: new Set(), examples: [] },
    presentation_incomplete: { count: 0, affectedStudents: new Set(), examples: [] },
  };

  submissions.forEach((sub) => {
    sub.questions.forEach((q) => {
      q.mistakes.forEach((m) => {
        if (errorCategoryCounts[m.errorCategory]) {
          errorCategoryCounts[m.errorCategory].count += 1;
          errorCategoryCounts[m.errorCategory].affectedStudents.add(sub.studentName);
          if (errorCategoryCounts[m.errorCategory].examples.length < 3 && m.rootCause) {
            errorCategoryCounts[m.errorCategory].examples.push(m.rootCause);
          }
        }
      });
    });
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner & KPI Stat Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Tổng bài đã chấm</span>
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tabular-nums">
            {totalSubmissions} <span className="text-xs font-normal text-slate-500">bài</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>AI đã tự động phân loại lỗi</span>
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Điểm trung bình lớp</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tabular-nums">
            {avgScore} <span className="text-xs font-normal text-slate-500">/ 10</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Thang điểm chuẩn 10
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Tỷ lệ đạt Khá - Giỏi</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tabular-nums">
            {goodScorePercent}%
          </div>
          <p className="text-[11px] text-slate-500">
            {goodScoreCount} / {totalSubmissions} học sinh đạt ≥ 7.0
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Gốc lỗi cần bổ túc</span>
            <AlertCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-600 tabular-nums">
            {errorCategoryCounts.knowledge_gap.count + errorCategoryCounts.calculation_error.count} <span className="text-xs font-normal text-slate-500">điểm nghẽn</span>
          </div>
          <p className="text-[11px] text-rose-600 font-medium">
            Có bài tập luyện bù tự động
          </p>
        </div>
      </div>

      {/* Main Tab Controls & Quick Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        {/* Tab switchers */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => onTabChange('submissions')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'submissions'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Bài đã nộp ({submissions.length})
          </button>
          <button
            onClick={() => onTabChange('learning_wall')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'learning_wall'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-amber-600" />
            <span>Tường học tập & Truy gốc lỗi</span>
          </button>
          <button
            onClick={() => onTabChange('assignments')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'assignments'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Đề bài & Barem ({assignments.length})
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onCreateAssignment}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tạo đề mới</span>
          </button>
          <button
            onClick={onStartNewGrading}
            className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all flex items-center gap-1.5 active:scale-[0.98]"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Chấm bài mới bằng AI</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SUBMISSIONS LIST */}
      {activeTab === 'submissions' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Tìm tên học sinh hoặc tên đề bài..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {['all', 'Toán', 'Ngữ văn', 'Tiếng Anh'].map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    selectedSubject === sub
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {sub === 'all' ? 'Tất cả môn' : sub}
                </button>
              ))}
            </div>
          </div>

          {/* Submissions Table / Cards */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="divide-y divide-slate-100">
              {filteredSubmissions.length > 0 ? (
                filteredSubmissions.map((sub) => {
                  const mistakeCount = sub.questions.reduce((acc, q) => acc + q.mistakes.length, 0);
                  const isGood = sub.totalScore >= 7.0;

                  return (
                    <div
                      key={sub.id}
                      onClick={() => onOpenGradingDetail(sub)}
                      className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                    >
                      <div className="flex items-start sm:items-center gap-3.5">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base tabular-nums shrink-0 ${
                            sub.totalScore >= 8.0
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : sub.totalScore >= 5.0
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {sub.totalScore.toFixed(1)}
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                              {sub.studentName}
                            </span>
                            {sub.studentCode && (
                              <span className="text-xs text-slate-400 font-mono">
                                ({sub.studentCode})
                              </span>
                            )}
                            <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                              {sub.subject}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 font-medium line-clamp-1">
                            {sub.assignmentTitle}
                          </p>

                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            {sub.scoreSummary}
                          </p>
                        </div>
                      </div>

                      {/* Right metadata & Action */}
                      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                        <div className="text-right">
                          <div className="flex items-center gap-1.5 text-xs">
                            {mistakeCount > 0 ? (
                              <span className="text-rose-600 font-semibold bg-rose-50 px-2 py-0.5 rounded">
                                {mistakeCount} lỗi sai cần sửa
                              </span>
                            ) : (
                              <span className="text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                                Làm đúng hoàn toàn
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 mt-0.5 block">
                            {sub.submissionDate}
                          </span>
                        </div>

                        <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 flex items-center justify-center text-slate-400 transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-12 text-center text-slate-500 space-y-3">
                  <p className="text-sm">Không tìm thấy bài làm nào phù hợp với bộ lọc.</p>
                  <button
                    onClick={onStartNewGrading}
                    className="px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Bắt đầu chấm bài mới ngay
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LEARNING WALL (TUONG HOC TAP & TRUY GOC LOI) */}
      {activeTab === 'learning_wall' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 space-y-3 shadow-md relative overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-teal-300">
                ✦ Bản đồ sư phạm thông minh
              </span>
              <h3 className="text-2xl font-black tracking-tight">
                Tường Học Tập & Ma Trận Truy Gốc Lỗi Lớp Học
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Hệ thống tự động gom nhóm tất cả các lỗi sai từ bài kiểm tra của từng học sinh, tìm ra các lỗ hổng kiến thức phổ biến nhất để thầy cô tối ưu giáo án cho buổi học tiếp theo.
              </p>
            </div>
          </div>

          {/* Error Taxonomy Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* 1. Knowledge Gap */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                  Hổng kiến thức nền
                </span>
                <span className="text-lg font-black text-rose-600 tabular-nums">
                  {errorCategoryCounts.knowledge_gap.count} em
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Chưa nắm vững định lý, hằng đẳng thức mở rộng hoặc các công thức biến đổi cơ bản.
              </p>
              {errorCategoryCounts.knowledge_gap.examples.length > 0 && (
                <div className="text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-1">
                  <span className="font-bold text-slate-700">Ví dụ điển hình:</span>
                  <p className="text-slate-600 italic">
                    "{errorCategoryCounts.knowledge_gap.examples[0]}"
                  </p>
                </div>
              )}
              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                <strong>Học sinh cần chú ý: </strong>
                {Array.from(errorCategoryCounts.knowledge_gap.affectedStudents).join(', ') || 'Chưa ghi nhận'}
              </div>
            </div>

            {/* 2. Calculation Error */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                  Lỗi tính toán & Đổi dấu
                </span>
                <span className="text-lg font-black text-amber-600 tabular-nums">
                  {errorCategoryCounts.calculation_error.count} em
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Nhầm lẫn khi tính delta, quên nhân hệ số a ở mẫu số nghiệm hoặc sai dấu khi chuyển vế.
              </p>
              {errorCategoryCounts.calculation_error.examples.length > 0 && (
                <div className="text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-1">
                  <span className="font-bold text-slate-700">Ví dụ điển hình:</span>
                  <p className="text-slate-600 italic">
                    "{errorCategoryCounts.calculation_error.examples[0]}"
                  </p>
                </div>
              )}
              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                <strong>Học sinh cần chú ý: </strong>
                {Array.from(errorCategoryCounts.calculation_error.affectedStudents).join(', ') || 'Chưa ghi nhận'}
              </div>
            </div>

            {/* 3. Grammar & Spelling */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  Ngữ pháp & Diễn đạt
                </span>
                <span className="text-lg font-black text-indigo-600 tabular-nums">
                  {errorCategoryCounts.grammar_spelling.count} em
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Lỗi phối hợp thì (câu điều kiện loại 2), từ nối câu hoặc lỗi chính tả tiếng Việt.
              </p>
              {errorCategoryCounts.grammar_spelling.examples.length > 0 && (
                <div className="text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-1">
                  <span className="font-bold text-slate-700">Ví dụ điển hình:</span>
                  <p className="text-slate-600 italic">
                    "{errorCategoryCounts.grammar_spelling.examples[0]}"
                  </p>
                </div>
              )}
              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                <strong>Học sinh cần chú ý: </strong>
                {Array.from(errorCategoryCounts.grammar_spelling.affectedStudents).join(', ') || 'Chưa ghi nhận'}
              </div>
            </div>
          </div>

          {/* Pedagogical Action Plan for Teacher */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-blue-600" />
              <span>Đề xuất sư phạm cho tiết học tới:</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 space-y-1.5">
                <p className="font-bold text-blue-900">1. Dành 10 phút đầu giờ khởi động</p>
                <p className="text-blue-800 leading-relaxed">
                  Cho cả lớp làm nhanh 2 câu trắc nghiệm về quy tắc biến đổi tổng bình phương (x1² + x2² = S² - 2P) để dập tắt thói quen nhầm dấu +2P.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-100 space-y-1.5">
                <p className="font-bold text-teal-900">2. Nhắc nhở quy tắc chia cho 2a</p>
                <p className="text-teal-800 leading-relaxed">
                  Nhấn mạnh trường hợp phương trình có a ≠ 1, yêu cầu học sinh viết rõ 2*a ra giấy trước khi rút gọn nghiệm.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-100 space-y-1.5">
                <p className="font-bold text-amber-900">3. Phát phiếu bài tập bù</p>
                <p className="text-amber-800 leading-relaxed">
                  Gửi link bài tập luyện bù cá nhân hóa do AI tạo ra để các em tự hoàn thành và nhận phản hồi tức thì tại nhà.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ASSIGNMENTS & RUBRICS */}
      {activeTab === 'assignments' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {assignments.map((asg) => (
              <div
                key={asg.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-2xs space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg font-mono">
                      {asg.code}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {asg.grade} · {asg.subject}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-base leading-snug">
                    {asg.title}
                  </h4>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {asg.description}
                  </p>

                  {/* Rubric summary */}
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                      Tiêu chí barem ({asg.criteriaList.length} tiêu chí):
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {asg.criteriaList.map((crit) => (
                        <li key={crit.id} className="flex items-center justify-between">
                          <span className="truncate pr-2">{crit.name}</span>
                          <span className="font-bold font-mono text-slate-800 shrink-0">
                            {crit.maxScore}đ
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleCopyCode(asg.code)}
                    className="flex-1 py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {copiedCode === asg.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Đã sao chép</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Sao chép mã bài</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onSelectAssignmentForStudent(asg.code)}
                    className="py-2 px-3 text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span>Mở góc nộp bài</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
