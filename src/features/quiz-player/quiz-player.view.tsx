import { InputControlled } from '@/components/input-controlled/input-controlled.component'
import { NotFound } from '@/components/not-found/not-found.component'
import { RadioGroupControlled } from '@/components/radio-controlled/radio-controlled.component'
import { TextAreaControlled } from '@/components/text-area-controlled/text-area-controlled.component'
import {
  answerQuestion,
  loadQuiz,
  submitAttempt,
} from '@/features/quiz-player/api/quiz-player.api'
import type { Answer } from '@/features/quiz-player/types/quiz-player.type'
import { getQuizValidationSchema } from '@/features/quiz-player/utils/quiz-player-schema-generator.util'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import type { InferType } from 'yup'

export const QuizPlayerView = () => {
  const navigate = useNavigate()
  const { quizId } = useParams()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const {
    isLoading,
    isError,
    data,
    error: loadQuizError,
  } = useQuery({
    queryKey: ['loadQuiz', quizId],
    queryFn: () => loadQuiz(quizId as string),
  })

  const dataAttemptId = useMemo(() => String(data?.id), [data])
  const questions = useMemo(() => data?.quiz.questions || [], [data])
  const currentQuestion = useMemo(
    () => questions[currentQuestionIndex],
    [questions, currentQuestionIndex]
  )

  const validationSchema = getQuizValidationSchema(questions)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const { mutateAsync: answerQuestionMutation } = useMutation({
    mutationFn: ({
      attemptId,
      answer,
    }: {
      attemptId: string
      answer: Answer
    }) => answerQuestion(attemptId, answer),
  })

  const { mutateAsync: submitAttemptMutation } = useMutation({
    mutationFn: (attemptId: string) => submitAttempt(attemptId),
  })

  const onSubmit = async (payload: InferType<typeof validationSchema>) => {
    try {
      const answerPromises = Object.entries(payload).map(
        ([questionId, value]) => {
          const answer: Answer = {
            questionId: String(questionId),
            value: value || '',
          }

          return answerQuestionMutation({ attemptId: dataAttemptId, answer })
        }
      )
      await Promise.allSettled(answerPromises)

      const submitResults = await submitAttemptMutation(dataAttemptId)

      navigate('/quiz-results', {
        state: {
          score: submitResults.score,
          details: submitResults.details,
          answers: payload,
          questions: data?.quiz.questions || [],
        },
      })
    } catch (error) {
      alert(
        `There was an error submitting the quiz. Please try again. ${error}`
      )
    }
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <NotFound title={loadQuizError.message} />
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='px-32 py-16 space-y-8 bg-gray-900 w-full'
      >
        <div className='container mx-auto rounded-md p-4 mb-6 bg-gray-800'>
          <h2 className='text-2xl font-bold mb-4 text-white'>
            {data?.quiz.title}
          </h2>
          <h4 className='text-2xl font-bold mb-4 text-white'>
            {data?.quiz.description}
          </h4>

          <div className='mt-4 text-center text-sm text-gray-500'>
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <div className='flex justify-between gap-4 my-6'>
            <div className='flex mt-6 gap-4'>
              <button
                type='button'
                onClick={() =>
                  setCurrentQuestionIndex((index) => Math.max(index - 1, 0))
                }
                disabled={currentQuestionIndex === 0}
                className='cursor-pointer px-4 py-2 rounded bg-gray-200 text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors'
              >
                Prev
              </button>
              <button
                type='button'
                onClick={() =>
                  setCurrentQuestionIndex((index) =>
                    Math.min(index + 1, questions.length - 1)
                  )
                }
                disabled={currentQuestionIndex === questions.length - 1}
                className='cursor-pointer px-4 py-2 rounded bg-blue-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors'
              >
                Next
              </button>
            </div>
            <div className='mt-6'>
              <button
                type='submit'
                disabled={isSubmitting}
                className='cursor-pointer bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 :disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
              </button>
            </div>
          </div>
          {currentQuestion && (
            <div className='bg-gray-800 p-6 mb-6 max-w-xl mx-auto'>
              <div className='text-xs text-gray-400 mb-1'>
                Question ID: {currentQuestion.id}
              </div>
              <div className='text-lg font-bold mb-4 text-white'>
                {currentQuestion.prompt}
              </div>
              {currentQuestion.type === 'mcq' && currentQuestion.options ? (
                <RadioGroupControlled
                  name={`${currentQuestion.id}`}
                  control={control}
                  options={
                    (currentQuestion.options.map((option, index) => ({
                      id: index.toString(),
                      name: option,
                    })) as { id: string; name: string }[]) || []
                  }
                />
              ) : null}

              {currentQuestion.type === 'short' && (
                <InputControlled
                  label='Answer'
                  name={`${currentQuestion.id}`}
                  control={control}
                  placeholder='Enter answer here'
                />
              )}
              {currentQuestion.type === 'code' && (
                <TextAreaControlled
                  label='Code'
                  name={`${currentQuestion.id}`}
                  control={control}
                  placeholder='Enter code here'
                />
              )}
            </div>
          )}
        </div>
      </form>
    </>
  )
}
