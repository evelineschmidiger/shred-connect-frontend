import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createTheme, MantineProvider, rem } from '@mantine/core';
import "@mantine/core/styles.css";

const theme = createTheme({
  // scale: 0.9,
  headings: {
    sizes: {
      h1: {
        fontSize: rem(40)
      },
      h2: {
        fontSize: rem(30)
      }
    }
  },
  // fontFamily: string;
  // default border radius
  defaultRadius: 'sm'
/* styles to overwrite */

});


ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider theme={theme} defaultColorScheme="dark">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MantineProvider>
)
