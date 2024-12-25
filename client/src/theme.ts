import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#629584',
      light: '#E2F1E7',
    },
    secondary: {
      main: '#387478',
      light: '#FCE4EC',
    },
    error: {
      main: '#243642',
    },
    grey: {
      200: '#eeeeee',
      500: '#9e9e9e',
    },
    common: {
      white: '#ffffff',
    },
  },
});

export default theme;
