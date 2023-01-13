import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

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

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })

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
  }
}
