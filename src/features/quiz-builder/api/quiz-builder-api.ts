import { API_CLIENT_URL, apiFetch } from '@/config/api-client.config'
import type {
  Quiz,
  QuizInput,
  QuizQuestionInput,
} from '@/features/quiz-builder/types/quiz-builder.type'

export const createQuiz = async (payload: QuizInput): Promise<Quiz> => {
  const response = await apiFetch(`${API_CLIENT_URL}/quizzes`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || `Failed to create quiz: ${response.status}`)
  }

  return response.json()
}

export const createQuestion = async (
  payload: QuizQuestionInput
): Promise<Quiz> => {
  const { quizId, ...questionData } = payload
  const response = await apiFetch(
    `${API_CLIENT_URL}/quizzes/${quizId}/questions`,
    {
      method: 'POST',
      body: JSON.stringify(questionData),
    }
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(
      error.error ||
        `Failed to create question for quiz ${quizId}: ${response.status}`
    )
  }

  return response.json()
}
