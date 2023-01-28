import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector, isLoggedInSelector } from 'common'
import { PATH } from 'common/constants/path'

export const PrivateRoutes = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)

  return isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}
