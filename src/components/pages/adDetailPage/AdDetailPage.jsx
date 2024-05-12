import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { TextInput, Stack, Loader, Textarea, Fieldset, Button, Flex, Card, Container, Group, Title, Divider } from '@mantine/core';

import ContactForm from './ContactForm';
import AdDetail from './AdDetail';




export default function AdDetailPage() {

    const navigate = useNavigate();

    const { id } = useParams();

    return (
        <Container>

          <Group justify="center" grow gap="lg">
            <AdDetail id={id} />
            <ContactForm />
          </Group>

          <Button onClick={() => navigate(-1)}>Zurück</Button>
          
        </Container>
    )
  }





