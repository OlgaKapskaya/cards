import { Navigate, Route, Routes } from 'react-router-dom'

import { PrivateRoutes } from './PrivateRoutes'

import { Error404 } from 'common/components/error404/Error404'
import { PATH } from 'common/constants/path'
import { CheckEmail } from 'features/auth/forgot-password/check-email/CheckEmail'
import { NewPassword } from 'features/auth/forgot-password/new-password/NewPassword'
import { PasswordRecovery } from 'features/auth/forgot-password/password-recovery/PasswordRecovery'
import { Login } from 'features/auth/login/Login'
import { Registration } from 'features/auth/registration/Registration'
import { Cards } from 'features/cards/Cards'
import { Learn } from 'features/learn/Learn'
import { Packs } from 'features/packs/Packs'
import { Profile } from 'features/profile/Profile'

export const Pages = () => {
  return (
    <Routes>
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTRATION} element={<Registration />} />
      <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery />} />
      <Route path={PATH.CHECK_EMAIL + '/:email'} element={<CheckEmail />} />
      <Route path={PATH.NEW_PASSWORD} element={<NewPassword />} />
      <Route path={PATH.ERROR404} element={<Error404 />} />

      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Navigate to={PATH.PACKS} />} />
        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path={PATH.PACKS} element={<Packs />} />
        <Route path={PATH.PACKS + PATH.CARDS} element={<Cards />} />
        <Route path={PATH.LEARN + '/:packId'} element={<Learn />} />
      </Route>
    </Routes>
  )
}
