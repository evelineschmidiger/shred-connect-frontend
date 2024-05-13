import { useState, useEffect } from 'react';
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router";
import { Container, Stack, Title, Button, SegmentedControl } from '@mantine/core';


export default function UpdateAdPage() {
    const [value, setValue] = useState('/update/create');
    
    
    const navigate = useNavigate();

    useEffect(function() {
        navigate(`${value}`)
    }, [value, navigate])

    return (
        <Container size="sm">
            <Stack>
                
                {/* <Title order={4}>Was möchtest du machen?</Title> */}
                <SegmentedControl
                    value={value}
                    onChange={setValue}
                    data={[
                        {label: "Inserat erstellen", value: "create"},
                        {label: "Inserat bearbeiten", value: "update"},
                        {label: "Inserat löschen", value: "delete"},
                    ]}
                />
                <Outlet />
            </Stack>
            {/* <Button variant="default" onClick={() => navigate("/")}>Zurück zur Startseite</Button> */}

        
        </Container>
    )
}
