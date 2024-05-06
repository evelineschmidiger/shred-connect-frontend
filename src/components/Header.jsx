import { Link } from "react-router-dom";
import { Flex, Title, Box, Button, Code, Group, LoadingOverlay, Text } from '@mantine/core';


export default function Header() {
    return (
        <>
            <Flex style={{backgroundColor: "var(--mantine-color-blue-9)"}} justify="space-between" align="center">
            <Link to="/">Home</Link>
            <Link to="/update">Inserat erstellen oder ändern</Link>
            </Flex>
            <Flex style={{padding: "15px"}} justify="space-between" align="center">
            <div style={{fontSize: "60px"}} className="guitarEmoji">🎸</div>
            <Flex direction="column" align="center">
                <Title order={1}>SHRED-CONNECT</Title>
                <p>Gratis Bandinserate schalten um Musiker für deine Ideen zu finden</p>
            </Flex>
            <div style={{fontSize: "60px"}} className="guitarEmoji">🎸</div>
            </Flex>
        </>
    )
}