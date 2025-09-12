import { Footer } from '@/components/footer/footer.component'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  )
}
