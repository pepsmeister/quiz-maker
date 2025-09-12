import { API_CLIENT_URL, apiFetch } from '@/config/api-client.config'
import type { QuizAttempt } from '@/features/quiz-player/types/quiz-player.type'

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
