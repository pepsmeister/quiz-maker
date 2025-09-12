import { DashboardSection } from '@/features/quiz-dashboard/components/dashboard-section/dashboard-section.component'
import { useState, type ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const QuizDashboardView = () => {
  const navigate = useNavigate()
  const [quizId, setQuizId] = useState<string>('')

  return (
    <>
      <DashboardSection
        title='Quiz Builder'
        description='Create and customize quizzes. Add questions, set answers, and manage your quiz content.'
      >
        <Link
          to='/quiz-builder'
          className='rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
        >
          Create Quiz
        </Link>
      </DashboardSection>
      <div className='flex items-center bg-gray-900  px-18'>
        <div aria-hidden='true' className='w-full border-t border-white/15' />
        <div className='relative flex justify-center'>
          <span className='bg-gray-900 px-2 text-sm text-gray-400'>quiz</span>
        </div>
        <div aria-hidden='true' className='w-full border-t border-white/15' />
      </div>
      <DashboardSection
        title='Quiz Player'
        description='Answer quizzes and test your knowledge. Select your answers and see your results.'
      >
        <div className='mt-5 sm:flex sm:items-center w-full justify-center'>
          <div>
            <input
              id='quiz-id'
              type='text'
              placeholder='Load Quiz ID'
              aria-label='Quiz ID'
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setQuizId(e.target.value)
              }
              className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
            />
          </div>
          <button
            onClick={() => {
              navigate(`/quiz-player/${quizId}`)
            }}
            disabled={!quizId}
            className='w-1/5 mt-3 inline-flex cursor-pointer items-center justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:ml-3 sm:mt-0 sm:w-auto disabled:cursor-not-allowed disabled:bg-gray-600'
          >
            Load Quiz
          </button>
        </div>
      </DashboardSection>
    </>
  )
}
