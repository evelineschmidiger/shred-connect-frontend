
import AdDetailPage from "./components/AdDetailPage.jsx";
import MainPage from "./components/MainPage.jsx"
import { AppShell,  Flex, Title, Box, Button, Code, Group, LoadingOverlay, Text } from '@mantine/core';
import "@mantine/core/styles.css";
import { useFetch } from '@mantine/hooks';
import './App.css'


export default function App() {
  
  return (
    <>
      <AppShell 
        header={{ height: 130 }}
        padding="md"
      >

        <AppShell.Header>
          <Flex style={{backgroundColor: "var(--mantine-color-blue-8)"}} justify="space-between" align="center">

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
          {/* <Fetching / > */}
        </AppShell.Main>
      </AppShell>
    </>
  )
}



{
/* 
TESTING FETCH-HOOK
function Fetching() {
  const { data, loading, error, refetch, abort } = useFetch(
    'https://jsonplaceholder.typicode.com/todos/'
  );

  return (
    <div>
      {error && <Text c="red">{error.message}</Text>}

      <Group>
        <Button onClick={refetch} color="blue">
          Refetch
        </Button>
        <Button onClick={abort} color="red">
          Abort
        </Button>
      </Group>
      <Box pos="relative" mt="md">
        <Code block>{data ? JSON.stringify(data.slice(0, 3), null, 2) : 'Fetching'}</Code>
        <LoadingOverlay visible={loading} />
      </Box>
    </div>
  );
} */}