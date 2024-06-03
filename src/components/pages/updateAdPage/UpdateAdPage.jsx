import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import { Outlet, useParams } from "react-router-dom";
import { Container, Stack, Tabs } from '@mantine/core';


export default function UpdateAdPage() {
    const navigate = useNavigate();
    const [value, setValue] = useState("")


    useEffect(function () {
        location.pathname.includes('/create') && setValue("create");
        location.pathname.includes('/verify') && setValue("verify");
    }, [])

    useEffect(function() {
        navigate(`${value}`)
    }, [value, navigate])

    return (
        <Container size="lg">
            <Stack> 

                <Tabs
                /* value={tabValue} */
                /* onChange={(value) => navigate(`${value}`)} */
                value={value} onChange={setValue}
                >
                    <Tabs.List>
                        <Tabs.Tab value="create">Inserat erstellen</Tabs.Tab>
                        <Tabs.Tab value="verify">Inserat ändern oder löschen</Tabs.Tab>
                    </Tabs.List>
                </Tabs>

                <Outlet />

            </Stack>
        
        </Container>
    )
}
