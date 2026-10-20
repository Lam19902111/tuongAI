import React, { useState, useRef } from 'react';
import {
  Camera,
  Upload,
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  Image as ImageIcon,
  Check,
  RefreshCw,
  User,
  Hash
} from 'lucide-react';
import { Assignment, GradingResult } from '../types';

interface StudentPortalProps {
  assignments: Assignment[];
  selectedCode?: string;
  onGradeComplete: (result: GradingResult) => void;
  onBackToTeacher?: () => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  assignments,
  selectedCode = 'TOAN9-VIETE-01',
  onGradeComplete,
  onBackToTeacher,
}) => {
  const currentAssignment = assignments.find((a) => a.code === selectedCode) || assignments[0];

  const [studentName, setStudentName] = useState('Trần Văn Nam');
  const [studentCode, setStudentCode] = useState('HS-09A1-28');
  const [submissionMethod, setSubmissionMethod] = useState<'upload' | 'text' | 'camera'>('upload');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [textAnswer, setTextAnswer] = useState<string>(`Bài làm của em:
Câu 1:
Phương trình 2x² - 5x + 2 = 0
Hệ số: a = 2, b = -5, c = 2
Δ = (-5)² - 4*2*2 = 25 - 16 = 9 > 0
Vì Δ > 0 nên pt có 2 nghiệm phân biệt:
x1 = (5 + 3)/4 = 8/4 = 2
x2 = (5 - 3)/4 = 2/4 = 1/2

Câu 2:
Theo hệ thức Viète ta có:
S = x1 + x2 = -b/a = 6
P = x1 * x2 = c/a = 5
Tính A = x1² + x2² = (x1 + x2)² - 2*x1*x2 = 6² - 2*5 = 36 - 10 = 26.`);
  
  const [isGrading, setIsGrading] = useState(false);
  const [gradingStep, setGradingStep] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const GRADING_STEPS = [
    'Đang kết nối mô hình nhận diện chữ viết tay Gemini 3.8 Flash...',
    'Đang quét ảnh vở ô li & trích xuất công thức...',
    'Đang đối chiếu từng bước với barem điểm của thầy cô...',
    'Đang truy gốc rễ nguyên nhân sai sót từng dòng...',
    'Đang tạo bài tập rèn luyện bù cá nhân hóa...'
  ];

  // Handle image upload from file input
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

  // Start webcam
  const startCamera = async () => {
    try {
      setCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.warn('Camera not available or permission denied:', err);
      alert('Không thể mở camera. Vui lòng cho phép quyền truy cập camera hoặc chọn tải ảnh từ máy.');
      setCameraActive(false);
    }
  };

  // Capture snapshot from webcam
  const captureSnapshot = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setImagePreview(dataUrl);
        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  // Pre-load sample handwriting submission for instant testing
  const loadSampleHandwriting = () => {
    setSubmissionMethod('text');
    setTextAnswer(`Bài làm học sinh:
Câu 1: Giải phương trình 2x² - 5x + 2 = 0
a = 2, b = -5, c = 2
Δ = b² - 4ac = 25 - 16 = 9 > 0
x1 = (5 + 3)/2 = 4
x2 = (5 - 3)/2 = 1

Câu 2:
Cho x² - 6x + 5 = 0
x1 + x2 = 6; x1*x2 = 5
A = x1² + x2² = (x1+x2)² + 2x1x2
A = 36 + 10 = 46.`);
  };

  // Submit to server for AI Grading
  const handleSubmitGrading = async () => {
    if (!studentName.trim()) {
      alert('Vui lòng nhập tên học sinh.');
      return;
    }

    if (submissionMethod === 'upload' && !imagePreview) {
      alert('Vui lòng chọn hoặc chụp ảnh bài làm.');
      return;
    }

    if (submissionMethod === 'text' && !textAnswer.trim()) {
      alert('Vui lòng nhập nội dung bài làm.');
      return;
    }

    setIsGrading(true);
    setGradingStep(0);

    const stepInterval = setInterval(() => {
      setGradingStep((prev) => (prev < GRADING_STEPS.length - 1 ? prev + 1 : prev));
    }, 700);

    try {
      const response = await fetch('/api/grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assignmentTitle: currentAssignment.title,
          subject: currentAssignment.subject,
          gradeLevel: currentAssignment.grade,
          questionsAndRubric: currentAssignment.questionsAndRubric,
          submissionType: submissionMethod === 'text' ? 'text' : 'image',
          image: imagePreview,
          textAnswer: textAnswer,
          studentName: studentName,
        }),
      });

      clearInterval(stepInterval);

      const resData = await response.json();
      if (resData.success && resData.data) {
        const fullResult: GradingResult = {
          id: `sub-${Date.now()}`,
          assignmentId: currentAssignment.id,
          assignmentTitle: currentAssignment.title,
          subject: currentAssignment.subject,
          studentName: studentName,
          studentCode: studentCode,
          submissionDate: new Date().toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }),
          submissionType: submissionMethod === 'text' ? 'text' : 'image',
          imageUrl: imagePreview || undefined,
          rawText: textAnswer,
          totalScore: resData.data.totalScore || 7.5,
          maxScore: resData.data.maxScore || 10,
          accuracyPercentage: resData.data.accuracyPercentage || 75,
          scoreSummary: resData.data.scoreSummary || 'Đã hoàn thành chấm bài.',
          questions: resData.data.questions || [],
          classErrorPatterns: resData.data.classErrorPatterns || [],
          remedialExercises: resData.data.remedialExercises || [],
          status: 'graded',
        };

        onGradeComplete(fullResult);
      } else {
        throw new Error(resData.message || 'Chấm bài thất bại');
      }
    } catch (err: any) {
      clearInterval(stepInterval);
      console.error('Submit grading error:', err);
      alert('Có lỗi xảy ra khi chấm bài: ' + (err.message || 'Vui lòng thử lại.'));
    } finally {
      setIsGrading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
              {currentAssignment.code}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {currentAssignment.grade} · Môn {currentAssignment.subject}
            </span>
          </div>

          {onBackToTeacher && (
            <button
              onClick={onBackToTeacher}
              className="text-xs text-slate-500 hover:text-blue-600 transition-colors font-medium"
            >
              ← Quay lại bàn làm việc Giáo viên
            </button>
          )}
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {currentAssignment.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
            {currentAssignment.description}
          </p>
        </div>

        {/* Barem Preview */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1.5">
          <span className="font-bold text-slate-700 uppercase tracking-wider block">
            Barem điểm của thầy cô ({currentAssignment.totalMaxScore} điểm tối đa):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-600">
            {currentAssignment.criteriaList.map((c) => (
              <div key={c.id} className="bg-white p-2 rounded border border-slate-200/70">
                <span className="font-semibold text-slate-800">{c.name}</span>
                <span className="text-blue-600 font-bold ml-1">({c.maxScore}đ)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Profile Info */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <User className="w-4 h-4 text-blue-600" />
          <span>Thông tin học sinh nộp bài</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Họ và tên học sinh *
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Nhập họ và tên..."
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mã học sinh / Số báo danh
            </label>
            <input
              type="text"
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
              placeholder="VD: HS-09A1-28"
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-slate-900 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Submission Method & Content */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Chọn cách nộp bài
          </h3>

          <button
            type="button"
            onClick={loadSampleHandwriting}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 py-1 rounded-lg transition-colors"
          >
            ⚡ Dán bài làm mẫu để thử AI
          </button>
        </div>

        {/* Method selector tabs */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setSubmissionMethod('upload')}
            className={`py-3 px-3 text-xs font-bold rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
              submissionMethod === 'upload'
                ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-2xs'
                : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Upload className="w-5 h-5" />
            <span>Tải ảnh bài làm</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSubmissionMethod('camera');
              startCamera();
            }}
            className={`py-3 px-3 text-xs font-bold rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
              submissionMethod === 'camera'
                ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-2xs'
                : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Camera className="w-5 h-5" />
            <span>Chụp ảnh camera</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSubmissionMethod('text');
              stopCamera();
            }}
            className={`py-3 px-3 text-xs font-bold rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
              submissionMethod === 'text'
                ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-2xs'
                : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>Gõ bài trực tiếp</span>
          </button>
        </div>

        {/* METHOD 1: UPLOAD PHOTO */}
        {submissionMethod === 'upload' && (
          <div className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {imagePreview ? (
              <div className="space-y-3">
                <div className="relative border border-slate-200 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center p-2 max-h-80">
                  <img
                    src={imagePreview}
                    alt="Xem trước bài làm"
                    className="max-h-72 object-contain rounded"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Chọn ảnh khác
                  </button>
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    Xóa ảnh
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-blue-400 bg-slate-50/60 rounded-2xl p-8 text-center cursor-pointer transition-colors space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 mx-auto flex items-center justify-center">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-800">
                    Bấm để tải ảnh chụp bài làm hoặc kéo thả vào đây
                  </p>
                  <p className="text-xs text-slate-500">
                    Hỗ trợ ảnh vở ô li, giấy kiểm tra viết tay định dạng JPG, PNG
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* METHOD 2: CAMERA */}
        {submissionMethod === 'camera' && (
          <div className="space-y-4">
            <div className="relative bg-black rounded-xl overflow-hidden aspect-video flex items-center justify-center">
              <video
                ref={videoRef}
                playsInline
                autoPlay
                className="w-full h-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />

              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <button
                  type="button"
                  onClick={captureSnapshot}
                  className="w-14 h-14 rounded-full bg-white border-4 border-blue-500 shadow-lg flex items-center justify-center active:scale-95 transition-transform"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-600" />
                </button>
              </div>
            </div>

            {imagePreview && (
              <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                <span className="font-semibold">✓ Đã chụp ảnh bài làm thành công!</span>
                <button
                  type="button"
                  onClick={() => setImagePreview(null)}
                  className="text-rose-600 font-bold"
                >
                  Chụp lại
                </button>
              </div>
            )}
          </div>
        )}

        {/* METHOD 3: TEXT EDITOR */}
        {submissionMethod === 'text' && (
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              Nhập lời giải bài làm (gõ trực tiếp):
            </label>
            <textarea
              rows={9}
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              placeholder="Gõ lời giải từng câu của bạn vào đây..."
              className="w-full p-4 text-xs font-mono bg-amber-50/20 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 leading-relaxed shadow-inner"
            />
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleSubmitGrading}
            disabled={isGrading}
            className="w-full py-3.5 px-6 font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isGrading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI đang chấm bài... ({gradingStep + 1}/{GRADING_STEPS.length})</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Nộp bài & AI chấm ngay</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Live Grading Progress Bar */}
        {isGrading && (
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-2">
            <div className="flex items-center justify-between text-xs text-blue-900 font-bold">
              <span>{GRADING_STEPS[gradingStep]}</span>
              <span className="tabular-nums font-mono">
                {Math.round(((gradingStep + 1) / GRADING_STEPS.length) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${((gradingStep + 1) / GRADING_STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
