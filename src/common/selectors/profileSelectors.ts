import { AppRootStateType } from '../../app/store'

export const userNameSelector = (state: AppRootStateType) => state.profile.profile.name
export const userAvatarSelector = (state: AppRootStateType) => state.profile.profile.avatar
export const userEmailSelector = (state: AppRootStateType) => state.profile.profile.email
export const userIDSelector = (state: AppRootStateType) => state.profile.profile._id
