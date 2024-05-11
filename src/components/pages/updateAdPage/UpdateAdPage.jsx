import { useState, useEffect } from 'react';
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router";
import { Container, Button, SegmentedControl } from '@mantine/core';


export default function UpdateAdPage() {
    const [value, setValue] = useState('/update/create');
    
    
    const navigate = useNavigate();

    useEffect(function() {
        navigate(`${value}`)
    }, [value, navigate])

    return (
        <Container>
            
            <h3>Was möchtest du machen?</h3>
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
            
        <Button onClick={() => navigate("/")}>Zurück zur Startseite</Button>
        </Container>
    )
}
