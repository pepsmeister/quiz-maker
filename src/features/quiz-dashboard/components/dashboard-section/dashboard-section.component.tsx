import type { ReactNode } from 'react'

interface DashboardSectionProps {
  title: string
  description: string
  children?: ReactNode
}

export const DashboardSection = ({
  title,
  description,
  children,
}: DashboardSectionProps) => {
  return (
    <div className='bg-gray-900'>
      <div className='px-6 py-24 sm:py-32 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl'>
            {title}
          </h2>
          <p className='mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-gray-300'>
            {description}
          </p>
          <div className='mt-5 flex items-center justify-center gap-x-6'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
