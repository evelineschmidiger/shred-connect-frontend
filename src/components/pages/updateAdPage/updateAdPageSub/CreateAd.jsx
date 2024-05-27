
import { useState } from "react";
import { TextInput, MultiSelect, Loader,Container, Image, Radio, NativeSelect, Fieldset, Button, Group, Textarea, Flex } from '@mantine/core';
import { useForm, hasLength, isNotEmpty } from "@mantine/form";
import {cantons, instrumentsAdCreation as instruments, stylesAdCreation as styles} from "../../../../data/data.js";
import RadioImages from "../helper/RadioImages.jsx";
import ResultAlert from "../../../helper/ResultAlert.jsx";
import AdDetail from "../../adDetailPage/AdDetail";

function CreateAd() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [adId, setAdId] = useState("")
    
    const form = useForm({
      mode: 'uncontrolled',
      initialValues: {
        email: "",
        bandname: "",
        beschreibung: "",
        instrument: [],
        canton: "Aargau",
        style: [],
      },
      validate: {
        email: (value) => (/^\S+@\S+$/.test(value) ? null : "Ungültige E-Mailadresse"),
        bandname: hasLength({ min: 2, max: 25 }, "Der Bandname sollte mindestens 2, maximal 25 Buchstaben haben"),
        beschreibung: isNotEmpty("Bitte füge eine Beschreibung hinzu"),
        instrument: isNotEmpty("Bitte füge ein Instrument hinzu"),
        canton: isNotEmpty("Bitte füge einen Kanton hinzu"),
        style: isNotEmpty("Bitte füge mindestens 1 Style-Tag hinzu")
      },
    });

    const pictureNumbers = Array.from(Array(17), (_, i) => (`0${i+1}`).length === 2 ? `0${i+1}` : `${i+1}`);
    


    function makePostRequest(values) {
      const { email, bandname, beschreibung, style, instrument, canton, image } = values;
      const bodyObject = {
        name: bandname,
        email,
        message: beschreibung,
        instrument,
        canton,
        style,
        image
      }

      async function postAd() {
        try {
          setIsLoading(true);
          setErrorMessage("");
          setAdId("")
          const response = await fetch("http://localhost:7777/api/adverts", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(bodyObject)
            })
            const body = await response.json();
          
          if (!response.ok) {
            
            if(body.status === "fail") {
              console.log(body.message);
            }
            throw new Error("Etwas ist schief gelaufen beim Erstellen des Inserates")
          }      

          setAdId(body.data.ad._id)
          
        } catch (err) {
          setErrorMessage(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      postAd();
    }


    return (
   
      <>
      {isLoading && <Loader></Loader>}
      {!isLoading && errorMessage && <ResultAlert message={errorMessage} wasSuccessful={false} />}
      {!isLoading && adId && <><ResultAlert message="Dein Inserat wurde erstellt" wasSuccessful={true} /><Container><AdDetail id={adId}/></Container></>}
      {!adId && !isLoading && 
        <form onSubmit={form.onSubmit(
            (values) => {
            makePostRequest(values);
            })
           }>
            <Fieldset disabled={isLoading && true} >  
              <TextInput
                  withAsterisk
                  label="E-Mail"
                  description="Deine E-Mail-Adresse"
                  placeholder="musterperson@muster.com"
                  error="Ungültige E-Mail-Adresse"
                  key={form.key("email")}
                  {...form.getInputProps("email")}
              />

              <TextInput
                  withAsterisk
                  label="Bandname"
                  description="Wie heisst ihr?"
                  placeholder="Bandname"
                  key={form.key("bandname")}
                  {...form.getInputProps("bandname")}
              />


              <Textarea
                  label="Inserate-Text"
                  description="Beschreibe wer ihr seid und was ihr sucht"
                  placeholder="Dein Text"
                  withAsterisk
                  key={form.key("beschreibung")}
                  {...form.getInputProps("beschreibung")}
              />
              
              <MultiSelect 
              label="Instrument" 
              description="Wähle mindestens 1 und maximal 4 Instrumente"
              maxValues={4}
              withAsterisk
              searchable
              hidePickedOptions
              data={instruments}
              key={form.key("instrument")}
              {...form.getInputProps("instrument")}
              ></MultiSelect>

              <NativeSelect
              label="Kanton"
              description="Wähle einen oder mehrere Kantone"
              data={cantons}
              withAsterisk
              key={form.key("canton")}
              {...form.getInputProps("canton")}
              />

              <MultiSelect
              label="Stil"
              description="Wähle mindestens 1 und maximal 4 Style-Tags die euren Stil am besten beschreiben aus"
              data={styles}
              maxValues={4}
              searchable
              withAsterisk
              hidePickedOptions
              key={form.key("style")}
              {...form.getInputProps("style")}
              />

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

              <Group justify="flex-start" mt="md">
                  <Button type="submit">Inserat erstellen</Button>
              </Group> 
            </Fieldset>  
        </form>}

      </>
    )
}

export default CreateAd
