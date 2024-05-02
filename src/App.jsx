
import AdDetailPage from "./components/AdDetailPage.jsx";
import MainPage from "./components/MainPage.jsx"
import { AppShell,  Flex, Title, Box, Button, Code, Group, LoadingOverlay, Text } from '@mantine/core';
import "@mantine/core/styles.css";
import './App.css'


export default function App() {
  
  return (
    <>
      <AppShell 
        header={{ height: 180 }}
        padding="md"
      >

        <AppShell.Header>
          <Flex style={{backgroundColor: "var(--mantine-color-blue-9)"}} justify="space-between" align="center">

          <Title order={4}>Home</Title>
          <Title order={4}>Inserat erstellen oder ändern</Title>
          </Flex>
          <Flex style={{padding: "15px"}} justify="space-between" align="center">
            <div style={{fontSize: "60px"}} className="guitarEmoji">🎸</div>
            <Flex direction="column" align="center">
              <Title order={1}>SHRED-CONNECT</Title>
              <p>Gratis Bandinserate schalten um Musiker für deine Ideen zu finden</p>
            </Flex>
            <div style={{fontSize: "60px"}} className="guitarEmoji">🎸</div>
          </Flex>
        </AppShell.Header>

        <AppShell.Main>
          <MainPage />
          {/* <AdDetailPage /> */}
        </AppShell.Main>
      </AppShell>
    </>
  )
}


