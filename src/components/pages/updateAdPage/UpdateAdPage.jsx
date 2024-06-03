import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import { Outlet, useParams, useLocation } from "react-router-dom";
import { Container, Stack, Tabs } from '@mantine/core';
import { IconEdit, IconFilePlus } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';


export default function UpdateAdPage() {
    const navigate = useNavigate();
    //const [value, setValue] = useState("")
    const isSmall = useMediaQuery(`(max-width: 600px)`);
    const { tabValue } = useParams();


/*     useEffect(function () {
        if (location.pathname.includes("/verify")) {navigate("verify")}
        if (location.pathname.includes("/create")) {navigate("create")}
    }, []) */

/*     useEffect(function() {
        navigate(`${value}`)
    }, [value, navigate]) */

    return (
        <Container size="lg">
            <Stack> 
                <Tabs
                orientation={isSmall ? "vertical" : "horizontal"}
                variant="default"
                mb="xl"
                //value={value} 
                //onChange={setValue}
                defaultValue="create"
                      value={tabValue}
                onChange={(value) => {navigate(`${value}`)}}

                >
                    <Tabs.List>
                        <Tabs.Tab value="create" fz={{ base: "0.8rem", xs: "1rem"}}leftSection={<IconFilePlus stroke={1} style={{ width: "1.7rem", height: "1.7rem" }} />}>Inserat erstellen</Tabs.Tab>
                        <Tabs.Tab value="verify" fz={{ base: "0.8rem", xs: "1rem"}} leftSection={<IconEdit stroke={1} style={{ width: "1.7rem", height: "1.7rem" }} />}>Inserat ändern oder löschen</Tabs.Tab>
                    </Tabs.List>
                </Tabs>

                <Outlet />

            </Stack>
        
        </Container>
    )
}
