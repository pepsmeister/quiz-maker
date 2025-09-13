import { Link } from 'react-router-dom'

type NotFoundProps = {
  title?: string
}

export const NotFound = ({ title = 'Page Not Found' }: NotFoundProps) => {
  return (
    <div className='grid min-h-[100vh] place-items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8'>
      <div className='text-center'>
        <p className='text-base font-semibold text-indigo-400'>404</p>
        <h1 className='mt-4 text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl'>
          {title}
        </h1>
        <p className='mt-6 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8'>
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <p className='mt-2 text-pretty text-base font-medium text-gray-400 sm:text-lg/8'>
          The link may be broken or the page may have been moved.
        </p>
        <p className='mt-2 text-pretty text-base font-medium text-gray-400 sm:text-lg/8'>
          Please check the URL or return to the homepage.
        </p>
        <p className='mt-2 text-pretty text-base font-medium text-gray-400 sm:text-lg/8'>
          If you typed the address, make sure the spelling is correct.
        </p>
        <p className='mt-2 text-pretty text-base font-medium text-gray-400 sm:text-lg/8'>
          If you believe this is an error, contact support or try again later.
        </p>
        <p className='mt-2 text-pretty text-base font-medium text-gray-400 sm:text-lg/8'>
          You can also use the navigation menu to find what you need.
        </p>
        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <Link
            to='/'
            className='rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  )
}
