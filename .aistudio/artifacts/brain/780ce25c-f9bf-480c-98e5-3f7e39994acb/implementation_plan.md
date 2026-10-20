# Tường Học Tập AI — Phần Mềm Chấm Bài & Truy Gốc Lỗi (Learning Wall AI)

Hệ thống chấm bài thông minh dành cho giáo viên và học sinh: chụp ảnh bài tập viết tay hoặc vở ô li, AI nhận diện và chấm bài theo barem đáp án, chỉ rõ lỗi sai từng dòng, truy nguyên nhân gốc rễ và tự động gợi ý bài luyện tập củng cố.

## User Review & Critical Decisions

> [!IMPORTANT]
> Căn cứ theo hình ảnh thiết kế ban đầu do người dùng cung cấp ("Tường học tập AI - Truy gốc lỗi - Chụp bài, nộp bài, AI chấm ngay") cùng các câu hỏi định hướng, hệ thống sẽ được xây dựng theo mô hình hai phân hệ linh hoạt:
> 1. **Dành cho Giáo viên**: Đăng nhập/quản lý lớp, tạo đề kiểm tra kèm barem chuẩn, tải ảnh bài làm hàng loạt/từng em, xem thống kê "Tường học tập" trực quan (tỷ lệ lỗi theo dạng bài).
> 2. **Dành cho Học sinh**: Vào lớp nhanh bằng mã lớp/link giáo viên chia sẻ (không cần đăng ký phức tạp), chụp ảnh nộp bài, nhận kết quả chấm chi tiết và làm ngay bài tập bù lỗ hổng kiến thức.

- **Môn học hỗ trợ**: Đa môn học trọng điểm (Toán học giải từng bước, Ngữ văn/Tập làm văn, Tiếng Anh ngữ pháp & viết câu, Trắc nghiệm).
- **Công nghệ nhận diện & chấm điểm**: Tích hợp mô hình AI đa phương thức (`gemini-3.8-flash`) xử lý hình ảnh chụp bài viết tay, nhận dạng công thức, chữ viết và đối chiếu barem điểm chi tiết.
- **Dữ liệu & Quyền riêng tư**: Phân định bảo mật đúng cam kết trong mockup: mỗi giáo viên quản lý lớp và bài của mình; học sinh vào làm và xem bài của riêng mình.

---

## 1. Overview & Core Concept

- **Mục tiêu cốt lõi**: Giải phóng giáo viên khỏi áp lực chấm bài thủ công hàng trăm bài mỗi tuần, đồng thời biến điểm số thành cơ hội học tập bằng cách giúp học sinh hiểu sâu "tại sao mình sai" thay vì chỉ nhìn thấy điểm số và dấu gạch đỏ.
- **Đối tượng sử dụng**:
  - *Giáo viên bộ môn & Chủ nhiệm*: Cần công cụ chấm nhanh, khách quan, nhận báo cáo lỗi sai của cả lớp để điều chỉnh bài giảng.
  - *Học sinh các cấp*: Cần phản hồi tức thì ngay khi làm xong bài, biết đúng chỗ sai từng bước để tự sửa.
  - *Phụ huynh*: Theo dõi tiến trình cải thiện các lỗi sai thường gặp của con.
- **Giá trị khác biệt**:
  - **Truy gốc lỗi (Root Cause Diagnostics)**: Phân loại nguyên nhân sai (sai biến đổi số học cơ bản, ngộ nhận định lý, nhầm thì ngữ pháp, lỗi diễn đạt logic).
  - **Bài luyện bù tức thì (Remedial Action)**: Sinh câu hỏi tương đương ngay lập tức để học sinh thực hành lấp đầy lỗ hổng.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Màn hình Chào mừng & Cổng vào (Welcome & Authentication Gateway)**:
   - Tái hiện chân thực giao diện nhận diện trong hình ảnh người dùng đã gửi: linh vật cú thông thái, khẩu hiệu *"Mỗi ý tưởng đều có một chỗ - Chụp bài, nộp bài, AI chấm ngay"*, form Đăng nhập / Đăng ký dành cho giáo viên và nút truy cập nhanh cho học sinh vào làm bài qua mã phòng.
