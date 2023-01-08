import { FC } from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { Error404 } from '../../common/components/Error404/Error404'
import { PATH } from '../../common/constants/path'
import { Login } from '../../features/Login/Login'
import { NewPassword } from '../../features/NewPassword/NewPassword'
import { PasswordRecovery } from '../../features/PasswordRecovery/PasswordRecovery'
import { Profile } from '../../features/Profile/Profile'
import { Registration } from '../../features/Registration/Registration'
import { Test } from '../../features/Test/Test'

export const Pages: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={PATH.PROFILE} />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTRATION} element={<Registration />} />
      <Route path={PATH.PROFILE} element={<Profile />} />
      <Route path={PATH.TEST} element={<Test />} />
      <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery />} />
      <Route path={PATH.NEW_PASSWORD} element={<NewPassword />} />
      <Route path={PATH.ERROR404} element={<Error404 />} />
    </Routes>
  )
}
