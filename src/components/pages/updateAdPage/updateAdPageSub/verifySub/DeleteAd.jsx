import { useState } from "react";
import { Button, Alert, Text, Container, Loader } from '@mantine/core';
import ResultAlert from "../../helper/ResultAlert";


function DeleteAd( { id }) {
    const [status, setStatus] = useState("pending");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    function deleteRequest(id) {

        async function deleteAdByID() {
          try {
            setIsLoading(true);
            const res = await fetch(`http://localhost:7777/api/adverts/${id}`, {
              method: "DELETE",
              headers: {"Content-Type": "application/json"}
              });
            
            if(!res.ok) throw new Error("Etwas ist schiefgelaufen beim Löschen des Inserates");
            setStatus("success");
    
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
        <div>
            {status === "pending" && isLoading === false && <Button onClick={() => {deleteRequest(id)}}>Jetzt unwiderruflich löschen</Button>}
            {status !== "pending" && <ResultAlert message={(errorMessage) ? errorMessage : "Dein Inserat wurde gelöscht"} wasSuccessful={status === "success"}/>}
        </div>
    )
}

export default DeleteAd
