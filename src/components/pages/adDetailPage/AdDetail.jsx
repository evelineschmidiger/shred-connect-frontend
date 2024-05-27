import { useState, useEffect } from 'react';
import { Stack, Loader, Text, Card, Container, Image, Title, Divider } from '@mantine/core';

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

    }, [id])


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

  const created = ad.createdAt && formatDate(ad.createdAt);
  const updated = ad.lastUpdatedAt && formatDate(ad.lastUpdatedAt);

  function formatDate(date) {
    return new Date(date).toLocaleDateString("ch-DE", {day: "numeric", month: "long", year: "numeric"})
  }

    return (
        <Container>
            <Stack>
              <Title order={3}>{ad.name}</Title>
              <Image
                src={`/${ad.image}.jpg` || "/choice_14.jpg"}
                height={120}
                alt="Live Musician"
              />   
              <Text>
              {ad.message}
              </Text>
              <Stack>
                <Divider size="xs" label="Instrument" labelPosition="left" />
                <BadgeGroup array={ad.instrument} color="blue" />
              </Stack>

              <Stack>
                <Divider size="xs" label="Kanton" labelPosition="left" />
                <BadgeGroup array={[ad.canton]} color="blue" />
              </Stack>

              <Stack>
                <Divider size="xs" label="Stil" labelPosition="left" />
                <BadgeGroup array={ad.style} color="blue"/>
              </Stack>

              {created && 
              <Stack>
                <Divider size="xs" label="Erstellt am" labelPosition="left" />
                <Text>{created}</Text>
              </Stack>
              }

              {updated && 
              <Stack>
                <Divider size="xs" label="Letztes Update" labelPosition="left" />
                <Text>{updated}</Text>
              </Stack>
              }
            </Stack>
            

        </Container>
    )
    
}


