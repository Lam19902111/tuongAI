import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Sparkles,
  FileText,
  Image as ImageIcon,
  Check,
  RefreshCw,
  BookOpen
} from 'lucide-react';
import { Assignment, GradingResult, SubjectType } from '../types';

interface TeacherGradingModalProps {
  assignments: Assignment[];
  onClose: () => void;
  onGradeComplete: (result: GradingResult) => void;
}

export const TeacherGradingModal: React.FC<TeacherGradingModalProps> = ({
  assignments,
  onClose,
  onGradeComplete,
}) => {
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string>(
    assignments[0]?.id || ''
  );
  const selectedAssignment =
    assignments.find((a) => a.id === selectedAssignmentId) || assignments[0];

  const [studentName, setStudentName] = useState('Phạm Hoàng Long');
  const [studentCode, setStudentCode] = useState('HS-09A1-32');
  const [submissionType, setSubmissionType] = useState<'upload' | 'text'>('upload');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [textAnswer, setTextAnswer] = useState<string>(`Bài làm của học sinh:
Câu 1:
2x² - 5x + 2 = 0
a = 2, b = -5, c = 2
Δ = (-5)² - 4*2*2 = 25 - 16 = 9
x1 = (5 + 3)/4 = 2
x2 = (5 - 3)/4 = 1/2

Câu 2:
x² - 6x + 5 = 0
x1 + x2 = 6, x1*x2 = 5
A = (x1+x2)² - 2x1x2 = 36 - 10 = 26.`);

  const [isGrading, setIsGrading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartGrading = async () => {
    if (!studentName.trim()) {
      alert('Vui lòng nhập tên học sinh.');
      return;
    }

    if (submissionType === 'upload' && !imagePreview) {
      alert('Vui lòng chọn ảnh bài làm học sinh.');
      return;
    }

    if (submissionType === 'text' && !textAnswer.trim()) {
      alert('Vui lòng nhập văn bản bài làm.');
      return;
    }

    setIsGrading(true);

    try {
      const res = await fetch('/api/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assignmentTitle: selectedAssignment.title,
          subject: selectedAssignment.subject,
          gradeLevel: selectedAssignment.grade,
          questionsAndRubric: selectedAssignment.questionsAndRubric,
          submissionType: submissionType === 'text' ? 'text' : 'image',
          image: imagePreview,
          textAnswer: textAnswer,
          studentName: studentName,
        }),
      });

      const resData = await res.json();
      if (resData.success && resData.data) {
        const fullResult: GradingResult = {
          id: `sub-${Date.now()}`,
          assignmentId: selectedAssignment.id,
          assignmentTitle: selectedAssignment.title,
          subject: selectedAssignment.subject,
          studentName: studentName,
          studentCode: studentCode,
          submissionDate: new Date().toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }),
          submissionType: submissionType === 'text' ? 'text' : 'image',
          imageUrl: imagePreview || undefined,
          rawText: textAnswer,
          totalScore: resData.data.totalScore || 8.0,
          maxScore: resData.data.maxScore || 10,
          accuracyPercentage: resData.data.accuracyPercentage || 80,
          scoreSummary: resData.data.scoreSummary || 'Chấm bài hoàn tất.',
          questions: resData.data.questions || [],
          classErrorPatterns: resData.data.classErrorPatterns || [],
          remedialExercises: resData.data.remedialExercises || [],
          status: 'graded',
        };

        onGradeComplete(fullResult);
        onClose();
      } else {
        throw new Error(resData.message || 'Lỗi xử lý chấm bài');
      }
    } catch (err: any) {
      console.error(err);
      alert('Lỗi chấm bài: ' + err.message);
    } finally {
      setIsGrading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Chấm bài mới bằng AI
              </h3>
              <p className="text-xs text-slate-500">
                Nhận diện chữ viết tay và đối chiếu barem điểm tự động
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          
          {/* Assignment Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Chọn đề bài kiểm tra
            </label>
            <select
              value={selectedAssignmentId}
              onChange={(e) => setSelectedAssignmentId(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-blue-500"
            >
              {assignments.map((a) => (
                <option key={a.id} value={a.id}>
                  [{a.code}] {a.title} ({a.subject})
                </option>
              ))}
            </select>
          </div>

          {/* Student Info */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tên học sinh *
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="VD: Nguyễn Tuấn Anh"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mã số học sinh
              </label>
              <input
                type="text"
                value={studentCode}
                onChange={(e) => setStudentCode(e.target.value)}
                placeholder="VD: HS-09A1-14"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Type Selector */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setSubmissionType('upload')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg border flex items-center justify-center gap-1.5 transition-colors ${
                submissionType === 'upload'
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Ảnh bài viết tay / Vở ô li</span>
            </button>

            <button
              type="button"
              onClick={() => setSubmissionType('text')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg border flex items-center justify-center gap-1.5 transition-colors ${
                submissionType === 'text'
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Văn bản bài làm</span>
            </button>
          </div>

          {/* Upload or Text Content */}
          {submissionType === 'upload' ? (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {imagePreview ? (
                <div className="space-y-2">
                  <div className="border border-slate-200 rounded-xl p-2 bg-slate-50 flex items-center justify-center max-h-56">
                    <img
                      src={imagePreview}
                      alt="Xem trước"
                      className="max-h-52 object-contain rounded"
                    />
                  </div>
                  <div className="flex justify-end gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-2.5 py-1 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded"
                    >
                      Đổi ảnh
                    </button>
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="px-2.5 py-1 text-rose-600 hover:bg-rose-50 rounded"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-blue-400 bg-slate-50 rounded-xl p-6 text-center cursor-pointer transition-colors space-y-2"
                >
                  <ImageIcon className="w-8 h-8 text-blue-500 mx-auto" />
                  <p className="text-xs font-bold text-slate-700">
                    Bấm để tải ảnh chụp bài thi của học sinh
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Hỗ trợ định dạng JPG, PNG
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Lời giải bài thi của học sinh:
              </label>
              <textarea
                rows={6}
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                className="w-full p-3 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
          >
            Hủy bỏ
          </button>

          <button
            onClick={handleStartGrading}
            disabled={isGrading}
            className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-60"
          >
            {isGrading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>AI đang chấm bài...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Chấm điểm ngay</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
