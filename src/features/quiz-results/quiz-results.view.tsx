import type {
  Question,
  SubmitResultDetail,
} from '@/features/quiz-player/types/quiz-player.type'
import type { QuizResultsLocationState } from '@/features/quiz-results/types/quiz-results.type'
import { Link, useLocation } from 'react-router-dom'

export const QuizResultsView = () => {
  const location = useLocation()
  const { score, details, questions, answers } =
    location.state as QuizResultsLocationState

  const totalQuestions = questions.length

  return (
    <div className='flex flex-col items-center justify-center min-h-[70vh] bg-gray-900'>
      <h1 className='text-5xl font-bold mb-6 text-blue-700'>Quiz Results</h1>
      <p className='text-3xl font-semibold text-gray-800'>
        Your score:{' '}
        <span className='text-blue-500'>
          {score} / {totalQuestions}
        </span>
      </p>

      <div className='w-full max-w-2xl mt-10 bg-gray-900 p-6 text-white'>
        <h2 className='text-2xl font-bold mb-4 text-white'>Results</h2>
        <ul className='space-y-6'>
          {questions.map((question: Question, index: number) => {
            const detail = details.find(
              (d: SubmitResultDetail) => d.questionId === question.id
            )

            const isCorrect = detail?.correct
            const userAnswer = answers?.[question.id?.toString()] ?? ''

            return (
              <li
                key={question.id}
                className='border-b border-gray-700 pb-4 last:border-b-0'
              >
                <div className='font-semibold text-lg text-white mb-1'>
                  Q{index + 1}: {question.prompt}
                </div>
                <div
                  className={
                    isCorrect
                      ? 'text-green-400 font-bold'
                      : 'text-red-400 font-bold'
                  }
                >
                  {isCorrect ? 'Correct' : 'Incorrect'}
                </div>
                <div className='text-gray-200 mt-1'>
                  Your answer:{' '}
                  <span className='font-mono'>
                    {question.type === 'mcq' && Array.isArray(question.options)
                      ? (question.options[parseInt(String(userAnswer))] ??
                        userAnswer)
                      : userAnswer}
                  </span>
                </div>
                {!isCorrect && detail?.expected && (
                  <div className='text-gray-300 mt-1'>
                    Expected:{' '}
                    <span className='font-mono'>{detail.expected}</span>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      <Link
        to='/'
        className='mt-16 rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
      >
        Go to Dashboard
      </Link>
    </div>
  )
}
