
import { useParams, useNavigate } from "react-router";
import {  Button, Container, Group } from '@mantine/core';

import ContactForm from './ContactForm';
import AdDetail from './AdDetail';




export default function AdDetailPage() {

/*     const navigate = useNavigate(); */

    const { id } = useParams();

    return (
        <Container>

          <Group justify="center" grow gap="lg">
            <AdDetail id={id} />
            <ContactForm />
          </Group>

          {/* <Button onClick={() => navigate(-1)}>Zurück</Button> */}
          
        </Container>
    )
  }





