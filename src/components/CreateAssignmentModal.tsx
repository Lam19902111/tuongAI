import React, { useState } from 'react';
import { X, Plus, Trash2, BookOpen, Check } from 'lucide-react';
import { Assignment, SubjectType, RubricCriteria } from '../types';

interface CreateAssignmentModalProps {
  onClose: () => void;
  onSaveAssignment: (assignment: Assignment) => void;
}

export const CreateAssignmentModal: React.FC<CreateAssignmentModalProps> = ({
  onClose,
  onSaveAssignment,
}) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState<SubjectType>('Toán');
  const [grade, setGrade] = useState('Lớp 9');
  const [description, setDescription] = useState('');
  const [questionsAndRubric, setQuestionsAndRubric] = useState(`Câu 1 (5.0 điểm): Đề bài câu 1...
- Bước 1 (2.0 điểm): Đáp án...
- Bước 2 (3.0 điểm): Đáp án...

Câu 2 (5.0 điểm): Đề bài câu 2...
- Barem chấm: ...`);

  const [criteria, setCriteria] = useState<RubricCriteria[]>([
    { id: 'crit-1', name: 'Độ chính xác phép tính / bước giải', maxScore: 5.0, description: 'Lập luận đúng quy tắc' },
    { id: 'crit-2', name: 'Trình bày, lập luận và kết luận', maxScore: 5.0, description: 'Rõ ràng, không thiếu bước' },
  ]);

  const handleAddCriterion = () => {
    setCriteria([
      ...criteria,
      {
        id: `crit-${Date.now()}`,
        name: 'Tiêu chí mới',
        maxScore: 2.0,
        description: 'Mô tả tiêu chí',
      },
    ]);
  };

  const handleRemoveCriterion = (id: string) => {
    setCriteria(criteria.filter((c) => c.id !== id));
  };

  const handleCriterionChange = (id: string, field: keyof RubricCriteria, value: any) => {
    setCriteria(
      criteria.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('Vui lòng nhập tên đề kiểm tra.');
      return;
    }

    const prefix = subject === 'Toán' ? 'TOAN' : subject === 'Ngữ văn' ? 'VAN' : 'ENG';
    const code = `${prefix}${grade.replace(/\D/g, '')}-${Date.now().toString().slice(-4)}`;

    const newAssignment: Assignment = {
      id: `asg-${Date.now()}`,
      code: code,
      title: title.trim(),
      subject: subject,
      grade: grade,
      teacherName: 'Giáo viên bộ môn',
      description: description.trim() || 'Bài kiểm tra đánh giá năng lực học sinh.',
      questionsAndRubric: questionsAndRubric,
      criteriaList: criteria,
      createdAt: new Date().toISOString().split('T')[0],
      totalMaxScore: criteria.reduce((acc, c) => acc + Number(c.maxScore || 0), 0) || 10,
    };

    onSaveAssignment(newAssignment);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              Tạo đề kiểm tra & Thiết lập barem chấm
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tên bài kiểm tra / chủ đề *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Kiểm tra 15 phút: Hệ phương trình bậc nhất hai ẩn"
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Môn học
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as SubjectType)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value="Toán">Toán</option>
                <option value="Ngữ văn">Ngữ văn</option>
                <option value="Tiếng Anh">Tiếng Anh</option>
                <option value="Khoa học">Khoa học</option>
                <option value="Trắc nghiệm">Trắc nghiệm tổng hợp</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Khối lớp
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value="Lớp 6">Lớp 6</option>
                <option value="Lớp 7">Lớp 7</option>
                <option value="Lớp 8">Lớp 8</option>
                <option value="Lớp 9">Lớp 9</option>
                <option value="Lớp 10">Lớp 10</option>
                <option value="Lớp 11">Lớp 11</option>
                <option value="Lớp 12">Lớp 12</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mô tả ngắn gọn yêu cầu bài thi
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="VD: Kiểm tra kỹ năng giải bằng phương pháp cộng đại số..."
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Rubric text for AI */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Đề bài & Đáp án barem chi tiết (AI dùng để đối chiếu chấm bài)
            </label>
            <textarea
              rows={5}
              value={questionsAndRubric}
              onChange={(e) => setQuestionsAndRubric(e.target.value)}
              className="w-full p-3 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500 leading-relaxed"
            />
          </div>

          {/* Criteria List */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Bảng tiêu chí điểm số:
              </span>
              <button
                type="button"
                onClick={handleAddCriterion}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm tiêu chí</span>
              </button>
            </div>

            <div className="space-y-2">
              {criteria.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                >
                  <input
                    type="text"
                    value={c.name}
                    onChange={(e) => handleCriterionChange(c.id, 'name', e.target.value)}
                    placeholder="Tên tiêu chí"
                    className="flex-1 px-2.5 py-1 text-xs bg-white border border-slate-200 rounded-lg text-slate-800"
                  />
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.5"
                      value={c.maxScore}
                      onChange={(e) => handleCriterionChange(c.id, 'maxScore', parseFloat(e.target.value) || 0)}
                      className="w-16 px-2 py-1 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 text-center font-bold"
                    />
                    <span className="text-xs text-slate-500 font-semibold">đ</span>
                  </div>
                  {criteria.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveCriterion(c.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Lưu & Tạo mã chia sẻ</span>
          </button>
        </div>

      </div>
    </div>
  );
};
