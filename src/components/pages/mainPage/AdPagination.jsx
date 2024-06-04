import { useState, useEffect } from 'react';
import { Pagination } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';


function AdPagination({ setPaginationQuery, adTotal, filterQuery}) {
    const [activePage, setActivePage] = useState(1);
    const isMobile = useMediaQuery(`(max-width: 425px)`);
    
    const adsPerPage = 24;
    const hasOnlyOnePage = adTotal <= adsPerPage;

    useEffect(() => {
        const query = `limit=${adsPerPage}&page=${activePage}`
        setPaginationQuery(query);
    }, [activePage, setPaginationQuery])

    // When on page 9 and new Filter shows less ads -> skip to page 1
    useEffect(() => {
        setActivePage(1);
    }, [filterQuery])

    return (!hasOnlyOnePage && <Pagination size={isMobile? "xs" : "md"} gap={isMobile? "3": "10"} total={Math.ceil(adTotal / adsPerPage)} value={activePage} onChange={setActivePage}/>);
}

export default AdPagination
