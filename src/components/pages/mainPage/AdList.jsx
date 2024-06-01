import { useState, useEffect } from 'react';
import { Center,  Loader, Flex, Container, Title, Space, Paper } from '@mantine/core';
import AdPreview from './AdPreview';
import AdPagination from './AdPagination';

function AdList( { query, setPaginationQuery, filterQuery }) {
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
                const res = await fetch(`http://localhost:7777/api/adverts?${query}`, {signal: controller.signal});
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
        return function() {
            controller.abort();
        }    
    }, [query])


    return (
      <Container style={{paddingTop: "40px"}} size="lg">
        <Paper p="xs" ml="20" mr="20" withBorder={true} style={{background: "var(--mantine-color-dark-6)"}}><Title order={5}>Es wurden {adTotal === 0 ? "keine" : adTotal} Inserate gefunden</Title></Paper>
        <Space h="xl"></Space>

        <Container fluid>
            {isLoading && <Loader />}
            {errorMessage && <Title order={4}>{errorMessage}</Title>}
            {!isLoading && !errorMessage && 
            <Flex
            mih={80}
            gap="xs"
            justify="center"
            align="flex-start"
            direction="row"
            wrap="wrap"
            >
            {ads.map(ad => <AdPreview ad={ad} key={ad._id} />)}
            </Flex>
            }
        </Container>
        
        <Space h="xl"></Space>
        <Center>
            <AdPagination setPaginationQuery={setPaginationQuery} filterQuery={filterQuery} adTotal={adTotal} />
        </Center>
      </Container>
    )
  }

export default AdList
