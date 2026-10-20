import React, { useState } from 'react';
import {
  X,
  Award,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
  Printer,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Lightbulb,
  FileText,
  Check,
  Flame,
  BrainCircuit
} from 'lucide-react';
import { GradingResult, ErrorCategory, RemedialExercise } from '../types';

interface GradingDetailModalProps {
  result: GradingResult;
  onClose: () => void;
  onGenerateMoreDrills?: (targetError: string) => Promise<void>;
  isGeneratingDrills?: boolean;
}

const ERROR_CATEGORY_CONFIG: Record<
  ErrorCategory,
  { label: string; bg: string; text: string; border: string; desc: string }
> = {
  knowledge_gap: {
    label: 'Hổng kiến thức nền',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200',
    desc: 'Chưa nắm vững lý thuyết, định lý hoặc bản chất khái niệm'
  },
  calculation_error: {
    label: 'Lỗi tính toán / Đổi dấu',
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    desc: 'Nhầm lẫn số học, rút gọn phân số hoặc quy tắc đổi dấu khi chuyển vế'
  },
  reading_misunderstanding: {
    label: 'Hiểu sai / Đọc sót đề',
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
    desc: 'Không đọc kỹ điều kiện bài toán hoặc bỏ sót một phần câu hỏi'
  },
  grammar_spelling: {
    label: 'Ngữ pháp & Chính tả',
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
    desc: 'Sai quy tắc ngữ pháp, liên kết câu, lùi thì hoặc chính tả tiếng Việt'
  },
  presentation_incomplete: {
    label: 'Trình bày thiếu bước',
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    border: 'border-sky-200',
    desc: 'Làm tắt, thiếu điều kiện xác định hoặc thiếu câu kết luận'
  }
};

