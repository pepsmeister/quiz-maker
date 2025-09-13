import type { Answer } from '@/features/quiz-player/types/quiz-player.type'
import type {
  Question,
  SubmitResult,
} from '../../quiz-player/types/quiz-player.type'

export type QuizResultsLocationState = SubmitResult & {
  questions: Question[]
  answers: Answer
}
