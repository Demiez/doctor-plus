import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../assets/theme';
import { MainRouter } from './MainRouter';

export const Main: React.FC = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <MainRouter />
    </ThemeProvider>
  </BrowserRouter>
);
