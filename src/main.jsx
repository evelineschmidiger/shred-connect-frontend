import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createTheme, MantineProvider, rem } from '@mantine/core';
import "@mantine/core/styles.css";

const theme = createTheme({
  headings: {
    sizes: {
      h1: {
        fontSize: rem(60)
      },
      h2: {
        fontSize: rem(40)
      }
    }
  },
  // default border radius
  defaultRadius: 'sm'
/* styles to overwrite */

});

console.log(theme);

ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider theme={theme} defaultColorScheme="dark">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MantineProvider>
)
