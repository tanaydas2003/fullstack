'use client'; 
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Profile from '../../components/Profile';

const theme = createTheme({
  // Customize your theme here
});

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Profile  {...pageProps}/>
    </ThemeProvider>
  );
}