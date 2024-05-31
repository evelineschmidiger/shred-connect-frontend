import { Link } from "react-router-dom";
import { Flex, Image, Title, Group, Text, ActionIcon, HoverCard } from '@mantine/core';
import { IconEdit } from "@tabler/icons-react";

function Navigation() {
    return (
        <Flex justify="space-between" direction="row" align="center">

            <Link style={{textDecoration: "none", boxShadow: "none", color: "var(--mantine-color-blue-5)"}} to="/">
                <Group gap="xs" wrap="nowrap">
                    <Image w="auto" fit="contain" h={25} src="/public/guitar1.svg">
                    </Image>
                    <Title order={4}>SHRED-CONNECT</Title>
                </Group> 
            </Link>


            <Group justify="center">
                <HoverCard width={280} shadow="md">
                    <HoverCard.Target>
                        <Link style={{textDecoration: "none", boxShadow: "none"}} to="/update">
                            <ActionIcon size="xl" variant="default"><IconEdit style={{color: "var(--mantine-color-blue-5)"}}></IconEdit></ActionIcon>
                        </Link>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <Text size="sm">Inserat erstellen, updaten oder löschen</Text>
                    </HoverCard.Dropdown>
                </HoverCard>
            </Group>




        </Flex>
    )
}

export default Navigation
