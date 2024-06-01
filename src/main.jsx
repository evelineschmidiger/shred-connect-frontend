import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createTheme, MantineProvider, rem } from '@mantine/core';
import { AppShell, Space, Group, Text, Button, Notification } from '@mantine/core';



import { Notifications } from '@mantine/notifications';
import "@mantine/core/styles.css";

const theme = createTheme({
  // scale: 0.9,
  fontFamily: "Verdana, sans-serif",
  defaultGradient: {
    from: "var(--mantine-color-blue-9)",
    //to: "var(--mantine-color-blue-8)",
    to: "var(--mantine-color-cyan-9)",
    deg: 90,
  },
  // fontFamily: string;
  // default border radius
  defaultRadius: 'sm'
/* styles to overwrite */

});


ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider theme={theme} defaultColorScheme="dark">
    <Notifications position="top-right" containerWidth={390}><Button>lgl</Button></Notifications>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MantineProvider>
)
