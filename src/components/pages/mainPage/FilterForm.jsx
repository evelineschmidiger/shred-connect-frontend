import { useState, useEffect } from 'react';
import {  NativeSelect, MultiSelect, Fieldset, Container, Title } from '@mantine/core';
import {cantons, instruments, styles} from "../../../data/data.js";

function FilterForm({ setFilterQuery, adTotal }) {
    const [instrument, setInstrument] = useState("Alle Instrumente");
    const [cantonArray, setCantonArray] = useState([]);
    const [stylesArray, setStylesArray] = useState([]);

    const instrumentFilterQuery = (instrument === ("Alle Instrumente" || "")) ? "" : `instrument=${instrument}`;
    const cantonFilterQuery = cantonArray.map(canton => `canton=${canton}`).join("&") // Bsp: canton=Aargau&canton=Luzern
    const styleFilterQuery = stylesArray.map(style => `style=${style}`).join("&")

    // chain Filterform-Queries
    const filterFormQuery = `${instrumentFilterQuery}${(cantonFilterQuery && instrumentFilterQuery) && "&"}${cantonFilterQuery}${(styleFilterQuery && cantonFilterQuery || styleFilterQuery && instrumentFilterQuery) && "&"}${styleFilterQuery}`;

    useEffect(function() {
        setFilterQuery(filterFormQuery);
    }, [filterFormQuery, setFilterQuery]) 

 
    return (
        <Container size="lg">
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

                <MultiSelect
                label="Stil"
                placeholder="Wähle einen oder mehrere Stile"
                value={stylesArray}
                data={styles}
                onChange={setStylesArray}
                searchable
                hidePickedOptions
                clearable
                />
                
                <Title fz="1rem" pt="lg" pb="2" order={6}>Es wurden {adTotal === 0 ? "keine" : adTotal} Inserate gefunden</Title>
            </Fieldset>
        </Container>
    )
}

export default FilterForm;