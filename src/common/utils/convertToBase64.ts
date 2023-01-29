import { ChangeEvent } from 'react'

import { setAppMessage, setAppStatus } from 'app/appSlice'
import { AppDispatch } from 'app/store'

export const convertToBase64 = (file: File, callBack: (value: string) => void) => {
  const reader = new FileReader()

  reader.onloadend = () => {
    const file64 = reader.result as string

    callBack(file64)
  }
  reader.readAsDataURL(file)
}

export const onChangeImg = (
  e: ChangeEvent<HTMLInputElement>,
  dispatch: AppDispatch,
  callback: (img: string) => void
) => {
  if (e.target.files && e.target.files.length) {
    const file = e.target.files[0]
    const fileSizeMB = file.size / 1024 ** 2

    if (fileSizeMB < 1) {
      convertToBase64(file, (file64: string) => {
        callback(file64)
      })
    } else {
      dispatch(setAppMessage('The file is too large'))
      dispatch(setAppStatus('failed'))
    }
  }
}
