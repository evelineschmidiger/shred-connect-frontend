import { useNavigate, useParams } from "react-router-dom";
import { Container, Stack, Tabs } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconEdit, IconFilePlus } from '@tabler/icons-react';
import Verify from './updateAdPageSub/Verify';
import CreateAd from './updateAdPageSub/CreateAd';


export default function UpdateAdPage() {
    const navigate = useNavigate();
    const isSmall = useMediaQuery(`(max-width: 600px)`);
    const { task } = useParams();

    return (
        <Container size="lg">
            <Stack> 
                <Tabs
                orientation={isSmall ? "vertical" : "horizontal"}
                variant="default"
                value={task}
                onChange={(value) => {navigate(`/update/${value}`)}}
                >
                    <Tabs.List mb="xl">
                        <Tabs.Tab value="create" fz={{ base: "0.8rem", xs: "1rem"}} leftSection={<IconFilePlus stroke={1} style={{ width: "1.7rem", height: "1.7rem" }} />}>Inserat erstellen</Tabs.Tab>
                        <Tabs.Tab value="verify" fz={{ base: "0.8rem", xs: "1rem"}} leftSection={<IconEdit stroke={1} style={{ width: "1.7rem", height: "1.7rem" }} />}>Inserat ändern oder löschen</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="create">
                    <CreateAd/>
                    </Tabs.Panel>

                    <Tabs.Panel value="verify">
                        <Verify/>
                    </Tabs.Panel>

                </Tabs>
            </Stack>
        
        </Container>
    )
}
