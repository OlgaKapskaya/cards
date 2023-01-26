import { createTheme } from '@mui/material'

export const buttonWhite = ['#FCFCFC', '#000']
export const buttonRed = ['#FF3636', '#FCFCFC']
export const buttonBlue = ['#1976d2', '#FFF']
export const iconButton = {
  borderRadius: '2px',
  minWidth: '0px',
  height: '36px',
  width: '36px',
  background: 'transparent',
  boxShadow: 'none',
  border: '1px solid #d9d9d9',
  '&:hover': {
    background: '#eeeeee',
    boxShadow: 'none',
  },
}

export const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Conv_Montserrat-VariableFont_wght';
          src: url('fonts/Montserrat-VariableFont_wght.eot');
          src: local('☺'), url('fonts/Montserrat-VariableFont_wght.woff') format('woff'), url('fonts/Montserrat-VariableFont_wght.ttf') format('truetype'), url('fonts/Montserrat-VariableFont_wght.svg') format('svg');
          font-weight: normal;
          font-style: normal;
        }
      `,
    },
  },
})
