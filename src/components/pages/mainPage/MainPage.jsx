import { useState } from 'react';
import { Container } from '@mantine/core';

import FilterForm from './FilterForm.jsx';
import AdList from './AdList.jsx';


export default function MainPage() {
    const [paginationQuery, setPaginationQuery] = useState("");
    const [filterQuery, setFilterQuery] = useState("");
    // if filterQuery is true - add "&" before pagination
    // derive state here and pass down 1 created query as prop to adList

    // Chain querys, ad "&" if necessary
    const query = `${paginationQuery}${filterQuery && "&"}${filterQuery}`
    // console.log("Query:", query);
    
    return (
        <Container size="xl">
            <FilterForm filterQuery={filterQuery} setFilterQuery={setFilterQuery}/>
            <AdList query={query} filterQuery={filterQuery} setPaginationQuery={setPaginationQuery}/>
        </Container>
    )
}

    

  
