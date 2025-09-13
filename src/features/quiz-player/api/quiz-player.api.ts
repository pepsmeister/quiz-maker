import { API_CLIENT_URL, apiFetch } from '@/config/api-client.config'
import type {
  Answer,
  QuizAttempt,
  SubmitResult,
} from '@/features/quiz-player/types/quiz-player.type'

export const loadQuiz = async (quizId: string): Promise<QuizAttempt> => {
  const response = await apiFetch(`${API_CLIENT_URL}/attempts`, {
    method: 'POST',
    body: JSON.stringify({ quizId }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || `Failed to load quiz: ${response.status}`)
  }

  return response.json()
}

export const answerQuestion = async (
  attemptId: string,
  answer: Answer
): Promise<QuizAttempt> => {
  const { questionId, value } = answer
  const response = await apiFetch(
    `${API_CLIENT_URL}/attempts/${attemptId}/answer`,
    {
      method: 'POST',
      body: JSON.stringify({ questionId, value }),
    }
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(
      error.error || `Failed to answer quiz question: ${response.status}`
    )
  }

  return response.json()
}

export const submitAttempt = async (
  attemptId: string
): Promise<SubmitResult> => {
  const response = await apiFetch(
    `${API_CLIENT_URL}/attempts/${attemptId}/submit`,
    {
      method: 'POST',
    }
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || `Failed to submit quiz: ${response.status}`)
  }

  return response.json()
}
