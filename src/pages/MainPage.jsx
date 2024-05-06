import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Center, NativeSelect, Loader, Text, MultiSelect, Fieldset, Button, Pagination, Image, Badge, Flex, Card, Container, Group, Title } from '@mantine/core';

import BadgeGroup from "../components/helper/BadgeGroup.jsx";
import {cantons, instruments, styles} from "../data/data.js";


export default function MainPage() {
    const [paginationQuery, setPaginationQuery] = useState("");
    const [filterQuery, setFilterQuery] = useState("");
    // if filterQuery is true - add "&" before pagination
    // derive state here and pass down 1 created query as prop to adList

    // Chain querys, ad "&" if necessary
    const query = `${paginationQuery}${filterQuery && "&"}${filterQuery}`
    // console.log("Query:", query);


    
    return (
        <Container fluid>
            <Filterform filterQuery={filterQuery} setFilterQuery={setFilterQuery}/>
            <AdList query={query} filterQuery={filterQuery} setPaginationQuery={setPaginationQuery}/>
        </Container> 
    )

}

function Filterform({ setFilterQuery}) {
    const [instrument, setInstrument] = useState("Alle Instrumente");
    const [cantonArray, setCantonArray] = useState([]);
    const [style, setStyle] = useState("Alle Stile");


    // ! empty array is truthy! 
    const instrumentFilterQuery = (instrument === ("Alle Instrumente" || "")) ? "" : `instrument=${instrument}`;
    const cantonFilterQuery = cantonArray.map(canton => `canton=${canton}`).join("&") // Bsp: canton=Aargau&canton=Luzern
    const styleFilterQuery = (style === ("Alle Stile" || "")) ? "" : `style=${style}`;

    // chain Filterform-Queries, Bsp: instrument=Gesang&canton=Aargau&canton=Bern
    const filterFormQuery = `${instrumentFilterQuery}${(cantonFilterQuery && instrumentFilterQuery) && "&"}${cantonFilterQuery}${(styleFilterQuery && cantonFilterQuery || styleFilterQuery && instrumentFilterQuery) && "&"}${styleFilterQuery}`;
    console.log("FilterFormQuery:", filterFormQuery);

    useEffect(function() {
        setFilterQuery(filterFormQuery);
    }, [filterFormQuery, setFilterQuery]) 

 
    return (
        <Fieldset legend="Inserate filtern">
            <NativeSelect 
            label="Instrument" 
            description="Wähle ein Instrument" 
            data={instruments} 
            onChange={(event) => setInstrument(event.currentTarget.value)}
            />

            <MultiSelect
            label="Kanton"
            placeholder="Wähle einen oder mehrere Kantone"
            value={cantonArray}
            data={cantons}
            onChange={setCantonArray}
            searchable
            hidePickedOptions
            clearable
            />

            <NativeSelect
            label="Stil"
            placeholder="Wähle einen Stil"
            value={style}
            data={styles}
            onChange={(event) => setStyle(event.currentTarget.value)}
            />


        </Fieldset>
        
    )
    }
    
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
      <Container style={{paddingTop: "40px"}}>
        <Title order={3}>{adTotal} Inserate</Title>
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
            <AdPagination setPaginationQuery={setPaginationQuery} filterQuery={filterQuery} adTotal={adTotal} />
        </Center>
      </Container>
    )
  }
  
function Ad({ ad }) {
return (
    
    <Card style={{width: "200px"}} padding="lg" withBorder>
        
            <Card.Section>
                <Badge color="var(--mantine-color-blue-9)">{ad.canton.charAt(0).toUpperCase() + ad.canton.slice(1)}</Badge>
                    <Link to={`ads/${ad._id}`}>   
                        <Image
                        src="/ana-grave-gHcWaeldgtQ-unsplash.jpg"
                        height={160}
                        alt="Live Musician"
                        />
                    </Link>
            </Card.Section>

            <Group mt="md" mb="xs">
                <Title order={4}>{ad.name}</Title>
            </Group>
            
            <Group mt="md" mb="xs">
                <Title order={5}>Stil</Title>
                <BadgeGroup array={ad.style} color="var(--mantine-color-blue-9)" key={ad.style}/>
            </Group>

            <Group mt="md" mb="xs">
                <Title order={5}>Instrument</Title>
                <BadgeGroup array={ad.instrument} color="var(--mantine-color-blue-9)" key={ad.instrument}/>
            </Group>
    </Card>
    

)
}
  
function AdPagination({ setPaginationQuery, adTotal, filterQuery}) {
    const [activePage, setActivePage] = useState(1);
    const adsPerPage = 10;

    useEffect(() => {
        const query = `limit=${adsPerPage}&page=${activePage}`
        setPaginationQuery(query);
    }, [activePage, setPaginationQuery])

    // Bugfix: when on page 9 and new Filter shows less ads -> skip to page 1
    useEffect(() => {
        setActivePage(1);
    }, [filterQuery])


    return <Pagination total={Math.ceil(adTotal / adsPerPage)} value={activePage} onChange={setActivePage}/>;
}