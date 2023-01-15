import { FC } from 'react'

import CircularProgress from '@mui/material/CircularProgress'

export const Loader: FC = () => {
  return (
    <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
      <CircularProgress />
    </div>
  )
}
