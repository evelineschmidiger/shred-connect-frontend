import { useState } from 'react';
import { useParams, useNavigate } from "react-router";
import {  Button, Container, Group } from '@mantine/core';

import ContactForm from './ContactForm';
import AdDetail from './AdDetail';




export default function AdDetailPage() {
  const [ad, setAd] = useState("")

/*     const navigate = useNavigate(); */

    const { id } = useParams();

    return (
        <Container>

          <Group justify="center" align="start" grow gap="lg">
            <AdDetail id={id} setAd={setAd} ad={ad} />
            <ContactForm adCreatedAt={ad.createdAt} adName={ad.name} adId={id}/>
          </Group>

          {/* <Button onClick={() => navigate(-1)}>Zurück</Button> */}
          
        </Container>
    )
  }





