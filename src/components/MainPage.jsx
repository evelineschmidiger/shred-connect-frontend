import { useState, useEffect } from 'react';
import BadgeGroup from "./BadgeGroup.jsx";
import {cantons, instruments, styles} from "./../data/data.js";
import { Center, Divider, NativeSelect, Loader, Text, Box, MultiSelect, Fieldset, Button, Pagination, Image, Badge, Flex, Card, Container, Group, Title } from '@mantine/core';
//import { useFetch } from "@mantine/hooks";


export default function MainPage() {
    const [query, setQuery] = useState("adverts/");
    //const [queryObj, setQueryObj] = useState({ all: })
    
    return (
        <Container fluid>
            <Filterform/>
            <AdList query={query} setQuery={setQuery}/>
        </Container> 
    )

}

function Filterform() {
    return (
        <Fieldset legend="Inserate filtern">
            <NativeSelect label="Instrument" description="Wähle ein Instrument" data={instruments} />
            <MultiSelect
            label="Kanton"
            placeholder="Wähle einen oder mehrere Kantone"
            data={cantons}
            />
            <MultiSelect
            label="Stil"
            placeholder="Wähle einen oder mehrere Stile"
            data={styles}
            />
        </Fieldset>
        
    )
    }
    
function AdList( {query, setQuery}) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [ads, setAds] = useState([]);
    const [adTotal, setAdTotal] = useState(0);


    
    useEffect(function() {
        const controller = new AbortController();
        async function fetchAds() {
            try {
                setIsLoading(true);
                setErrorMessage("");
                const res = await fetch(`http://localhost:7777/api/`, {signal: controller.signal});
                if(!res.ok) throw new Error("Etwas ist schiefgelaufen beim Laden des Inserates");
                const data = await res.json();
                if(!data.data.ads) throw new Error("Keine Inserate gefunden")
                setAds(data.data.ads);
                setAdTotal(data.data.lengthWithoutPaginate);
            } catch (err) {
                if(err.name !== "AbortError") {
                    console.log(err.message);
                    setErrorMessage(err.message);
                }
            } finally {
                setIsLoading(false);
            }
        }
        fetchAds();
    }, [query])


    return (
      <Container>
        <Title order={4}>{adTotal} Inserate</Title>
        <Divider></Divider>
        <Container>
            {isLoading && <Loader />}
            {errorMessage && <Title order={4}>{errorMessage}</Title>}
            {!isLoading && !errorMessage && 
            <Flex
            mih={20}
            gap="xs"
            justify="center"
            align="flex-start"
            direction="row"
            wrap="wrap"
            >
            {ads.map(ad => <Ad ad={ad} key={ad._id} />)}
            </Flex>
            }
        </Container>
        <Center>
            <AdPagination query={query} setQuery={setQuery} ads={ads} adTotal={adTotal} />
        </Center>
      </Container>
    )
  }
  
function Ad({ ad }) {
return (
    
    <Card style={{width: "200px"}} padding="lg" withBorder>

    <Card.Section>
    <Badge>{ad.canton.charAt(0).toUpperCase() + ad.canton.slice(1)}</Badge>
        <Image
        src="/src/assets/ana-grave-gHcWaeldgtQ-unsplash.jpg"
        height={160}
        alt="Live Musician"
        />
    </Card.Section>

    <Group mt="md" mb="xs">
    <Title order={4}>{ad.name}</Title>
    </Group>
    
    <Group mt="md" mb="xs">
    <Title order={5}>Stil</Title>
    <BadgeGroup array={ad.style} color="blue" key={ad.style}/>
    </Group>

    <Group mt="md" mb="xs">
    <Title order={5}>Instrument</Title>
    <BadgeGroup array={ad.instrument} color="blue" key={ad.instrument}/>
    </Group>
    </Card>

)
}
  
function AdPagination({ setQuery, adTotal}) {
    const [activePage, setPage] = useState(1);
    const adsPerPage = 10;

    useEffect(() => {
        const query = `adverts?limit=${adsPerPage}&page=${activePage}`
        setQuery(query);
    }, [activePage])


    return <Pagination total={Math.ceil(adTotal / adsPerPage)} value={activePage} onChange={setPage}/>;
}