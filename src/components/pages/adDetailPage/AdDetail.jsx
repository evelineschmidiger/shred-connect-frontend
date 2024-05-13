import { useState, useEffect } from 'react';
import { Stack, Loader, Textarea, Fieldset, Button, Flex, Card, Container, Group, Title, Divider } from '@mantine/core';

import BadgeGroup from '../../helper/BadgeGroup';

function AdDetail({ id }) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [ad, setAd] = useState("");

    useEffect(function() {
      const controller = new AbortController();
      async function fetchAdByID() {
        try {
          setIsLoading(true);
          setErrorMessage("");
          const res = await fetch(`http://localhost:7777/api/adverts/${id}`, {signal: controller.signal});
          if(!res.ok) throw new Error("Etwas ist schiefgelaufen beim Laden des Inserats");
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


    /*
    return(
      <Container>
        <Group justify="center" grow gap="lg">
          {isLoading && <Loader />}
          {!isLoading && !errorMessage && <AdContainer ad={ad}/>}
          {errorMessage && <Title order={4}>{errorMessage}</Title>}
          <ContactForm />   
        </Group>


      </Container>
    )  */

    return (
      <Card>
            {isLoading && <Loader />}
            {errorMessage && <Title order={4}>{errorMessage}</Title>}
            {!isLoading && !errorMessage && ad && <AdContainer ad={ad}/>}
      </Card>
    ) 
  }

export default AdDetail;



function AdContainer( { ad } ) {

    return (
        <Container>
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
    )
    
}