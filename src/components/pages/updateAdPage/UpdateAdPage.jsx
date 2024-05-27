import { useState, useEffect } from 'react';
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router";
import { Container, Stack, Title, Button, SegmentedControl } from '@mantine/core';


export default function UpdateAdPage() {
    const [value, setValue] = useState('create');
    
    
    const navigate = useNavigate();

    useEffect(function() {
        navigate(`${value}`)
    }, [value, navigate])

    return (
        <Container size="sm">
            <Stack>     
                <SegmentedControl
                    value={value}
                    onChange={setValue}
                    data={[
                        {label: "Inserat erstellen", value: "create"},
                        {label: "Inserat bearbeiten oder löschen", value: "verify"},
                    ]}
                />
                <Outlet />
            </Stack>
        
        </Container>
    )
}
