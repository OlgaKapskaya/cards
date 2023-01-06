import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { AppDispatch, AppRootStateType } from '../../app/store'

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
