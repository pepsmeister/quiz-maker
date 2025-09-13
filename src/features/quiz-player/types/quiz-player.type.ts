export type QuizAttempt = {
  id: number
  quizId: string
  startedAt: string
  submittedAt: string | null
  answers: Answer[]
  quiz: QuizWithQuestions
}

export type QuizWithQuestions = {
  id: number
  title: string
  description: string
  questions: Question[]
}

export type Question = {
  id: number
  quizId: number
  type: 'mcq' | 'short' | 'code'
  prompt: string
  options?: string[] // only present for mcq
}

export type Answer = {
  [key: string]: string | number
  questionId: number | string
  value: string
}

export type SubmitResultDetail = {
  questionId: number
  correct: boolean
  expected: string
}

export type SubmitResult = {
  score: number
  details: SubmitResultDetail[]
}
