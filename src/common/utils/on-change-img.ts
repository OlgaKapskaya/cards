import { ChangeEvent } from 'react'

import { setAppMessage, setAppStatus } from '../../app/appSlice'
import { AppDispatch } from '../../app/store'

import { convertToBase64 } from './convertToBase64'

export const onChangeImg = (
  e: ChangeEvent<HTMLInputElement>,
  dispatch: AppDispatch,
  setImg: (img: string) => void
) => {
  if (e.target.files && e.target.files.length) {
    const file = e.target.files[0]
    const fileSizeMB = file.size / 1024 ** 2

    if (fileSizeMB < 1) {
      convertToBase64(file, (file64: string) => {
        setImg(file64)
      })
    } else {
      dispatch(setAppMessage('The file is too large'))
      dispatch(setAppStatus('failed'))
    }
  }
}
