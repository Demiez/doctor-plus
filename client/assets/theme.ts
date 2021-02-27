import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';

export const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      light: '#5c67a3',
      main: '#3f4771',
      dark: '#2e355b',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff79b0',
      main: '#ff4081',
      dark: '#c60055',
      contrastText: '#000',
    },
    openTitle: '#3f4771',
    projectedTitle: pink['400'],
    type: 'light',
  },
});
