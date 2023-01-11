import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from './react-redux-hooks'

export const useAuthForm = <T extends FieldValues>(schema: any) => {
  const { isLoggedIn, isRegistered, isSentRecoveryEmail, isRecoveredPassword } = useAppSelector(
    state => state.auth
  )
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
