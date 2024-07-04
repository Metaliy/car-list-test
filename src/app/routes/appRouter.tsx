import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { Fallback } from 'shared/ui/fallback'

import { Layout } from 'app/layout'
import { Cars } from 'pages/cars'



export const AppRouter = () => {


  const routers = createRoutesFromElements(
    <Route
      path='/'
      element={<Layout />}
      errorElement={<Fallback />}>
      <Route index element={<Cars />} />
    </Route>
  )

  const router = createHashRouter(routers, {})

  return (
    <RouterProvider router={router} />
  )
}