export const GradingDetailModal: React.FC<GradingDetailModalProps> = ({
  result,
  onClose,
  onGenerateMoreDrills,
  isGeneratingDrills = false,
}) => {
  const [activeTab, setActiveTab] = useState<'analysis' | 'original' | 'remedial'>('analysis');
  const [userDrillAnswers, setUserDrillAnswers] = useState<Record<string, string>>({});
  const [showDrillResults, setShowDrillResults] = useState<Record<string, boolean>>({});

  const handleSelectDrillOption = (drillId: string, option: string) => {
    setUserDrillAnswers((prev) => ({ ...prev, [drillId]: option }));
    setShowDrillResults((prev) => ({ ...prev, [drillId]: true }));
  };

  const handlePrint = () => {
    window.print();
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const ratio = score / maxScore;
    if (ratio >= 0.8) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (ratio >= 0.5) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              {result.totalScore.toFixed(1)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-lg leading-tight">
                  {result.studentName}
                </h3>
                {result.studentCode && (
                  <span className="text-xs text-slate-500 font-mono">
                    ({result.studentCode})
                  </span>
                )}
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-slate-200/80 text-slate-700">
                  {result.subject}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                {result.assignmentTitle} · Nộp lúc {result.submissionDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              title="In phiếu kết quả"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In phiếu chấm</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-slate-200 bg-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('analysis')}
              className={`px-3.5 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'analysis'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <BrainCircuit className="w-4 h-4" />
              <span>Phân tích & Truy gốc lỗi</span>
            </button>

            <button
              onClick={() => setActiveTab('remedial')}
              className={`px-3.5 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'remedial'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Bài tập luyện bù ({result.remedialExercises?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('original')}
              className={`px-3.5 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'original'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Bài làm gốc</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 hidden sm:block">
            Độ chính xác: <strong className="text-slate-800">{result.accuracyPercentage}%</strong>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: ANALYSIS & ROOT CAUSE */}
          {activeTab === 'analysis' && (
            <div className="space-y-6">
              {/* Pedagogical Summary Banner */}
              <div className="bg-gradient-to-r from-blue-50/80 via-teal-50/60 to-white p-4 sm:p-5 rounded-xl border border-blue-100 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                    Nhận xét sư phạm tổng thể từ AI
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    {result.scoreSummary}
                  </p>
                </div>
              </div>

              {/* Questions list with mistakes */}
              <div className="space-y-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Chi tiết từng câu và lỗi sai phát hiện
                </h4>

                {result.questions.map((q, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs"
                  >
                    {/* Question Header */}
                    <div className="p-4 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        {q.status === 'correct' ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : q.status === 'partial' ? (
                          <AlertTriangle className="w-5 h-5 text-amber-500" />
                        ) : (
                          <X className="w-5 h-5 text-rose-600" />
                        )}
                        <span className="font-bold text-slate-900 text-sm">
                          {q.questionNumber}
                        </span>
                        <span className="text-xs text-slate-500">
                          · {q.status === 'correct' ? 'Làm đúng hoàn toàn' : q.status === 'partial' ? 'Đúng một phần' : 'Chưa chính xác'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700">
                          {q.score} / {q.maxScore} điểm
                        </span>
                      </div>
                    </div>

                    {/* Question Content */}
                    <div className="p-4 sm:p-5 space-y-4">
                      {/* OCR Transcript */}
                      {q.ocrTranscribedText && (
                        <div className="text-xs bg-slate-50 p-3 rounded-lg border border-slate-100 text-slate-600">
                          <span className="font-semibold text-slate-700">Bài làm trích xuất: </span>
                          <span className="font-mono">{q.ocrTranscribedText}</span>
                        </div>
                      )}

                      {/* Analysis Text */}
                      <p className="text-sm text-slate-700">
                        {q.analysis}
                      </p>

                      {/* Mistakes list */}
                      {q.mistakes && q.mistakes.length > 0 ? (
                        <div className="space-y-3 pt-2">
                          <p className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Vị trí sai và truy nguyên nhân gốc rễ:</span>
                          </p>

                          {q.mistakes.map((m, mIdx) => {
                            const config = ERROR_CATEGORY_CONFIG[m.errorCategory] || ERROR_CATEGORY_CONFIG.knowledge_gap;
                            return (
                              <div
                                key={mIdx}
                                className="bg-slate-50/80 rounded-xl p-4 border border-slate-200 space-y-3"
                              >
                                {/* Step Header */}
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <span className="font-bold text-xs text-slate-800">
                                    📍 {m.lineOrStep}
                                  </span>
                                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${config.bg} ${config.text} ${config.border} border`}>
                                    {config.label}
                                  </span>
                                </div>

                                {/* Comparison Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                  <div className="p-3 rounded-lg bg-rose-50/70 border border-rose-200/80">
                                    <p className="font-bold text-rose-800 mb-1 flex items-center gap-1">
                                      <X className="w-3.5 h-3.5" />
                                      <span>Học sinh đã viết:</span>
                                    </p>
                                    <p className="font-mono text-rose-950 font-medium">
                                      {m.studentWrote}
                                    </p>
                                  </div>

                                  <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200/80">
                                    <p className="font-bold text-emerald-800 mb-1 flex items-center gap-1">
                                      <Check className="w-3.5 h-3.5" />
                                      <span>Cách sửa đúng:</span>
                                    </p>
                                    <p className="font-mono text-emerald-950 font-medium">
                                      {m.correctForm}
                                    </p>
                                  </div>
                                </div>

                                {/* Root Cause Diagnosis */}
                                <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200/70 space-y-1">
                                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                                    <Flame className="w-3.5 h-3.5 text-amber-600" />
                                    <span>Gốc rễ lỗi sai (Root Cause):</span>
                                  </div>
                                  <p className="text-xs text-amber-950 leading-relaxed">
                                    {m.rootCause}
                                  </p>
                                </div>

                                {/* AI Pedagogical Advice */}
                                <div className="flex items-start gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/70">
                                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                  <div>
                                    <strong className="text-slate-900">Lời khuyên của thầy cô AI: </strong>
                                    <span>{m.advice}</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-xs text-emerald-700 font-medium bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Học sinh thực hiện chuẩn xác, không có lỗi sai nào ở câu này.</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: REMEDIAL DRILLS */}
          {activeTab === 'remedial' && (
            <div className="space-y-6">
              <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Bài tập luyện bù cá nhân hóa (Error Remediation)</span>
                  </h4>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Được AI thiết kế tự động bám sát các nguyên nhân gốc rễ mà học sinh vừa mắc phải. Hãy làm thử để củng cố ngay kiến thức!
                  </p>
                </div>

                {onGenerateMoreDrills && (
                  <button
                    onClick={() => onGenerateMoreDrills(result.classErrorPatterns[0] || 'Luyện tập củng cố')}
                    disabled={isGeneratingDrills}
                    className="px-3 py-1.5 text-xs font-bold text-amber-900 bg-white border border-amber-300 rounded-lg hover:bg-amber-100 transition-colors shrink-0 flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingDrills ? 'animate-spin' : ''}`} />
                    <span>{isGeneratingDrills ? 'Đang tạo...' : 'Tạo thêm bài tập AI'}</span>
                  </button>
                )}
              </div>

              {/* Drills List */}
              <div className="space-y-4">
                {result.remedialExercises && result.remedialExercises.length > 0 ? (
                  result.remedialExercises.map((drill, dIdx) => {
                    const selected = userDrillAnswers[drill.id];
                    const isAnswered = showDrillResults[drill.id];
                    const isCorrect = selected === drill.correctAnswer;

                    return (
                      <div
                        key={drill.id || dIdx}
                        className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                            Câu {dIdx + 1} · {drill.title}
                          </span>
                          <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            Khắc phục: {drill.targetError}
                          </span>
                        </div>

                        <p className="text-sm font-semibold text-slate-800">
                          {drill.questionText}
                        </p>

                        {/* Options */}
                        {drill.options && drill.options.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {drill.options.map((opt, optIdx) => {
                              const isThisSelected = selected === opt;
                              let btnStyle = 'border-slate-200 hover:border-blue-400 bg-slate-50/70 text-slate-700';

                              if (isAnswered) {
                                if (opt === drill.correctAnswer) {
                                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                                } else if (isThisSelected) {
                                  btnStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                                }
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleSelectDrillOption(drill.id, opt)}
                                  className={`p-3 text-left text-xs rounded-lg border transition-all flex items-center justify-between ${btnStyle}`}
                                >
                                  <span>{opt}</span>
                                  {isAnswered && opt === drill.correctAnswer && (
                                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* Explanation feedback */}
                        {isAnswered && (
                          <div className={`p-3 rounded-lg text-xs space-y-1 ${isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'}`}>
                            <p className="font-bold flex items-center gap-1.5">
                              {isCorrect ? (
                                <>
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                  <span>Tuyệt vời! Bạn đã chọn đáp án chính xác.</span>
                                </>
                              ) : (
                                <>
                                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                                  <span>Chưa chính xác. Đáp án đúng là: {drill.correctAnswer}</span>
                                </>
                              )}
                            </p>
                            <p className="text-[11px] leading-relaxed opacity-90">
                              <strong>Giải thích:</strong> {drill.explanation}
                            </p>
                          </div>
                        )}

                        {/* Hint */}
                        {!isAnswered && drill.hint && (
                          <p className="text-[11px] text-slate-400 italic">
                            💡 Gợi ý: {drill.hint}
                          </p>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center text-xs text-slate-500 py-6">
                    Không có bài tập luyện bù nào được yêu cầu cho bài thi này.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: ORIGINAL SUBMISSION */}
          {activeTab === 'original' && (
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Dữ liệu bài làm đã nộp ({result.submissionType === 'image' ? 'Ảnh chụp vở ô li' : 'Văn bản trực tiếp'})
                </p>

                {result.imageUrl ? (
                  <div className="border border-slate-300 rounded-lg overflow-hidden bg-black/5 flex items-center justify-center p-2">
                    <img
                      src={result.imageUrl}
                      alt="Bài làm học sinh"
                      className="max-h-[500px] object-contain rounded"
                    />
                  </div>
                ) : (
                  <div className="bg-white p-4 rounded-lg border border-slate-200 font-mono text-xs whitespace-pre-wrap text-slate-800 leading-relaxed shadow-inner">
                    {result.rawText || 'Chưa có nội dung văn bản ghi nhận.'}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Mã bài:</span>
            <span className="font-mono font-bold text-slate-700">{result.assignmentId}</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
