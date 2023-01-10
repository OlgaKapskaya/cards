import React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'

import { registrationValidationSchema } from '../../../common/constants/validators/validationSchemes'
import { useAppDispatch } from '../../../common/hooks/react-redux-hooks'
import { signUp, signUpStatusCreator } from '../../Login/authSlice'

type IFormInput = {
  email: string
  password: string
  confirmPassword: string
}

export const useRegistration = () => {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registrationValidationSchema),
    mode: 'onTouched',
  })
  const onSubmit: SubmitHandler<IFormInput> = data => dispatch(signUp(data))
  const handleClose = (event?: React.SyntheticEvent<any> | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(signUpStatusCreator(false))
  }

  return { register, handleSubmit, errors, onSubmit, handleClose }
}
