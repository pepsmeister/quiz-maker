import { Link, useLocation } from 'react-router-dom'

export const QuizResultsView = () => {
  const location = useLocation()
  const { score } = location.state

  return (
    <div className='flex flex-col items-center justify-center min-h-[70vh] bg-gray-900'>
      <h1 className='text-5xl font-bold mb-6 text-blue-700'>Quiz Results</h1>
      <p className='text-3xl font-semibold text-gray-800'>
        Your score: <span className='text-blue-500'>{score}</span>
      </p>

      <Link
        to='/'
        className='mt-16 rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
      >
        Go to Dashboard
      </Link>
    </div>
  )
}
