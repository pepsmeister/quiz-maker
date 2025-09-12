import { API_CLIENT_URL, apiFetch } from '@/config/api-client.config'
import type { Quiz } from '@/features/quiz-builder/types/quiz-builder.type'

export const loadQuiz = async (quizId: string): Promise<Quiz> => {
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
