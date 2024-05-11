import { Link } from "react-router-dom";
import { Flex, Image, Title, Group, Anchor } from '@mantine/core';

function Navigation() {
    return (
        <Flex justify="space-between" direction="row" align="center">

            <Link style={{textDecoration: "none", boxShadow: "none"}} to="/">
                <Anchor Underline never>
                    <Group wrap="nowrap">
                        <Image w="auto" fit="contain" h={45} radius="md" src="/public/home.png">
                        </Image>
                        <Title order={5}>SHRED-CONNECT</Title>
                    </Group>
                </Anchor>
            </Link>

            <Link style={{textDecoration: "none", boxShadow: "none"}} to="/update">
                <Anchor Underline never>
                    <Title order={5}>Inserat erstellen oder bearbeiten</Title>
                </Anchor>
            </Link>

        </Flex>
    )
}

export default Navigation
