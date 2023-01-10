import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'

import { forgotValidationSchema } from '../../../common/constants/validators/validationSchemes'
import { useAppDispatch } from '../../../common/hooks/react-redux-hooks'
import { forgotPass } from '../../Login/authSlice'

type IFormInput = {
  email: string
}

const customMessage = `
                  <div style='background-color: indianred; padding: 15px'>
                      password recovery link: 
                    <a href='http://localhost:3000/#/set-new-password/$token$'>
                      link
                    </a>
                  </div>`

export const usePasswordRecovery = () => {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(forgotValidationSchema), mode: 'onTouched' })

  const onSubmit: SubmitHandler<IFormInput> = data => {
    const model = {
      email: data.email,
      from: 'test-front-admin <kadegrob.kirill@gmail.com>',
      message: customMessage,
    }

    dispatch(forgotPass(model))
  }

  return { register, handleSubmit, errors, onSubmit }
}
