import { useState, useEffect } from "react";
import { Button, Fieldset, Stack, Flex, Switch, Group, MultiSelect, NativeSelect, Radio, TextInput, Textarea, Title } from "@mantine/core";
import { useForm, hasLength, isNotEmpty } from "@mantine/form";
import RadioImages from "../../helper/RadioImages.jsx";
import {cantons, instrumentsAdCreation as instruments, stylesAdCreation as styles} from "../../../../../data/data.js";


function UpdateAd( { id }) {
    const [isLoading, setIsLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [ad, setAd] = useState("");
    const pictureNumbers = Array.from(Array(17), (_, i) => (`0${i+1}`).length === 2 ? `0${i+1}` : `${i+1}`);

    console.log(ad)

    // Post-Request on mount to get ad values & place them as default values in form
    useEffect(function() {
      const controller = new AbortController();
      async function fetchAdByID() {
        try {
          setIsLoading(true);
          setErrorMessage("");
          const res = await fetch(`http://localhost:7777/api/adverts/${id}`, {signal: controller.signal});
          if(!res.ok) throw new Error("Etwas ist schiefgelaufen beim Laden des Inserats");
          const data = await res.json();
          if(!data.data.ad) throw new Error("Kein Inserat gefunden")
          setAd(data.data.ad)
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setErrorMessage(err.message);
          } 
        } finally {
          setIsLoading(false);
        }
      }
      fetchAdByID();
      form.setValues({
        bandname: ad.name,
        beschreibung: ad.message,
        instrument: ad.instrument,
        canton: ad.canton,
        style: ad.style,
        image: ad.image
      });
      

    }, [id])
    
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          bandname: "",
          beschreibung: "",
          instrument: [],
          canton: "Aargau",
          style: [],
          image: "choice_05"
        },
        validate: {
          bandname: hasLength({ min: 2, max: 25 }, "Der Bandname sollte mindestens 2, maximal 25 Buchstaben haben"),
          beschreibung: isNotEmpty("Bitte füge eine Beschreibung hinzu"),
          instrument: isNotEmpty("Bitte füge eine Beschreibung hinzu"),
          canton: isNotEmpty("Bitte füge einen Kanton hinzu"),
          style: isNotEmpty("Bitte füge mindestens 1 Style-Tag hinzu")
        },
      });



    function makePatchRequest(values) {
    const { bandname, beschreibung, style, instrument, canton, image } = values;
    const bodyObject = {
        name: bandname,
        message: beschreibung,
        instrument,
        canton,
        style,
        image
    }
    console.log(bodyObject);
    async function postAd() {
        try {
            
        setIsLoading(true);
        const response = await fetch(`http://localhost:7777/api/adverts/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(bodyObject)
            })
        const body = await response.json();
        console.log(body);

        const errorMessage = (body.message.name === "MongoError") ? "Ein Fehler ist aufgetreten" : body.message.errors.name.message;
        //console.log(body.message.errors.name.message);
        console.log(body);
        if (response.ok) console.log("ad successfully created")
        if(body.status === "fail") throw new Error(errorMessage);
        
        } catch (err) {
        //console.log(err);
        } finally {
        setIsLoading(false);
        }
    }
    postAd();
    }


    return (
        <form onSubmit={form.onSubmit(
            (values) => {
            console.log(values);
            makePatchRequest(values);

            })
        }>

            <Fieldset disabled={isLoading && true} >  

            <FormElem title={"Bandname"}>
                    <TextInput
                    placeholder="Bandname"
                    key={form.key("bandname")}
                    {...form.getInputProps("bandname")}
                    />
                </FormElem>
          

                <FormElem title={"Beschreibung"}>
                    <Textarea
               
                    placeholder="Beschreibung"
                    key={form.key("beschreibung")}
                    {...form.getInputProps("beschreibung")}
                    />
                </FormElem>

                <FormElem title={"Instrument"}>
                    <MultiSelect
                
                    placeholder="Wähle mindestens 1 und maximal 4 Instrumente"
                    maxValues={4}
                    searchable
                    hidePickedOptions
                    data={instruments}
                    key={form.key("instrument")}
                    {...form.getInputProps("instrument")}
                    />
                </FormElem>

            
                <FormElem title={"Kanton"}>
                    <NativeSelect
                  
                    description="Wähle einen oder mehrere Kantone"
                    data={cantons}
                    key={form.key("canton")}
                    {...form.getInputProps("canton")}
                    />
                </FormElem>

                <FormElem title={"Stil"}>
                    <MultiSelect
          
                    description="Wähle mindestens 1 und maximal 4 Style-Tags die euren Stil am besten beschreiben aus"
                    data={styles}
                    maxValues={4}
                    searchable
                    hidePickedOptions
                    key={form.key("style")}
                    {...form.getInputProps("style")}
                    />
                </FormElem>

                <FormElem title={"Anzeigebild"}>
                    <Radio.Group
                    justify="flex-start"
                    mt="md"
                    key={form.key("image")}
                    {...form.getInputProps("image")}
                    >
                    <Flex wrap="wrap">
                        {pictureNumbers.map(num => <RadioImages number={num} key={num} />)}
                    </Flex>
                    </Radio.Group> 
                </FormElem> 


                <Group justify="flex-start" mt="md">
                    <Button type="submit">Inserat ändern</Button>
                </Group> 
            </Fieldset>  

        </form>
    )
}

export default UpdateAd

function FormElem({ children, title }) {
    const [checked, setChecked] = useState(false);

    return (
        <Group>
            <Switch checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)}/>
            <Stack>
                <Title order={5}>{title}</Title>
                {checked && children}
            </Stack>
        </Group>
    )
}





