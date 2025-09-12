import { NotFound } from '@/components/not-found/not-found.component'
import { loadQuiz } from '@/features/quiz-player/api/quiz-player.api'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export const QuizPlayerView = () => {
  const { quizId } = useParams()
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['loadQuiz', quizId],
    queryFn: () => loadQuiz(quizId as string),
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <NotFound title={error.message} />
  }

  console.log(data, 'data')

  return <>quiz here</>
}
