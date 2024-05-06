import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { TextInput, Stack, Loader, Textarea, Fieldset, Button, Flex, Card, Container, Group, Title, Divider } from '@mantine/core';
import BadgeGroup from '../components/helper/BadgeGroup';




export default function AdDetailPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [ad, setAd] = useState("");

    const navigate = useNavigate();

    const { id } = useParams();


    useEffect(function() {
      const controller = new AbortController();
      async function fetchAdByID() {
        try {
          setIsLoading(true);
          setErrorMessage("");
          const res = await fetch(`http://localhost:7777/api/adverts/${id}`, {signal: controller.signal});
          if(!res.ok) throw new Error("Etwas ist schiefgelaufen beim Laden der Inserate");
          const data = await res.json();
          if(!data.data.ad) throw new Error("Kein Inserat gefunden")
          setAd(data.data.ad)
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setErrorMessage(err.message);
          }
          
        } finally {
          setIsLoading(false);
        }
      }
      fetchAdByID();
    }, [])
    
    return(
      <Container>
        <Group justify="center" grow gap="lg">
          {isLoading && <Loader />}
          {!isLoading && !errorMessage && <AdDetail ad={ad}/>}
          {errorMessage && <Title order={4}>{errorMessage}</Title>}
          <ContactForm />   
        </Group>

        <Button onClick={() => navigate(-1)}>Zurück</Button>
      </Container>
    ) 
  }

function AdDetail({ ad }) {

  return (
    <Card>
      {ad && <Container>
        <Title order={3}>{ad.name}</Title>
        <p>
        {ad.message}
        </p>
        
        <Divider/>

        <Stack justify='space-between'>
        <Title order={3}>Instrument</Title>
        <BadgeGroup array={ad.instrument} color="blue" />
        </Stack>

        <Divider/>

        <Stack justify='space-between'>
        <Title order={3}>Stil</Title>
        <BadgeGroup array={ad.style} color="blue"/>
        </Stack>

        <Divider/>

        <Stack justify='space-between'>
        <Title order={3}>Erstellt am</Title>
        <p>{ad.createdAt}</p>
        </Stack>
      </Container>
      }
    </Card>
  )
}

function ContactForm() {

  return (
      <Fieldset legend="Kontakt aufnehmen">
          <TextInput
          label="Dein Name"
          description="Input description"
          placeholder="Input placeholder"
          />
          <TextInput
          label="Deine E-Mailadresse"
          description="Input description"
          placeholder="Input placeholder"
          />
          <Textarea
          label="Deine Nachricht"
          description="Input description"
          placeholder="Input placeholder"
          />

      </Fieldset>
  )
}

