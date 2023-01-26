import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { appStatusSelector } from '../selectors/appSelectors'
import {
  isLoggedInSelector,
  isRecoveredPasswordSelector,
  isRegisteredSelector,
  isSentRecoveryEmailSelector,
} from '../selectors/authSelectors'

import { useAppDispatch, useAppSelector } from './reactReduxHooks'

export const useAuthForm = <T extends FieldValues>(schema: any) => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const isRegistered = useAppSelector(isRegisteredSelector)
  const isSentRecoveryEmail = useAppSelector(isSentRecoveryEmailSelector)
  const isRecoveredPassword = useAppSelector(isRecoveredPasswordSelector)
  const appStatus = useAppSelector(appStatusSelector)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<T>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })

  const setCustomError = (name: any, message: string) => {
    return setError(name, {
      type: 'custom',
      message: message,
    })
  }

  return {
    isLoggedIn,
    isRegistered,
    isSentRecoveryEmail,
    isRecoveredPassword,
    dispatch,
    navigate,
    register,
    handleSubmit,
    errors,
    appStatus,
    reset,
    setCustomError,
  }
}