2. **Bàn làm việc Giáo viên (Teacher Studio & Assignment Manager)**:
   - Tạo bài tập/bài kiểm tra: Tên bài, môn học, khối lớp, đề bài và barem chấm (đáp án chi tiết từng câu).
   - Tải lên bài làm: Kéo thả nhiều ảnh chụp (vở kẻ ô li, giấy kiểm tra, ảnh chụp điện thoại) hoặc paste văn bản.
   - Nút "AI Chấm Toàn Bộ": Tiến trình chấm hiển thị thời gian thực, cập nhật điểm số và phân loại học sinh.
   - Thống kê "Tường học tập AI": Biểu đồ phân bổ điểm, danh sách các câu hỏi có tỷ lệ sai cao nhất, ma trận các nhóm lỗi (kiến thức cơ bản, tính toán, cẩu thả, suy luận).
3. **Cổng nộp bài & Xem kết quả Học sinh (Student Workspace)**:
   - Học sinh nhập tên và mã bài tập để nộp bài bằng camera trực tiếp, tải ảnh hoặc gõ bài.
   - Giao diện kết quả trực quan (Split-screen Grading Viewer):
     - Bên trái: Ảnh chụp bài làm gốc kèm các điểm đánh dấu trực quan (Bounding highlight: câu đúng, câu cần sửa).
     - Bên phải: Bảng phân tích chi tiết: Điểm tổng, nhận xét tổng quan, soi lỗi từng dòng kèm giải thích vì sao sai và cách viết đúng.
     - Dưới chân bài: Khối "Bài tập luyện thêm dành riêng cho bạn" — học sinh làm thử ngay và được chấm lập tức.

### Visual Identity & Theme

- **Phong cách thẩm mỹ**: Giáo dục chuyên nghiệp, tươi sáng, tạo cảm hứng và tin cậy theo quy chuẩn domain EdTech (`references/6_education_simulations.md`).
- **Bảng màu (60-30-10 Rule)**:
  - *60% Nền chủ đạo*: Xanh nhạt dịu mắt kết hợp nền trắng ngà trang vở (`#F8FAFC`, `#F0F4F8`).
  - *30% Khối cấu trúc & Thẻ thông tin*: Trắng tinh khiết (`#FFFFFF`), đường viền hairline thanh mảnh (`#E2E8F0`), chữ than đậm tương phản cao (`#0F172A`).
  - *10% Điểm nhấn hành động*: Xanh biển đậm uy tín (`#1D4ED8` - `#2563EB`) và xanh ngọc chuyển sắc đồng điệu với mockup ban đầu.
  - *Màu trạng thái giáo dục*: Xanh lá ngọc lục bảo (`#059669` - Đúng/Đạt), Đỏ san hô nhã nhặn (`#DC2626` - Lỗi sai), Hổ phách dịu (`#D97706` - Cần lưu ý/Lỗi một phần).
- **Typography**: Display sans phong cách hiện đại `Plus Jakarta Sans` cho tiêu đề và thương hiệu; font chữ thân thiện, độ đọc cao cho nội dung bài làm và nhận xét.

---

## 3. Key Product Decisions & Trade-Offs

- **Xử lý ảnh & OCR chữ viết tay**:
  - *Giải pháp*: Sử dụng Gemini 3.8 Flash Vision thông qua API máy chủ an toàn (`server.ts`). Mô hình hỗ trợ đọc cả chữ viết tay tiếng Việt và ký hiệu toán học từ ảnh chụp vở ô li.
  - *Lý do*: Đáp ứng trọn vẹn yêu cầu trong mockup "AI đọc cả chữ viết tay, cho điểm, chỉ đúng chỗ sai".
- **Lưu trữ dữ liệu**:
  - *Giải pháp*: Bộ nhớ trạng thái cục bộ kết hợp máy chủ proxy Express và cơ chế lưu trữ bền vững (Local Persistence Store) có sẵn mẫu đề bài và bài làm mẫu phong phú.
  - *Lý do*: Đảm bảo ứng dụng chạy mượt mà tức thì mà không yêu cầu cấu hình cơ sở dữ liệu bên ngoài phức tạp, đồng thời sẵn sàng tích hợp khi mở rộng.
