import type { Question } from '@/features/quiz-player/types/quiz-player.type'
import * as Yup from 'yup'

export function getQuizValidationSchema(questions: Question[]) {
  const shape: Record<string, Yup.StringSchema<string | undefined>> = {}

  questions.forEach((question: Question) => {
    // all optional dont player to answer every question
    if (question.type === 'mcq') {
      shape[`${question.id}`] = Yup.string().optional()
    } else if (question.type === 'short') {
      shape[`${question.id}`] = Yup.string().optional()
    } else if (question.type === 'code') {
      shape[`${question.id}`] = Yup.string().optional()
    }
  })

  return Yup.object().shape(shape)
}
