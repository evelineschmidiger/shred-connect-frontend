import { useState, useEffect } from "react";
import { Button, Fieldset, Checkbox, Stack, Flex, Switch, Group, MultiSelect, NativeSelect, Radio, TextInput, Textarea, Title } from "@mantine/core";
import { useForm, hasLength, isNotEmpty } from "@mantine/form";
import RadioImages from "../../helper/RadioImages.jsx";
import {cantons, instrumentsAdCreation as instruments, stylesAdCreation as styles} from "../../../../../data/data.js";


function UpdateAd( { id }) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [ad, setAd] = useState("");
    const [value, setValue] = useState([]);

    //const valueCopy = [...value]
    //const initialFormValuesObject = valueCopy.reduce((acc, cur) => ({ ...acc, [cur]: (cur === "instrument") || (cur === "style") ? [] : ""}), {})
    const initialFormValues = {
      name: ad.name || "",
      message: ad.message,
      instrument: ad.instrument,
      canton: ad.canton,
      style: ad.style
    }

    const fullFormValidationObject = {
              name: hasLength({ min: 2, max: 25 }, "Der Bandname sollte mindestens 2, maximal 25 Buchstaben haben"),
              message: isNotEmpty("Bitte füge eine Beschreibung hinzu"),
              instrument: isNotEmpty("Bitte füge eine Beschreibung hinzu"),
              canton: isNotEmpty("Bitte füge einen Kanton hinzu"),
              style: isNotEmpty("Bitte füge mindestens 1 Style-Tag hinzu"),
              image: isNotEmpty("Bitte füge mindestens 1 Style-Tag hinzu")
            }


    const form = useForm({
      mode: 'uncontrolled',
      initialValues: initialFormValues,
      validate: fullFormValidationObject,
    });

    const pictureNumbers = Array.from(Array(17), (_, i) => (`0${i+1}`).length === 2 ? `0${i+1}` : `${i+1}`);


    // Post-Request on mount to get ad values 
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
    }, [id])

  // set defaultValues when ad state changes (when it was fetched)
  // Do not add "form" in dependency array!
  
    useEffect(function() {
      form.setValues({
        name: ad.name ? ad.name : "",
        message: ad.message ? ad.message : "",
        instrument: ad.instrument ? ad.instrument : [],
        canton: ad.canton ? ad.canton : "",
        style: ad.style ? ad.style : [],
        image: ad.image ? ad.image : ""
      }); 
    }, [ad])

    // set default Value in field when unchecked -> is not sent, but needs to pass validation anyway
    useEffect(function() {
      const possibleValues = ["name", "message", "instrument", "canton", "style", "image"]
      const valueCopy = [...value]
      const unchecked = possibleValues.filter(elem => !valueCopy.includes(elem))
      console.log(unchecked);
      const valuesObject = unchecked.reduce((acc, value) => {
        if (value === "name") {return {...acc, name: ad.name}}
        if (value === "message") {return {...acc, message: ad.message}}
        if (value === "instrument") {return {...acc, instrument: ad.instrument}}
        if (value === "canton") {return {...acc, canton: ad.canton}}
        if (value === "style") {return {...acc, style: ad.style}}
        if (value === "image") {return {...acc, image: ad.image}}
        else return {...acc}
      }, {})
      form.setValues(valuesObject);  
    }, [value, ad])



    function makePatchRequest(values) {
    const { name, message, style, instrument, canton, image } = values;
    const valueCopy = [...value]
    const bodyObject = valueCopy.reduce((acc, value) => {
      if (value === "name") {return {...acc, name: name}}
      if (value === "message") {return {...acc, message: message}}
      if (value === "instrument") {return {...acc, instrument: instrument}}
      if (value === "canton") {return {...acc, canton: canton}}
      if (value === "style") {return {...acc, style: style}}
      if (value === "image") {return {...acc, image: image}}
      else return {...acc}
    }, {})



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
      <>
      <Checkbox.Group value={value} onChange={setValue}>
        <Checkbox value="name" label="Bandname" />
        <Checkbox value="message" label="Beschreibung" />
        <Checkbox value="instrument" label="Instrument" />
        <Checkbox value="canton" label="Kanton" />
        <Checkbox value="style" label="Stil" />
        <Checkbox value="image" label="Bild" />
      </Checkbox.Group>


        <form onSubmit={form.onSubmit(
            (values) => {
            console.log(values);
            makePatchRequest(values);

            })
        }>
            <Fieldset disabled={isLoading && true} >  

                    {value.includes("name") && <TextInput
                    placeholder="Bandname"
                    key={form.key("name")}
                    {...form.getInputProps("name")}
                    />}

        
                    {value.includes("message") && <Textarea
                    placeholder="Beschreibung"
                    key={form.key("message")}
                    {...form.getInputProps("message")}
                    />}



                    {value.includes("instrument") && <MultiSelect
                    placeholder="Wähle mindestens 1 und maximal 4 Instrumente"
                    maxValues={4}
                    searchable
                    hidePickedOptions
                    data={instruments}
                    key={form.key("instrument")}
                    {...form.getInputProps("instrument")}
                    />}


                    {value.includes("canton") && <NativeSelect
                    description="Wähle einen oder mehrere Kantone"
                    data={cantons}
                    key={form.key("canton")}
                    {...form.getInputProps("canton")}
                    />}



                    {value.includes("style") && <MultiSelect
                    description="Wähle mindestens 1 und maximal 4 Style-Tags die euren Stil am besten beschreiben aus"
                    data={styles}
                    maxValues={4}
                    searchable
                    hidePickedOptions
                    key={form.key("style")}
                    {...form.getInputProps("style")}
                    />}


                    {value.includes("image") && <Radio.Group
                    justify="flex-start"
                    mt="md"
                    key={form.key("image")}
                    {...form.getInputProps("image")}
                    >
                    <Flex wrap="wrap">
                        {pictureNumbers.map(num => <RadioImages number={num} key={num} />)}
                    </Flex>
                    </Radio.Group>}



                  <Group justify="flex-start" mt="md">
                      <Button type="submit">Inserat ändern</Button>
                  </Group> 
            </Fieldset>  

        </form>
      </>
    )
}

export default UpdateAd







