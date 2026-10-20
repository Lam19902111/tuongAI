import { Assignment, GradingResult } from '../types';

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-math-01',
    code: 'TOAN9-VIETE-01',
    title: 'Kiểm tra 15 phút: Phương trình bậc hai & Hệ thức Viète',
    subject: 'Toán',
    grade: 'Lớp 9',
    teacherName: 'Thầy Nguyễn Văn Thành',
    description: 'Chấm bài giải phương trình và ứng dụng định lý Viète để tìm hai số khi biết tổng và tích.',
    createdAt: '2026-10-18',
    totalMaxScore: 10,
    criteriaList: [
      { id: 'c1', name: 'Xác định hệ số a, b, c và tính biệt thức Delta', maxScore: 2.5, description: 'Đúng công thức delta = b^2 - 4ac' },
      { id: 'c2', name: 'Biện luận số nghiệm và tìm nghiệm chính xác', maxScore: 3.5, description: 'Áp dụng đúng công thức nghiệm' },
      { id: 'c3', name: 'Vận dụng hệ thức Viète tính giá trị biểu thức', maxScore: 4.0, description: 'Biến đổi x1^2 + x2^2 = (x1+x2)^2 - 2x1x2' }
    ],
    questionsAndRubric: `
ĐỀ BÀI VÀ ĐÁP ÁN BAREM:
Câu 1 (5.0 điểm): Giải phương trình bậc hai: 2x² - 5x + 2 = 0.
- Bước 1: Xác định a = 2, b = -5, c = 2. (0.5 điểm)
- Bước 2: Tính Δ = (-5)² - 4*2*2 = 25 - 16 = 9 > 0. Vì Δ > 0 nên PT có 2 nghiệm phân biệt. (2.0 điểm)
- Bước 3: Nghiệm x1 = (-(-5) + √9)/(2*2) = (5 + 3)/4 = 2. (1.25 điểm)
- Bước 4: Nghiệm x2 = (-(-5) - √9)/(2*2) = (5 - 3)/4 = 0.5 (hoặc 1/2). (1.25 điểm)

Câu 2 (5.0 điểm): Cho phương trình x² - 6x + 5 = 0 có hai nghiệm x1, x2. Không giải phương trình, hãy tính giá trị biểu thức A = x1² + x2².
- Bước 1: Theo hệ thức Viète: S = x1 + x2 = -b/a = 6; P = x1*x2 = c/a = 5. (2.0 điểm)
- Bước 2: Biến đổi A = (x1 + x2)² - 2x1x2. (1.5 điểm)
- Bước 3: Thay số A = 6² - 2*5 = 36 - 10 = 26. Kết luận A = 26. (1.5 điểm)
`
  },
  {
    id: 'asg-lit-02',
    code: 'VAN8-HICHTUONGSI-02',
    title: 'Tập làm văn: Đoạn văn phân tích lòng yêu nước trong Hịch Tướng Sĩ',
    subject: 'Ngữ văn',
    grade: 'Lớp 8',
    teacherName: 'Cô Trần Thị Thu Trang',
    description: 'Chấm đoạn văn tổng - phân - hợp phân tích lòng căm thù giặc sâu sắc của Trần Quốc Tuấn.',
    createdAt: '2026-10-15',
    totalMaxScore: 10,
    criteriaList: [
      { id: 'c1', name: 'Đúng hình thức đoạn văn Tổng - Phân - Hợp (12-15 câu)', maxScore: 2.0, description: 'Có câu mở đoạn và kết đoạn rõ ràng' },
      { id: 'c2', name: 'Nội dung làm nổi bật tâm trạng căm uất và ý chí quyết chiến', maxScore: 5.0, description: 'Phân tích được chi tiết quên ăn, vỗ gối, ruột đau như cắt' },
      { id: 'c3', name: 'Chính tả, ngữ pháp, liên kết câu và giọng văn truyền cảm', maxScore: 3.0, description: 'Không sai chính tả, câu từ mạch lạc' }
    ],
    questionsAndRubric: `
ĐỀ BÀI VÀ BAREM:
Viết đoạn văn khoảng 12 - 15 câu theo phép lập luận Tổng - Phân - Hợp làm rõ lòng yêu nước nồng nàn và nỗi căm giặc đến tột cùng của Trần Quốc Tuấn trong đoạn trích: "Ta thường tới bữa quên ăn, nửa đêm vỗ gối... dẫu cho trăm thân này phơi ngoài nội cỏ, nghìn xác này gói trong da ngựa, ta cũng vui lòng."
- Mở đoạn (1.5 điểm): Giới thiệu tác giả Trần Quốc Tuấn, tác phẩm và dẫn dắt vào tấm lòng yêu nước thương dân.
- Thân đoạn (6.0 điểm):
  + Phân tích hành động, tâm trạng: quên ăn, nửa đêm vỗ gối, ruột đau như cắt, nước mắt đầm đìa (2.0 điểm)
  + Nỗi uất hận cao độ khi chưa xả thịt lột da nuốt gan uống máu quân thù (2.0 điểm)
  + Lời thề quyết tử hi sinh thân mình vì độc lập xã tắc (2.0 điểm)
- Kết đoạn (1.5 điểm): Khẳng định vẻ đẹp nhân cách người anh hùng dân tộc. (1.5 điểm)
- Trừ điểm: Sai chính tả từ 3 lỗi trở lên (-0.5 điểm), thiếu câu chủ đề (-1.0 điểm).
`
  },
  {
    id: 'asg-eng-03',
    code: 'ENG9-COND-03',
    title: 'English 9: Conditional Sentences & Environment Vocabulary',
    subject: 'Tiếng Anh',
    grade: 'Lớp 9',
    teacherName: 'Cô Lê Phương Thảo',
    description: 'Kiểm tra cấu trúc câu điều kiện loại 1 & 2 và từ vựng bảo vệ môi trường.',
    createdAt: '2026-10-12',
    totalMaxScore: 10,
    criteriaList: [
      { id: 'c1', name: 'Cấu trúc câu điều kiện loại 1 (If + Present Simple, will + V-inf)', maxScore: 3.0, description: 'Đúng thì ở cả 2 vế' },
      { id: 'c2', name: 'Cấu trúc câu điều kiện loại 2 (If + Past Simple, would + V-inf)', maxScore: 4.0, description: 'Đúng were cho mọi ngôi và would' },
      { id: 'c3', name: 'Viết lại câu không đổi nghĩa và chính tả từ vựng', maxScore: 3.0, description: 'Sử dụng Unless, provide that chính xác' }
    ],
    questionsAndRubric: `
EXAM QUESTIONS & RUBRIC:
Question 1 (2.5 pts): Put verbs in brackets into correct conditional form:
a) If we (continue) _______ polluting the water, we won't have enough fresh water.
-> Key: continue (1.25 pts)
b) If people stopped cutting down forests, animals (not lose) _______ their habitats.
-> Key: would not lose / wouldn't lose (1.25 pts)

Question 2 (5.0 pts): Rewrite the following sentences:
a) "You don't study hard, so you won't pass the exam." (Use "If...")
-> Key: If you studied hard, you would pass the exam. OR If you don't study hard, you won't pass the exam. (2.5 pts)
b) "I don't have a bicycle, so I can't cycle to school." (Use Conditional Type 2)
-> Key: If I had a bicycle, I could cycle to school. (2.5 pts)

Question 3 (2.5 pts): Write 2 sentences suggesting ways to reduce plastic waste using "If we...".
-> Key: Correct grammar, logical advice on saving environment. (2.5 pts)
`
  }
];

