import { useState, useEffect } from 'react';
import { Center,  Loader, Container, Title, Space, Grid } from '@mantine/core';
import AdPreview from './AdPreview';
import AdPagination from './AdPagination';

function AdList( { query, setPaginationQuery, filterQuery, adTotal, setAdTotal }) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [ads, setAds] = useState([]);


    useEffect(function() {
        const controller = new AbortController();
        async function fetchAds() {
            try {
                setIsLoading(true);
                setErrorMessage("");
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/adverts?${query}`, {signal: controller.signal});
                if(!res.ok) throw new Error("Etwas ist schiefgelaufen beim Laden des Inserates");
                const data = await res.json();
                if(!data.data.ads) throw new Error("Keine Inserate gefunden")
                setAds(data.data.ads);
                setAdTotal(data.data.lengthWithoutPaginate);
            } catch (err) {
                if(err.name !== "AbortError") {
                    setErrorMessage("Die Inserate konnten nicht geladen werden");
                }
            } finally {
                setIsLoading(false);
            }
        }
        fetchAds();
        return function() {
            controller.abort();
        }    
    }, [query, setAdTotal])


    return (
      <Container mt="40px" size="lg">
            <Space h="xl"></Space>
            {isLoading && <Loader color="var(--mantine-color-dark-2)" size="130"/>}
            {errorMessage && <Title order={4}>{errorMessage}</Title>}
            {!isLoading && !errorMessage && 
            <Grid
            gutter={{ base: 5, xs: 'sm', sm: 'sm', md: "md", xl: "md" }}
            >
                {ads.map(ad => <AdPreview ad={ad} key={ad._id} />)}
            </Grid>
            }
            <Center mt="90">
                <AdPagination  setPaginationQuery={setPaginationQuery} filterQuery={filterQuery} adTotal={adTotal} />
            </Center>
      </Container>
    )
  }

export default AdList
