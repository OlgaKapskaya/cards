import { AppRootStateType } from '../../app/store'

export const appStatusSelector = (state: AppRootStateType) => state.app.status
export const appMessageSelector = (state: AppRootStateType) => state.app.message
export const appIsInitializedSelector = (state: AppRootStateType) => state.app.isInitialized
