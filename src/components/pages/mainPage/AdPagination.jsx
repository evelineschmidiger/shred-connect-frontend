import { useState, useEffect } from 'react';
import { Pagination } from '@mantine/core';


function AdPagination({ setPaginationQuery, adTotal, filterQuery}) {
    const [activePage, setActivePage] = useState(1);
    const adsPerPage = 10;
    const hasOnlyOnePage = adTotal <= adsPerPage;

    useEffect(() => {
        const query = `limit=${adsPerPage}&page=${activePage}`
        setPaginationQuery(query);
    }, [activePage, setPaginationQuery])

    // Bugfix: when on page 9 and new Filter shows less ads -> skip to page 1
    useEffect(() => {
        setActivePage(1);
    }, [filterQuery])


    return (!hasOnlyOnePage && <Pagination total={Math.ceil(adTotal / adsPerPage)} value={activePage} onChange={setActivePage}/>);
}

export default AdPagination
