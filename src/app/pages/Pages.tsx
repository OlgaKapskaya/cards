import { FC } from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { Error404 } from '../../common/components/error404/Error404'
import { PATH } from '../../common/constants/path'
import { CheckEmail } from '../../features/auth/forgot-password/check-email/CheckEmail'
import { NewPassword } from '../../features/auth/forgot-password/new-password/NewPassword'
import { PasswordRecovery } from '../../features/auth/forgot-password/password-recovery/PasswordRecovery'
import { Login } from '../../features/auth/login/Login'
import { Registration } from '../../features/auth/registration/Registration'
import { Profile } from '../../features/profile/Profile'
import { Test } from '../../features/test/Test'

export const Pages: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={PATH.PROFILE} />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTRATION} element={<Registration />} />
      <Route path={PATH.PROFILE} element={<Profile />} />
      <Route path={PATH.TEST} element={<Test />} />
      <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery />} />
      <Route path={PATH.CHECK_EMAIL + '/:email'} element={<CheckEmail />} />
      <Route path={PATH.NEW_PASSWORD} element={<NewPassword />} />
      <Route path={PATH.ERROR404} element={<Error404 />} />
    </Routes>
  )
}