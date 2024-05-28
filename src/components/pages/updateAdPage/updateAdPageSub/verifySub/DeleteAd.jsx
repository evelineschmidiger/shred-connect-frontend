import { useState } from "react";
import { Button, Stack, Loader, Dialog, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import ResultAlert from "../../../../helper/ResultAlert";


function DeleteAd( { id, setIsDeleted}) {
    const [status, setStatus] = useState("pending");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [opened, { open, close }] = useDisclosure(false);




    function deleteRequest(id) {

        async function deleteAdByID() {
          try {
            setIsLoading(true);
            setErrorMessage("");
            const res = await fetch(`http://localhost:7777/api/adverts/${id}`, {
              method: "DELETE",
              headers: {"Content-Type": "application/json"}
              });

            if(!res.ok) throw new Error("Das Inserat konnte nicht gelöscht werden. Bitte versuche es noch einmal.");
            setStatus("success");
            setIsDeleted(true);
          } catch (err) {
              setStatus("fail");
              setErrorMessage(err.message);
            
          } finally {
            setIsLoading(false);
          }
        }
        deleteAdByID();
      }

    return (
          <Stack>
            {status !== "pending" && !isLoading && <ResultAlert icon={errorMessage ? "error" : "check"} title={errorMessage ? "Etwas ist schief gelaufen" : "Erledigt"} message={(errorMessage) ? errorMessage : "Dein Inserat wurde gelöscht"} wasSuccessful={status === "success"}/>}
            {(status === "pending" || status === "fail") && !isLoading && <Button onClick={open}>Jetzt löschen</Button>}
            <Dialog withBorder color="blue" opened={opened} position={{ bottom: 20, right: 20 }} withCloseButton onClose={close} size="lg" radius="md">
              <Stack>
                <Text>Bist du sicher, dass du dein Inserat löschen möchtest?</Text>
                <Button onClick={() => {close(); deleteRequest(id)}}>Inserat unwiderruflich löschen</Button>
              </Stack>
            </Dialog>

            {isLoading && <Loader/>}
          </Stack>
    )
}

export default DeleteAd
