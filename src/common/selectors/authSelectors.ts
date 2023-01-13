import { AppRootStateType } from '../../app/store'

export const isLoggedInSelector = (state: AppRootStateType) => state.auth.isLoggedIn
export const isRegisteredSelector = (state: AppRootStateType) => state.auth.isRegistered
export const isSentRecoveryEmailSelector = (state: AppRootStateType) =>
  state.auth.isSentRecoveryEmail
export const isRecoveredPasswordSelector = (state: AppRootStateType) =>
  state.auth.isRecoveredPassword
