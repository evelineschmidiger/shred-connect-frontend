import { useState } from 'react'
import { NativeSelect, Button, Pagination, Overlay, BackgroundImage, Image, Badge, AppShell, Flex, Card, Paper, Container, Stack, Group, Title } from '@mantine/core';
import "@mantine/core/styles.css";
import './App.css'


function App() {
  const [filteredInstrument, setFilteredInstrument] = useState("");
  const [ads, setAds] = useState([]);

  function filterAds(filteredInstrument) {
    setFilteredInstrument(filteredInstrument);
    // compare to array with instrument
    if (filteredInstrument === "gitarre") setAds(ad => ad.filter(ad => ad.instrument.includes("guitar")))
    if (filteredInstrument === "bass") setAds(ad => ad.filter(ad => ad.instrument.includes("bass")))
    if (filteredInstrument === "gesang") setAds(ad => ad.filter(ad => ad.instrument.includes("vocals")))
    if (filteredInstrument === "schlagzeug") setAds(ad => ad.filter(ad => ad.instrument.includes("drums")))
  }


  return (
    <>
      <AppShell 
        header={{ height: 130 }}
        navbar={{
          width: 200,
          breakpoint: 'sm',
          padding: "md"
        }}
        aside={{
          width: 250,
          breakpoint: "sm",
        }}
        padding="md"
      >

        <AppShell.Header>

          <Flex justify="space-between" align="center">
            <div className="guitarEmoji">🎸</div>
            <div>
              <Title order={1}>SHRED-CONNECT</Title>
              <p>Gratis Bandinserate schalten um Musiker für deine Ideen zu finden</p>
            </div>
            <div className="guitarEmoji">🎸</div>
          </Flex>

        </AppShell.Header>



        <AppShell.Main>
        <Filterform filteredInstrument={filteredInstrument} setFilteredInstrument={setFilteredInstrument} filterAds={filterAds}/>
        <AdPagination/>
        <Container fluid>
          <Title order={2}>Wir suchen Dich</Title>
          <AdList ads={ads} setAds={setAds} filteredInstrument={filteredInstrument}/>
        </Container>

        </AppShell.Main>


        <AppShell.Navbar p="md" gap="md" style={{gap: "10px"}}>
        
        <div>Inserate ansehen</div>
        <div>Inserat erstellen</div>
        <div>Inserat updaten</div>
        <div>FAQ</div>
        </AppShell.Navbar>




      </AppShell>
    </>
  )
}


function AdList( { ads, setAds, filteredInstrument}) {
  
  const setInitialAds = async function() {
    try {
        const rawResult = await fetch(`http://localhost:7777/api/adverts/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        const result = await rawResult.json();
        setAds(result.data.ads);

        } catch(e) {
            console.error("Error fetching Ads", e);
        }
  }
  // set initial state of adList --- find better solution! what if no results in filtering?
  // TODO: useEffect
  if (ads.length === 0) setInitialAds();



  // Get Ads from Backend
  return (
    <div className="ad-list">
      <Flex
        mih={20}
        gap="xs"
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        {ads.map(ad => <Ad ad={ad} key={ad._id} />)}
      </Flex>
      
    </div>
  )
}

function Filterform( {filteredInstrument, setFilteredInstrument, filterAds} ) {

  return (

    <NativeSelect label="Instrument" description="Wähle ein Instrument" data={['Gitarre', 'Bass', 'Gesang']} />
/*     <div className="filterform-container">
      <form>
      <label htmlFor="instrument">Instrument</label>
      <select name="instrument" id="instrument" value={filteredInstrument} onChange={e => filterAds(e.target.value)}>
        <option value="gitarre">Gitarre</option>
        <option value="bass">Bass</option>
        <option value="gesang">Gesang</option>
        <option value="schlagzeug">Schlagzeug</option>
      </select>
      </form>
    </div> */
  )
}

function Ad({ad, key}) {
  return (
    <Card padding="lg" withBorder>

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
      <Title order={5}>Instrument</Title>
      <Group fz="12">{ad.instrument.map(instrument => <Instrument instrument={instrument} key={instrument}/>)}</Group>
      </Group>

      <Group mt="md" mb="xs">
      <Title order={5}>Genre</Title>
      <Group fz="12">{ad.style.map(stil => <Stil stil={stil} key={stil}/>)}</Group>
      </Group>
    </Card>

  )
}


function Instrument({instrument}) {
  return (
    <Badge color="cyan">{instrument}</Badge>
  )
}


// style-component
function Stil({stil}) {
  return (
    <Badge color="teal">{stil}</Badge>
  )
}



function AdPagination() {
  return <Pagination total={10} />;
}





export default App
