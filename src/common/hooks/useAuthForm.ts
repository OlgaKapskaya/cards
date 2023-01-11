import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from './react-redux-hooks'

export const useAuthForm = <T extends FieldValues>(schema: any) => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const signUpStatus = useAppSelector(state => state.auth.isRegistered)
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

  return { isLoggedIn, signUpStatus, dispatch, navigate, register, handleSubmit, errors }
}
