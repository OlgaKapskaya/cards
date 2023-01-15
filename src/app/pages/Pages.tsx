import { Route, Routes } from 'react-router-dom'

import { Error404 } from '../../common/components/error404/Error404'
import { PATH } from '../../common/constants/path'
import { CheckEmail } from '../../features/auth/forgot-password/check-email/CheckEmail'
import { NewPassword } from '../../features/auth/forgot-password/new-password/NewPassword'
import { PasswordRecovery } from '../../features/auth/forgot-password/password-recovery/PasswordRecovery'
import { Login } from '../../features/auth/login/Login'
import { Registration } from '../../features/auth/registration/Registration'
import { Cards } from '../../features/cards/Cards'
import { PacksList } from '../../features/packs/PacksList'
import { Profile } from '../../features/profile/Profile'
import { Test } from '../../features/test/Test'

import { PrivateRoutes } from './PrivateRoutes'

export const Pages = () => {
  return (
    <Routes>
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTRATION} element={<Registration />} />
      <Route path={PATH.TEST} element={<Test />} />
      <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery />} />
      <Route path={PATH.CHECK_EMAIL + '/:email'} element={<CheckEmail />} />
      <Route path={PATH.NEW_PASSWORD} element={<NewPassword />} />
      <Route path={PATH.ERROR404} element={<Error404 />} />
      <Route path={PATH.PACKS} element={<PacksList />} />
      <Route path={PATH.CARDS} element={<Cards />} />

      <Route element={<PrivateRoutes />}>
        <Route index path="/" element={<Profile />} />
        <Route path={PATH.PROFILE} element={<Profile />} />
      </Route>
    </Routes>
  )
}
