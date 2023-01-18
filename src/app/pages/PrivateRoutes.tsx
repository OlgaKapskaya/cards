import { Navigate, Outlet } from 'react-router-dom'

import { PATH } from '../../common/constants/path'
import { useAppSelector } from '../../common/hooks/reactReduxHooks'
import { isLoggedInSelector } from '../../common/selectors/authSelectors'

export const PrivateRoutes = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)

  return isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}
