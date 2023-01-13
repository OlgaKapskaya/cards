import { Navigate, Outlet } from 'react-router-dom'

import { PATH } from '../../common/constants/path'
import { useAppSelector } from '../../common/hooks/reactReduxHooks'

export const PrivateRoutes = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  return isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}
