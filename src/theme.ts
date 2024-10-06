import { createTheme, ThemeOptions } from '@mui/material/styles'

export const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
}

export const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#303030',
      paper: '#424242',
    },
  },
}

export const createAppTheme = (options: ThemeOptions) => {
  return createTheme({
    ...options,
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: options.palette?.mode === 'light' ? '#1976d2' : '#212121',
          },
        },
      },
    },
  })
}