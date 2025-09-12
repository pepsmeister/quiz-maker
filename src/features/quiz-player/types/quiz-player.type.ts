export type QuizAttempt = {
  id: number
  quizId: string
  startedAt: string
  submittedAt: string | null
  answers: Answer[]
  quiz: Quiz
}

export type Quiz = {
  id: number
  title: string
  description: string
  timeLimitSeconds: number
  questions: Question[]
}

export type Question = {
  id: number
  quizId: number
  type: 'mcq' | 'short' | 'code'
  prompt: string
  position: number
  options?: string[] // only present for mcq
}

export type Answer = {
  questionId: number
  value: string
}
