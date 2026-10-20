export type SubjectType = 'Toán' | 'Ngữ văn' | 'Tiếng Anh' | 'Khoa học' | 'Trắc nghiệm';

export type ErrorCategory =
  | 'knowledge_gap' // Hổng kiến thức nền / khái niệm
  | 'calculation_error' // Nhầm lẫn tính toán, đổi dấu, số học
  | 'reading_misunderstanding' // Đọc sót đề bài / hiểu sai yêu cầu
  | 'grammar_spelling' // Lỗi chính tả, ngữ pháp, diễn đạt
  | 'presentation_incomplete'; // Trình bày thiếu bước, thiếu điều kiện xác định

export interface MistakeDetail {
  lineOrStep: string;
  studentWrote: string;
  correctForm: string;
  errorCategory: ErrorCategory;
  rootCause: string;
  advice: string;
}

export interface QuestionResult {
  questionNumber: string;
  score: number;
  maxScore: number;
  status: 'correct' | 'partial' | 'incorrect';
  ocrTranscribedText: string;
  analysis: string;
  mistakes: MistakeDetail[];
}

export interface RemedialExercise {
  id: string;
  title: string;
  targetError: string;
  questionText: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  hint: string;
  userAnswer?: string;
  isCompleted?: boolean;
  isCorrect?: boolean;
}

export interface GradingResult {
  id: string;
  assignmentId: string;
  assignmentTitle: string;
  subject: SubjectType;
  studentName: string;
  studentCode?: string;
  submissionDate: string;
  submissionType: 'image' | 'text';
  imageUrl?: string;
  rawText?: string;
  totalScore: number;
  maxScore: number;
  accuracyPercentage: number;
  scoreSummary: string;
  questions: QuestionResult[];
  classErrorPatterns: string[];
  remedialExercises: RemedialExercise[];
  status: 'graded' | 'grading' | 'pending' | 'error';
  errorMessage?: string;
}

export interface RubricCriteria {
  id: string;
  name: string;
  maxScore: number;
  description: string;
}

export interface Assignment {
  id: string;
  code: string; // Mã chia sẻ bài, vd: TOAN9-GOC-01
  title: string;
  subject: SubjectType;
  grade: string;
  teacherName: string;
  description: string;
  questionsAndRubric: string;
  criteriaList: RubricCriteria[];
  createdAt: string;
  totalMaxScore: number;
  sampleSubmissions?: Partial<GradingResult>[];
}

export interface ClassErrorSummary {
  category: ErrorCategory;
  categoryLabel: string;
  count: number;
  percentage: number;
  frequentPatterns: string[];
  affectedStudents: string[];
  recommendedTeachingAction: string;
}
