import { useState } from "react";
import { PinInput,  Fieldset, Button, Group } from '@mantine/core';
import { useForm, hasLength } from "@mantine/form";



function CodeVerification( { setAdId }) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
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
          if(!res.ok) throw new Error("Etwas ist schiefgelaufen beim Laden der Inserate");
          const data = await res.json();
          const id = data.data.ads[0]._id;
          setAdId(id);
          // if(!data.data.ad) throw new Error("Kein Inserat gefunden")

        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
          }
          
        } finally {
          setIsLoading(false);
        }
      }
      fetchAdByID();
}
    return (
        <form onSubmit={form.onSubmit(
            (code) => {
            getAdID(code.code);
            })
        }>
            <Fieldset variant="unstyled" disabled={isLoading && true} >  
              <PinInput
                  label="Code"
                  length={6}
                  type={/^[0-9]*$/}
                  description="Bitte gib hier deinen 6-Stelligen Inserate-Code ein"
                //   placeholder="*"
                  error="Ungültiger code"
                  key={form.key("code")}
                  {...form.getInputProps("code")}
              />

              <Group justify="flex-start" mt="md">
                  <Button type="submit">Code überprüfen</Button>
              </Group> 
            </Fieldset>  

        </form>
    )
}

export default CodeVerification
