import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { newPasswordValidationScheme } from '../../../common/constants/validators/validationSchemes'
import { useAppDispatch } from '../../../common/hooks/react-redux-hooks'
import { createNewPassword } from '../../Login/authSlice'
import { INewPasswordForm } from '../NewPassword'

export const useNewPasswordForm = () => {
  const dispatch = useAppDispatch()
  const params = useParams<{ token: string }>()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewPasswordForm>({
    defaultValues: {
      password: '',
    },
    mode: 'onTouched',
    resolver: yupResolver(newPasswordValidationScheme),
  })
  const onSubmit: SubmitHandler<INewPasswordForm> = data => {
    if (params.token)
      dispatch(
        createNewPassword({
          password: data.password,
          resetPasswordToken: params.token,
        })
      )
  }

  return { register, handleSubmit, errors, onSubmit }
}
