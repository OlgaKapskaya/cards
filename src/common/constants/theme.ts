import { createTheme } from '@mui/material'

export const buttonWhite = ['#FCFCFC', '#000']
export const buttonRed = ['#FF3636', '#FCFCFC']
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
          font-family: 'Montserrat';
          font-style: normal;
          font-display: swap;
          font-weight: 500;
          src: url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
})
