import { NotFound } from '@/components/not-found/not-found.component'
import { Layout } from '@/features/layouts/layout.component'
import { QuizBuilderView } from '@/features/quiz-builder/quiz-builder.view'
import { QuizDashboardView } from '@/features/quiz-dashboard/quiz-dashboard.view'
import { QuizPlayerView } from '@/features/quiz-player/quiz-player.view'
import { QuizResultsView } from '@/features/quiz-results/quiz-results.view'

export const ROUTES_CONFIG = [
  {
    errorElement: <NotFound />,
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <QuizDashboardView />,
      },
      {
        path: '/quiz-player/:quizId',
        element: <QuizPlayerView />,
      },
      {
        path: '/quiz-builder',
        element: <QuizBuilderView />,
      },
      {
        path: '/quiz-results',
        element: <QuizResultsView />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]
