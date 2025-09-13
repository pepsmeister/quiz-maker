type QuizBase = {
  title: string
  description: string
  isPublished?: boolean
}

export type Quiz = QuizBase & {
  id: string
  createdAt: string
}

export type QuizInput = QuizBase

export type QuizType = 'mcq' | 'short' | 'code'

export type QuizQuestionInput = {
  quizId: string
  type: QuizType
  prompt: string
  options?: string[]
  correctAnswer: string | number
}
