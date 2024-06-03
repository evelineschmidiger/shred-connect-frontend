import { useState } from 'react';
import { Container } from '@mantine/core';

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

    
    return (
        <Container size="lg">
            <FilterForm filterQuery={filterQuery} setFilterQuery={setFilterQuery} adTotal={adTotal} setAdTotal={setAdTotal}/>
            <AdList query={query} filterQuery={filterQuery} setPaginationQuery={setPaginationQuery} adTotal={adTotal} setAdTotal={setAdTotal}/>
        </Container>
    )
}

    

  
