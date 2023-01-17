import { styled } from '@mui/material'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
  '& .MuiToggleButtonGroup-grouped': {
    borderRadius: '2px',
    width: '98px',
    height: '36px',
  },
  '& .MuiToggleButtonGroup-grouped.Mui-selected': {
    background: '#1976d2',
    color: '#FFF',
    '&:hover': {
      background: '#1976d2',
      color: '#FFF',
    },
  },
}))