- **Chế độ kiểm thử có sẵn (Interactive Demo Mode)**:
  - Tích hợp sẵn 4 bộ đề và bài làm mẫu thực tế (Toán cấp 2, Văn nghị luận, Tiếng Anh, Trắc nghiệm Khoa học) để người dùng bấm thử nghiệm ngay mà không cần phải tự chuẩn bị file ảnh trước.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        TƯỜNG HỌC TẬP AI (Frontend)                     │
│                                                                        │
│  ┌──────────────────────┐  ┌─────────────────┐  ┌───────────────────┐  │
│  │   Auth & Roles       │  │ Teacher Studio  │  │ Student Submit    │  │
│  │  - Giáo viên login   │  │ - Tạo bài/barem │  │ - Nhập mã lớp     │  │
│  │  - Học sinh mã link  │  │ - Chấm sỉ nhiều │  │ - Chụp/tải ảnh vở │  │
│  └──────────┬───────────┘  └────────┬────────┘  └─────────┬─────────┘  │
│             │                       │                     │            │
│  ┌──────────▼───────────────────────▼─────────────────────▼─────────┐  │
│  │                     App State & Grading Store                     │  │
│  │  - Assignments, Submissions, Error Taxonomy, Remedial Exercises   │  │
│  └──────────────────────────────────┬────────────────────────────────┘  │
└─────────────────────────────────────┼──────────────────────────────────┘
                                      │ REST API /api/grade
                                      ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      Express Backend (server.ts)                       │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  Gemini 3.8 Flash Integration via @google/genai                  │  │
│  │  - Multimodal Vision (Handwriting & Grid Notebook OCR)           │  │
│  │  - Rubric Comparison & Deductive Step Scoring                    │  │
│  │  - Root Cause Classification (Error Taxonomy Engine)              │  │
│  │  - Adaptive Remedial Drill Generation                            │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

### Chi tiết các module cần triển khai:

1. **`server.ts`**:
   - Khởi tạo Express với Vite middleware.
   - Endpoint `/api/grade`: Nhận ảnh base64 hoặc văn bản bài làm + barem đáp án -> Gọi `ai.models.generateContent` với `gemini-3.8-flash` -> Trả về cấu trúc JSON gồm: điểm từng câu, tổng điểm, lỗi sai chi tiết từng dòng, nguyên nhân gốc rễ và bài tập luyện thêm.
   - Endpoint `/api/generate-remedial`: Tạo câu hỏi rèn luyện theo lỗ hổng kiến thức cụ thể.
2. **`src/types.ts`**: Định nghĩa kiểu dữ liệu chặt chẽ cho đề bài (`Assignment`), bài nộp (`Submission`), lỗi sai (`DetailedMistake`), barem điểm (`RubricCriteria`).
3. **`src/components/Header.tsx`**: Header tuân thủ hợp đồng Top Bar (Logo Cú thông thái Tường Học Tập AI, các tab điều hướng, chuyển đổi vai trò và nút hành động).
4. **`src/components/AuthGateway.tsx`**: Tái hiện chuẩn mockup ban đầu với form Đăng nhập/Đăng ký giáo viên và lối vào học sinh.
5. **`src/components/TeacherDashboard.tsx`**: Bảng điều khiển quản lý lớp, danh sách bài kiểm tra, công cụ chấm bài hàng loạt và xem "Tường học tập" phân tích lỗi sai chung của lớp.
6. **`src/components/GradingDetailModal.tsx`**: Giao diện chấm bài trực quan sâu (xem ảnh bài làm, danh sách lỗi sai có chú thích màu sắc, chỉ ra gốc lỗi và cách sửa).
7. **`src/components/StudentPortal.tsx`**: Cổng nộp bài học sinh (hỗ trợ chụp camera trực tiếp, tải ảnh, làm bài luyện thêm tức thì).
8. **`src/data/sampleData.ts`**: Cung cấp sẵn các đề bài mẫu chân thực (Toán, Văn, Anh) và các bài nộp viết tay mẫu để trải nghiệm tức thì.
