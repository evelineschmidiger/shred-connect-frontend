import { Link } from "react-router-dom";
import { Flex, Image, Title, Group } from '@mantine/core';

function Navigation() {
    return (
        <Flex justify="space-between" direction="row" align="center">

            <Link style={{textDecoration: "none", boxShadow: "none", color: "var(--mantine-color-blue-5)"}} to="/">
                <Group gap="xs" wrap="nowrap">
                    <Image w="auto" fit="contain" h={25} src="/public/guitar1.svg">
                    </Image>
                    <Title order={6}>SHRED-CONNECT</Title>
                </Group> 
            </Link>

            <Link style={{textDecoration: "none", boxShadow: "none", color: "var(--mantine-color-blue-5)"}} to="/update">
                <Title order={6}>Inserat erstellen oder bearbeiten</Title>
            </Link>

        </Flex>
    )
}

export default Navigation
