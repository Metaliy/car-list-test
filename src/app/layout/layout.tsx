
import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from 'react-router-dom'
import { Header } from 'shared/ui/header/header'

export const Layout = () => {

  return (
    <>
      <Header />

      <main className='layout__content' >
        <Outlet />
      </main>
    </>
  )
}