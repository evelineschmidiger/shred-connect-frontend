import { useState } from 'react';
import { Container, Text, Center } from '@mantine/core';

import FilterForm from './FilterForm.jsx';
import AdList from './AdList.jsx';


export default function MainPage() {
    const [paginationQuery, setPaginationQuery] = useState("");
    const [filterQuery, setFilterQuery] = useState("");
    const [adTotal, setAdTotal] = useState(0);
    // if filterQuery is true - add "&" before pagination
    // derive state here and pass down 1 created query as prop to adList

    // Chain querys, ad "&" if necessary
    const query = `${paginationQuery}${filterQuery && "&"}${filterQuery}`
    // console.log("Query:", query);
    
    return (
        <Container size="xl">
{/*                 <Center pr="230" pl="230" pt="25" >
                    <Text fz=".9rem" fs="oblique" fw={600} variant="gradient" gradient={{ from: "var(--mantine-color-blue-6)", to: "var(--mantine-color-blue-3)", deg: 90 }}>„Ursprünglich wollte ich die Band „Guns ’n Robots“ nennen. Ich glaube immer noch, dass wir immer noch zusammen wären, wenn wir uns nur „Guns ’n Robots“ genannt hätten.“ - Slash - Quelle: www.delamar.de</Text>
                </Center> */}
            <FilterForm filterQuery={filterQuery} setFilterQuery={setFilterQuery} adTotal={adTotal} setAdTotal={setAdTotal}/>
            <AdList query={query} filterQuery={filterQuery} setPaginationQuery={setPaginationQuery} adTotal={adTotal} setAdTotal={setAdTotal}/>
        </Container>
    )
}

    

  
