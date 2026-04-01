// ─── User & Auth ─────────────────────────────────────────────────────────────

export type ExamCategory = 'SSC' | 'Banking' | 'RRB' | 'State PCS' | 'UPSC';
export type UserRole = 'student' | 'admin' | 'teacher';
export type SubscriptionTier = 'free' | 'pro' | 'elite' | 'exam_pack';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  tier: SubscriptionTier;
  examPreferences: ExamCategory[];
  xp: number;
  streak: number;
  createdAt: string;
}

export interface UserStats {
  totalQuestionsSolved: number;
  totalTestsTaken: number;
  totalStudyHours: number;
  averageAccuracy: number;
  currentStreak: number;
  longestStreak: number;
  rank: number;
  percentile: number;
  weeklyXP: number;
}

// ─── Questions ────────────────────────────────────────────────────────────────

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard' | 'Exam-Level';
export type ExplanationStyle = 'Beginner' | 'Exam Shortcut' | 'Deep Concept';

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctOptionId: string;
  explanation: string;
  subject: string;
  topic: string;
  subtopic?: string;
  difficulty: DifficultyLevel;
  examCategory: ExamCategory[];
  isPYQ: boolean;
  pyqYear?: number;
  isBookmarked?: boolean;
  tags: string[];
}

// ─── Tests & Exams ────────────────────────────────────────────────────────────

export type TestType = 'mock' | 'sectional' | 'topic' | 'daily_quiz' | 'weekly';
export type TestStatus = 'not_started' | 'in_progress' | 'completed';

export interface Exam {
  id: string;
  title: string;
  category: ExamCategory;
  totalQuestions: number;
  durationMinutes: number;
  negativeMarking: number;
  sections: ExamSection[];
  type: TestType;
  isFree: boolean;
  attemptedCount?: number;
  averageScore?: number;
}

export interface ExamSection {
  name: string;
  subject: string;
  questionCount: number;
}

export interface TestSession {
  id: string;
  examId: string;
  userId: string;
  status: TestStatus;
  answers: Record<string, string | null>;
  markedForReview: string[];
  startedAt: string;
  submittedAt?: string;
  timeSpentPerQuestion: Record<string, number>;
}

export interface TestResult {
  id: string;
  examId: string;
  examTitle: string;
  score: number;
  maxScore: number;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  skipped: number;
  accuracy: number;
  timeTaken: number;
  rank?: number;
  percentile?: number;
  sectionWise: SectionResult[];
  topicWise: TopicResult[];
  submittedAt: string;
}

export interface SectionResult {
  name: string;
  correct: number;
  incorrect: number;
  skipped: number;
  score: number;
  maxScore: number;
  accuracy: number;
}

export interface TopicResult {
  topic: string;
  subject: string;
  correct: number;
  total: number;
  accuracy: number;
}

// ─── Analytics ────────────────────────────────────────────────────────────────

export interface PerformanceData {
  date: string;
  accuracy: number;
  questionsAttempted: number;
  studyTime: number;
  xpEarned: number;
}

export interface TopicHeatmapData {
  subject: string;
  topic: string;
  accuracy: number;
  questionsAttempted: number;
  status: 'strong' | 'moderate' | 'weak' | 'not_attempted';
}

// ─── Gamification ─────────────────────────────────────────────────────────────

export type BadgeType = 'streak' | 'accuracy' | 'speed' | 'social' | 'milestone';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: BadgeType;
  unlockedAt?: string;
}

export type LeaderboardPeriod = 'daily' | 'weekly' | 'monthly' | 'all_time';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar?: string;
  xp: number;
  examCategory: ExamCategory;
}

// ─── Community ────────────────────────────────────────────────────────────────

export interface DiscussionThread {
  id: string;
  title: string;
  body: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  questionId?: string;
  subject?: string;
  upvotes: number;
  replyCount: number;
  createdAt: string;
  tags: string[];
}

export interface StudyRoom {
  id: string;
  name: string;
  hostName: string;
  participantCount: number;
  maxParticipants: number;
  subject?: string;
  isLive: boolean;
  inviteLink: string;
}

// ─── Study Plan ───────────────────────────────────────────────────────────────

export interface DailyTask {
  id: string;
  type: 'practice' | 'revision' | 'mock' | 'video' | 'reading';
  title: string;
  subject?: string;
  topic?: string;
  estimatedMinutes: number;
  xpReward: number;
  isCompleted: boolean;
}

export interface StudyPlan {
  date: string;
  tasks: DailyTask[];
  totalXPAvailable: number;
  completionPercentage: number;
}
