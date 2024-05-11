
import { useState } from "react";
import { TextInput, MultiSelect, NativeSelect, Fieldset, Button, Group, Textarea } from '@mantine/core';
import { useForm, hasLength, isNotEmpty } from "@mantine/form";
import {cantons, instrumentsAdCreation as instruments, styles} from "../../../data/data.js";

function CreateAd() {
    const [isLoading, setIsLoading] = useState(false);
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
          //bandname: hasLength({ min: 2, max: 25 }, "Der Bandname sollte mindestens 2, maximal 25 Buchstaben haben"),
          beschreibung: isNotEmpty("Bitte füge eine Beschreibung hinzu"),
          instrument: isNotEmpty("Bitte füge eine Beschreibung hinzu"),
          canton: isNotEmpty("Bitte füge einen Kanton hinzu"),
          style: isNotEmpty("Bitte füge mindestens 1 Style-Tag hinzu")
        },
      });


    function makePostRequest(values) {
      const { email, bandname, beschreibung, style, instrument, canton } = values;
      const bodyObject = {
        name: bandname,
        email,
        message: beschreibung,
        instrument,
        canton,
        style
      }

      async function postAd() {
        try {
          setIsLoading(true);
          const response = await fetch("http://localhost:7777/api/adverts", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(bodyObject)
            })
          const body = await response.json();
          //console.log(body);

          const errorMessage = (body.message.name === "MongoError") ? "Ein Fehler ist aufgetreten" : body.message.errors.name.message;
          //console.log(body.message.errors.name.message);
          console.log(errorMessage);
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
            (values, event) => {
            makePostRequest(values);
              console.log(
              // event // <- form element submit event
              );
            })
        }>
{/*           Styling: Fieldset displays border ! */}
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

              <Group justify="flex-start" mt="md">
                  <Button type="submit">Submit</Button>
              </Group> 
            </Fieldset>  

        </form>
    )
}

export default CreateAd