export const INITIAL_SUBMISSIONS: GradingResult[] = [
  {
    id: 'sub-01',
    assignmentId: 'asg-math-01',
    assignmentTitle: 'Kiểm tra 15 phút: Phương trình bậc hai & Hệ thức Viète',
    subject: 'Toán',
    studentName: 'Nguyễn Tuấn Anh',
    studentCode: 'HS-09A1-14',
    submissionDate: '2026-10-18 09:25',
    submissionType: 'text',
    rawText: `Bài làm:
Câu 1:
Phương trình: 2x² - 5x + 2 = 0
a = 2, b = -5, c = 2
Δ = b² - 4ac = (-5)² - 4*2*2 = 25 - 16 = 9 > 0
Vì Δ > 0 nên pt có 2 nghiệm phân biệt:
x1 = (5 + 3) / 4 = 8 / 4 = 2
x2 = (5 - 3) / 4 = 2 / 4 = 1/2
Vậy pt có tập nghiệm S = {2; 1/2}.

Câu 2:
x² - 6x + 5 = 0
Theo Vi-et ta có:
x1 + x2 = -b/a = -(-6)/1 = 6
x1 * x2 = c/a = 5/1 = 5
Tính A = x1² + x2²:
A = (x1 + x2)² + 2*x1*x2
Thay số: A = 6² + 2*5 = 36 + 10 = 46.
Vậy A = 46.`,
    totalScore: 7.5,
    maxScore: 10,
    accuracyPercentage: 75,
    scoreSummary: 'Học sinh nắm rất vững công thức giải phương trình bậc hai ở Câu 1 (đạt điểm tuyệt đối). Tuy nhiên ở Câu 2 bị nhầm lẫn công thức hằng đẳng thức mở rộng (đổi dấu nhầm từ -2ab thành +2ab), dẫn đến sai toàn bộ kết quả biểu thức A.',
    questions: [
      {
        questionNumber: 'Câu 1',
        score: 5.0,
        maxScore: 5.0,
        status: 'correct',
        ocrTranscribedText: 'Giải đúng delta = 9, tính chính xác 2 nghiệm x1 = 2 và x2 = 1/2.',
        analysis: 'Trình bày rõ ràng, tính toán chuẩn xác từng bước.',
        mistakes: []
      },
      {
        questionNumber: 'Câu 2',
        score: 2.5,
        maxScore: 5.0,
        status: 'partial',
        ocrTranscribedText: 'Tính đúng tổng S = 6 và tích P = 5 theo Viète. Bước biến đổi viết A = (x1 + x2)² + 2x1x2.',
        analysis: 'Học sinh nhớ đúng hệ thức Viète (đạt 2.0đ đầu). Nhưng áp dụng sai hằng đẳng thức mở rộng x1² + x2² = (x1+x2)² - 2x1x2, học sinh lại viết dấu cộng.',
        mistakes: [
          {
            lineOrStep: 'Dòng 5, Câu 2: Biến đổi hằng đẳng thức tổng bình phương',
            studentWrote: 'A = (x1 + x2)² + 2*x1*x2 = 6² + 10 = 46',
            correctForm: 'A = (x1 + x2)² - 2*x1*x2 = 6² - 2*5 = 36 - 10 = 26',
            errorCategory: 'knowledge_gap',
            rootCause: 'Nhầm lẫn giữa hằng đẳng thức (a+b)² = a² + 2ab + b² => a² + b² = (a+b)² - 2ab. Học sinh nhớ máy móc và giữ nguyên dấu cộng thay vì trừ đi lượng 2ab thừa.',
            advice: 'Ghi nhớ quy tắc bù trừ: (x1 + x2)² đã chứa sẵn +2x1x2, do đó để còn lại x1² + x2² thì bắt buộc phải TRỪ đi 2x1x2.'
          }
        ]
      }
    ],
    classErrorPatterns: [
      'Nhầm lẫn hằng đẳng thức khi biến đổi biểu thức đối xứng Viète (x1² + x2²)'
    ],
    remedialExercises: [
      {
        id: 'rem-01',
        title: 'Luyện tập biến đổi hằng đẳng thức Viète',
        targetError: 'Công thức biến đổi x1² + x2² theo S và P',
        questionText: 'Cho phương trình có hai nghiệm x1, x2 với tổng S = x1 + x2 = 4 và tích P = x1*x2 = 1. Giá trị của biểu thức B = x1² + x2² là bao nhiêu?',
        options: ['A. 18', 'B. 14', 'C. 16', 'D. 12'],
        correctAnswer: 'B. 14',
        explanation: 'Ta có B = (x1 + x2)² - 2x1x2 = 4² - 2*1 = 16 - 2 = 14.',
        hint: 'Nhớ công thức: a² + b² = (a+b)² - 2ab!'
      },
      {
        id: 'rem-02',
        title: 'Phân biệt dấu khi biến đổi biểu thức',
        targetError: 'Biến đổi biểu thức chứa tổng bình phương',
        questionText: 'Nếu x1 + x2 = 5 và x1*x2 = 6, giá trị của (x1 - x2)² tính theo S và P là gì?',
        options: ['A. S² - 2P', 'B. S² - 4P', 'C. S² + 4P', 'D. S² - P'],
        correctAnswer: 'B. S² - 4P',
        explanation: 'Vì (x1 - x2)² = x1² - 2x1x2 + x2² = (x1+x2)² - 4x1x2 = S² - 4P.',
        hint: 'Khai triển (x1 - x2)² và so sánh với (x1 + x2)².'
      }
    ],
    status: 'graded'
  },
  {
    id: 'sub-02',
    assignmentId: 'asg-math-01',
    assignmentTitle: 'Kiểm tra 15 phút: Phương trình bậc hai & Hệ thức Viète',
    subject: 'Toán',
    studentName: 'Lê Hoàng Mai',
    studentCode: 'HS-09A1-22',
    submissionDate: '2026-10-18 09:30',
    submissionType: 'text',
    rawText: `Bài làm:
Câu 1:
2x² - 5x + 2 = 0
Δ = (-5)² - 4*2*2 = 25 - 16 = 9
x1 = (5 + 3)/2 = 4
x2 = (5 - 3)/2 = 1

Câu 2:
x² - 6x + 5 = 0
S = 6, P = 5
A = (x1+x2)² - 2x1x2 = 36 - 10 = 26`,
    totalScore: 7.0,
    maxScore: 10,
    accuracyPercentage: 70,
    scoreSummary: 'Câu 2 làm hoàn hảo. Tuy nhiên ở Câu 1, học sinh mắc lỗi điển hình ở mẫu số công thức nghiệm: chia cho 2 thay vì chia cho 2a (2*2 = 4), dẫn đến hai nghiệm sai.',
    questions: [
      {
        questionNumber: 'Câu 1',
        score: 2.0,
        maxScore: 5.0,
        status: 'partial',
        ocrTranscribedText: 'Tính đúng delta = 9. Nhưng mẫu số công thức nghiệm chỉ ghi mẫu là 2 thay vì 2a = 4.',
        analysis: 'Tính delta tốt nhưng nhầm công thức nghiệm cơ bản mẫu số x = (-b ± √Δ)/(2a).',
        mistakes: [
          {
            lineOrStep: 'Dòng 4, Câu 1: Áp dụng công thức nghiệm',
            studentWrote: 'x1 = (5 + 3)/2 = 4; x2 = (5 - 3)/2 = 1',
            correctForm: 'x1 = (5 + 3)/(2*2) = 8/4 = 2; x2 = (5 - 3)/(2*2) = 2/4 = 1/2',
            errorCategory: 'calculation_error',
            rootCause: 'Quên nhân hệ số a ở mẫu số. Trong đầu ghi nhớ nhầm công thức là chia cho 2 thay vì chia cho 2a (do hay làm bài tập có hệ số a=1).',
            advice: 'Luôn viết rõ 2*a (trong bài này là 2*2 = 4) vào mẫu số trước khi rút gọn.'
          }
        ]
      },
      {
        questionNumber: 'Câu 2',
        score: 5.0,
        maxScore: 5.0,
        status: 'correct',
        ocrTranscribedText: 'Làm chuẩn xác A = 26.',
        analysis: 'Lời giải chính xác, nhớ đúng hằng đẳng thức.',
        mistakes: []
      }
    ],
    classErrorPatterns: [
      'Quên nhân hệ số a ở mẫu số công thức nghiệm (-b ± √Δ)/(2a)'
    ],
    remedialExercises: [
      {
        id: 'rem-03',
        title: 'Luyện tập công thức nghiệm với a khác 1',
        targetError: 'Mẫu số của nghiệm phương trình bậc 2',
        questionText: 'Với phương trình 3x² - 7x + 2 = 0, mẫu số của công thức nghiệm x = (-b ± √Δ) / ? là:',
        options: ['A. 2', 'B. 3', 'C. 6', 'D. 9'],
        correctAnswer: 'C. 6',
        explanation: 'Mẫu số là 2*a = 2*3 = 6.',
        hint: 'Nhớ là 2 nhân với hệ số a đứng trước x².'
      }
    ],
    status: 'graded'
  },
  {
    id: 'sub-03',
    assignmentId: 'asg-eng-03',
    assignmentTitle: 'English 9: Conditional Sentences & Environment Vocabulary',
    subject: 'Tiếng Anh',
    studentName: 'Trần Minh Quân',
    studentCode: 'HS-09A3-08',
    submissionDate: '2026-10-17 14:10',
    submissionType: 'text',
    rawText: `Answer:
Question 1:
a) If we continue polluting the water, we won't have enough fresh water.
b) If people stopped cutting down forests, animals will not lose their habitats.

Question 2:
a) If you studied hard, you would pass the exam.
b) If I had a bicycle, I can cycle to school.

Question 3:
1. If we reuse plastic bottles, we will protect the environment.
2. If we plant more trees, the air will be cleaner.`,
    totalScore: 7.5,
    maxScore: 10,
    accuracyPercentage: 75,
    scoreSummary: 'Nắm được cấu trúc câu điều kiện loại 1 và viết câu tự luận tốt. Tuy nhiên trong câu điều kiện loại 2 còn bị lẫn lộn giữa will/would và can/could.',
    questions: [
      {
        questionNumber: 'Question 1',
        score: 1.25,
        maxScore: 2.5,
        status: 'partial',
        ocrTranscribedText: 'Câu 1a đúng "continue". Câu 1b ghi "will not lose" thay vì "would not lose".',
        analysis: 'Ở câu b vế If dùng "stopped" (quá khứ đơn - loại 2) nhưng vế chính lại dùng "will not" của loại 1.',
        mistakes: [
          {
            lineOrStep: 'Question 1b',
            studentWrote: 'animals will not lose their habitats',
            correctForm: 'animals would not lose their habitats',
            errorCategory: 'knowledge_gap',
            rootCause: 'Không nhất quán giữa vế điều kiện và vế kết quả của câu điều kiện loại 2 (If + S + V-ed/2, S + would/could + V-inf).',
            advice: 'Ghi nhớ cặp thì: Quá khứ đơn (V2/ed) đi cùng với WOULD/COULD + V-nguyên thể.'
          }
        ]
      },
      {
        questionNumber: 'Question 2',
        score: 3.75,
        maxScore: 5.0,
        status: 'partial',
        ocrTranscribedText: 'Câu 2a viết chuẩn. Câu 2b viết "I can cycle" thay vì "I could cycle".',
        analysis: 'Vế If dùng "had" nhưng vế sau dùng "can" thay vì "could".',
        mistakes: [
          {
            lineOrStep: 'Question 2b',
            studentWrote: 'If I had a bicycle, I can cycle to school.',
            correctForm: 'If I had a bicycle, I could cycle to school.',
            errorCategory: 'grammar_spelling',
            rootCause: 'Quên lùi thì của trợ động từ khiếm khuyết trong câu điều kiện loại 2 (can -> could).',
            advice: 'Trong câu điều kiện loại 2, luôn lùi "can" thành "could".'
          }
        ]
      },
      {
        questionNumber: 'Question 3',
        score: 2.5,
        maxScore: 2.5,
        status: 'correct',
        ocrTranscribedText: 'Cả 2 câu gợi ý đều chính xác ngữ pháp và ý nghĩa.',
        analysis: 'Diễn đạt tốt, từ vựng chuẩn xác.',
        mistakes: []
      }
    ],
    classErrorPatterns: [
      'Không lùi thì ở vế chính câu điều kiện loại 2 (dùng will/can thay vì would/could)'
    ],
    remedialExercises: [
      {
        id: 'rem-eng-01',
        title: 'Luyện tập phối hợp thì câu điều kiện loại 2',
        targetError: 'Dùng would/could ở vế chính',
        questionText: 'Chọn đáp án đúng: "If I _______ you, I _______ that old car."',
        options: ['A. am / will buy', 'B. were / would buy', 'C. was / will buy', 'D. had been / bought'],
        correctAnswer: 'B. were / would buy',
        explanation: 'Câu điều kiện loại 2 giả định trái với hiện tại: If + S + were/V-ed, S + would + V-inf.',
        hint: 'Chú ý vế If dùng were thì vế chính dùng would.'
      }
    ],
    status: 'graded'
  }
];
