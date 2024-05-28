import { useState, useEffect } from "react";
import { PinInput, Space, Container, Text, Fieldset, Button, Card } from '@mantine/core';
import { useForm, hasLength } from "@mantine/form";
import ResultAlert from "./ResultAlert";


function CodeVerification( { setAdId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);


    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          code: "",
        },
        validate: {
          code: hasLength({ min: 6, max: 6 }, "Der Code muss 6-Stellig sein")
        },
      });

function getAdID( code ) {

    async function fetchAdByID() {

        try {
          setIsLoading(true);
          setErrorMessage("");
          const res = await fetch(`http://localhost:7777/api/adverts?code=${code}&fields=_id`);
          const data = await res.json();
          // if res.ok false - keine abfrage, try again
          // if data.result = 0 -> kein inserat gefunden, nochmal versuchen
          // maximal anzahl versuche?
          if(!res.ok) throw new Error("Das Inserat konnte nicht gefunden werden. Bitte versuche es noch einmal.");
          if(data.results === 0) throw new Error("Es konnte kein Inserat mit diesem Code gefunden werden.");

          const id = data.data.ads[0]._id;
          setAdId(id);

        } catch (err) {       
            setErrorMessage(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchAdByID();
}
    return (
      <>
      {!isLoading && errorMessage && <ResultAlert icon="error" title="Etwas ist schief gelaufen" message={errorMessage} wasSuccessful={false} />}

      <Card style={{backgroundColor: "transparent"}} withBorder>
          <form onSubmit={form.onSubmit(
              (code) => {
              getAdID(code.code);
              })
          }>
              
              <Fieldset variant="unstyled" disabled={isLoading && true} > 
                <Space h="md"/>
                <Text>Bitte gib hier deinen 6-Stelligen Inserate-Code ein</Text>
                <Space h="lg"/>
                <PinInput
                    label="Code"
                    length={6}
                    type={/^[0-9]*$/}
                    description="Bitte gib hier deinen 6-Stelligen Inserate-Code ein."
                    error="Ungültiger code"
                    key={form.key("code")}
                    {...form.getInputProps("code")}
                />

                <Space h="xl"/>
              
                <Button type="submit">Code überprüfen</Button>

                <Space h="md"/>
            
              </Fieldset>  
          </form>
        </Card>
        </>
    )
}

export default CodeVerification
