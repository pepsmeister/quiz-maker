import { AppBrowserRouter } from '@/router/router'
import { RouterProvider } from 'react-router-dom'

export const App = () => {
  return <RouterProvider router={AppBrowserRouter} />
}
