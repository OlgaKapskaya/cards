import { FC } from 'react'

import { Route, Routes } from 'react-router-dom'

import { Login } from '../../../features/Login/Login'
import { NewPassword } from '../../../features/NewPassword/NewPassword'
import { PasswordRecovery } from '../../../features/PasswordRecovery/PasswordRecovery'
import { Profile } from '../../../features/Profile/Profile'
import { Registration } from '../../../features/Registration/Registration'
import { Test } from '../../../features/Test/Test'
import { PATH } from '../../constants/path'
import { Error404 } from '../Error404/Error404'

export const Pages: FC = () => {
  return (
    <Routes>
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
