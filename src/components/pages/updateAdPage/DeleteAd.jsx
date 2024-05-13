
import { useState, useEffect } from "react";
import { Notification, Container, Loader, Stack, Alert, Title, MultiSelect, NativeSelect, Fieldset, Button, Group, Textarea } from '@mantine/core';
import CodeVerification from "../../helper/CodeVerification";
import AdDetail from "../adDetailPage/AdDetail";

/* first get request to ask for id - then alert - then delete ad with id */

function DeleteAd() {
  const [adId, setAdId] = useState("");
  const [status, setStatus] = useState("code"); // Deletion-Process-Status can either be "code", "confirm", "deleted", "failed"
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // When ad has an ID: setStatus("confirm")
  useEffect(function() {
    if (adId !== "") setStatus("confirm")
}, [adId])

  function deleteAd(id) {

    async function deleteAdByID() {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:7777/api/adverts/${id}`, {
          method: "DELETE",
          headers: {"Content-Type": "application/json"}
          });
        if(!res.ok) throw new Error("Etwas ist schiefgelaufen beim Löschen des Inserates");
        //const data = await res.json();
        console.log(res);
        setStatus("deleted");
        setAdId("");

      } catch (err) {
          setStatus("failed");
          console.log(err);
          setErrorMessage(err.message);
        
      } finally {
        setIsLoading(false);
      }
    }
    deleteAdByID();
  }

    return (
      <>
        {(status === "code") && <CodeVerification setAdId={setAdId} />}
        {(status === "confirm") && <Container fluid>
                <Title order={3}>Hier ist dein Inserat:</Title>
                <AdDetail id={adId}></AdDetail>
                <Button onClick={() => {deleteAd(adId)}}>Jetzt unwiderruflich löschen</Button>
            </Container>}
        {(isLoading) && <Loader />}
        {(status === "deleted") && !isLoading && <Alert variant="outline" color="blue" withCloseButton={false} title="Erledigt">Dein Inserat wurde gelöscht</Alert>}   
        {(status === "failed") && !isLoading && <Alert variant="filled" color="red" withCloseButton={false} title="Oh nein!">{errorMessage}</Alert>}   

      </>
    )
}


export default DeleteAd
