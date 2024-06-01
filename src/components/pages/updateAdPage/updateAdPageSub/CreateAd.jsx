
import { useState } from "react";
import { TextInput, MultiSelect, Loader, Card, Radio, NativeSelect, Fieldset, Button, Group, Textarea, Flex } from '@mantine/core';
import { useForm, hasLength, isNotEmpty } from "@mantine/form";
import { cantons, instrumentsAdCreation as instruments, stylesAdCreation as styles} from "../../../../data/data.js";
import RadioImages from "./../../../reusable/RadioImages.jsx";
import ResultAlert from "../../../reusable/ResultAlert.jsx";
import AdDetail from "../../../reusable/AdDetail.jsx";

function CreateAd() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [ad, setAd] = useState("");
    const [emailWasSent, setEmailWasSent] = useState(false);

    const pictureNumbers = Array.from(Array(17), (_, i) => (`0${i+1}`).length === 2 ? `0${i+1}` : `${i+1}`);
    
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
        bandname: hasLength({ min: 2, max: 15 }, "Der Bandname sollte mindestens 2, maximal 15 Buchstaben haben"),
        beschreibung: isNotEmpty("Bitte füge eine Beschreibung hinzu"),
        instrument: isNotEmpty("Bitte füge ein Instrument hinzu"),
        canton: isNotEmpty("Bitte füge einen Kanton hinzu"),
        style: isNotEmpty("Bitte füge mindestens 1 Style-Tag hinzu")
      },
    });

  
    function createAd(values) {
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

      async function makePostRequest() {
        try {
          setIsLoading(true);
          setErrorMessage("");
          setAd("")
          const response = await fetch("http://localhost:7777/api/adverts", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(bodyObject)
            })
            const body = await response.json();
            
          
          if (!response.ok) {
            
            throw new Error("Etwas ist schief gelaufen beim Erstellen des Inserates")
          }
          sendCodeEmail(body.data.ad.code, body.data.ad.email)
          setAd(body.data.ad)
          
        } catch (err) {
          console.log(err.message);
          setErrorMessage("Etwas ist schief gelaufen beim Erstellen des Inserates");
        } finally {
          setIsLoading(false);
        }
      }
      makePostRequest();
    }

    function sendCodeEmail(code, email) {

      async function postRequest() {
        try {
          const response = await fetch("http://localhost:7777/api/adverts/sendCode", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              email,
              code
            })
          })
          
          const body = await response.json();
          if (!response.ok) {
            console.log(response);
          //throw new Error("Die Email mit dem Inserate-Code konnte nicht versandt werden")
          }

        setEmailWasSent(true);
        } catch (err) {
          //console.log(err);
        }
      }
      postRequest();
    }

    return (
      <>
      {isLoading && <Loader></Loader>}
      {!isLoading && errorMessage && <ResultAlert icon="error" message={errorMessage} wasSuccessful={false} />}
      {!isLoading && ad && <ResultAlert title={`Dein Inserate-Code: ${ad.code}`} icon="notification" message={`Dein Inserat wurde erstellt. Benutze diesen Inserate-Code zum Ändern oder Löschen des Inserats.`} wasSuccessful={true} />}
      {!isLoading && ad && emailWasSent && <ResultAlert title="Email versendet" icon="mail" message="Eine Email mit deinem Inserate-Code wurde soeben an deine Email-Adresse gesendet" wasSuccessful={true}></ResultAlert>}
      {!isLoading && ad && <Card><AdDetail ad={ad}/></Card>}

      {!ad && !isLoading && 
        <form onSubmit={form.onSubmit(
            (values) => {
            createAd(values);
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
