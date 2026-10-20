import React, { useState } from 'react';
import { Header } from './components/Header';
import { AuthGateway } from './components/AuthGateway';
import { TeacherStudio } from './components/TeacherStudio';
import { StudentPortal } from './components/StudentPortal';
import { GradingDetailModal } from './components/GradingDetailModal';
import { TeacherGradingModal } from './components/TeacherGradingModal';
import { CreateAssignmentModal } from './components/CreateAssignmentModal';
import { INITIAL_ASSIGNMENTS, INITIAL_SUBMISSIONS } from './data/sampleData';
import { Assignment, GradingResult } from './types';

export default function App() {
  const [userRole, setUserRole] = useState<'teacher' | 'student' | null>(null);
  const [currentView, setCurrentView] = useState<'teacher' | 'learning_wall' | 'assignments' | 'student'>('teacher');
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [submissions, setSubmissions] = useState<GradingResult[]>(INITIAL_SUBMISSIONS);
  const [selectedSubmission, setSelectedSubmission] = useState<GradingResult | null>(null);
  const [isTeacherGradingOpen, setIsTeacherGradingOpen] = useState(false);
  const [isCreateAssignmentOpen, setIsCreateAssignmentOpen] = useState(false);
  const [selectedStudentCode, setSelectedStudentCode] = useState<string>('TOAN9-VIETE-01');
  const [isGeneratingDrills, setIsGeneratingDrills] = useState(false);

  // Auth actions
  const handleLoginTeacher = (email: string) => {
    setUserRole('teacher');
    setCurrentView('teacher');
  };

  const handleEnterAsStudent = (code?: string) => {
    setUserRole('student');
    setCurrentView('student');
    if (code) {
      setSelectedStudentCode(code);
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setSelectedSubmission(null);
  };

  // Quick Demo click from Hero
  const handleQuickDemo = (subject: string) => {
    const found = submissions.find((s) => s.subject.includes(subject)) || submissions[0];
    if (found) {
      setSelectedSubmission(found);
    }
  };

  // Open Student corner for a specific assignment from teacher studio
  const handleSelectAssignmentForStudent = (code: string) => {
    setSelectedStudentCode(code);
    setUserRole('student');
    setCurrentView('student');
  };

  // Add newly graded submission
  const handleGradeComplete = (newResult: GradingResult) => {
    setSubmissions((prev) => [newResult, ...prev]);
    setSelectedSubmission(newResult);
  };

  // Save new assignment created by teacher
  const handleSaveAssignment = (newAsg: Assignment) => {
    setAssignments((prev) => [newAsg, ...prev]);
  };

  // Generate additional remedial exercises for the currently inspected submission
  const handleGenerateMoreDrills = async (targetError: string) => {
    if (!selectedSubmission) return;
    setIsGeneratingDrills(true);

    try {
      const response = await fetch('/api/generate-remedial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetError,
          subject: selectedSubmission.subject,
        }),
      });

      const data = await response.json();
      if (data.success && data.exercises?.length) {
        const updated = {
          ...selectedSubmission,
          remedialExercises: [
            ...(selectedSubmission.remedialExercises || []),
            ...data.exercises,
          ],
        };

        setSelectedSubmission(updated);
        setSubmissions((prev) =>
          prev.map((s) => (s.id === updated.id ? updated : s))
        );
      }
    } catch (err) {
      console.error('Failed to generate more drills:', err);
    } finally {
      setIsGeneratingDrills(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          if (view === 'student') setUserRole('student');
          else setUserRole('teacher');
        }}
        userRole={userRole}
        onLogout={handleLogout}
        onOpenNewGrading={() => setIsTeacherGradingOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-1">
        {!userRole ? (
          /* Gateway / Welcome Screen matching user's mockup */
          <AuthGateway
            onLoginTeacher={handleLoginTeacher}
            onEnterAsStudent={handleEnterAsStudent}
            onQuickDemo={handleQuickDemo}
          />
        ) : userRole === 'teacher' ? (
          /* Teacher Studio */
          <TeacherStudio
            assignments={assignments}
            submissions={submissions}
            activeTab={
              currentView === 'learning_wall'
                ? 'learning_wall'
                : currentView === 'assignments'
                ? 'assignments'
                : 'submissions'
            }
            onTabChange={(tab) => {
              if (tab === 'learning_wall') setCurrentView('learning_wall');
              else if (tab === 'assignments') setCurrentView('assignments');
              else setCurrentView('teacher');
            }}
            onOpenGradingDetail={(sub) => setSelectedSubmission(sub)}
            onStartNewGrading={() => setIsTeacherGradingOpen(true)}
            onCreateAssignment={() => setIsCreateAssignmentOpen(true)}
            onSelectAssignmentForStudent={handleSelectAssignmentForStudent}
          />
        ) : (
          /* Student Submission Corner */
          <StudentPortal
            assignments={assignments}
            selectedCode={selectedStudentCode}
            onGradeComplete={handleGradeComplete}
            onBackToTeacher={() => {
              setUserRole('teacher');
              setCurrentView('teacher');
            }}
          />
        )}
      </main>

      {/* Detailed Grading Modal */}
      {selectedSubmission && (
        <GradingDetailModal
          result={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
          onGenerateMoreDrills={handleGenerateMoreDrills}
          isGeneratingDrills={isGeneratingDrills}
        />
      )}

      {/* Teacher New Grading Modal */}
      {isTeacherGradingOpen && (
        <TeacherGradingModal
          assignments={assignments}
          onClose={() => setIsTeacherGradingOpen(false)}
          onGradeComplete={handleGradeComplete}
        />
      )}

      {/* Create Assignment Modal */}
      {isCreateAssignmentOpen && (
        <CreateAssignmentModal
          onClose={() => setIsCreateAssignmentOpen(false)}
          onSaveAssignment={handleSaveAssignment}
        />
      )}
    </div>
  );
}
