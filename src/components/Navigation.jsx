import { Link, Navigate } from "react-router-dom";
import { Flex, Image, Title, Group, Text, ActionIcon, HoverCard } from '@mantine/core';
import { IconEdit } from "@tabler/icons-react";

function Navigation() {
    return (
        <Flex pl="1.3rem" pr="1.3rem" pt=".9rem" pb=".9rem" justify="space-between" direction="row" align="center" >

            <Link style={{textDecoration: "none", boxShadow: "none", color: "var(--mantine-color-blue-5)"}} to="/">
                <Group gap="xs" wrap="nowrap" >
                    <Image w="auto" fit="contain" h={30} src="/public/guitar1.svg">
                    </Image>
                    <Title fz="1.2rem" fw={600} variant="gradient" gradient={{ from: "var(--mantine-color-blue-9)", to: "var(--mantine-color-teal-9)", deg: 90 }}>SHRED-CONNECT</Title>
                </Group> 
            </Link>


            <Group justify="center">
                <HoverCard width={280}>
                    <HoverCard.Target>
                        <Link style={{textDecoration: "none", boxShadow: "none"}} to="/update">
                            <ActionIcon size="2.3rem" variant="filled" style={{color: "var(--mantine-color-blue-1)", backgroundColor: "var(--mantine-color-blue-8)"}}>
                                <IconEdit stroke={1.5} style={{ width: "1.7rem", height: "1.7rem" }}>
                                </IconEdit>
                            </ActionIcon>
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
