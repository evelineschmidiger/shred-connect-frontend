import { useState } from "react";
import { Button, Stack, Loader, Dialog, Text } from '@mantine/core';
import { useDisclosure} from '@mantine/hooks';



function DeleteAd( { id, setIsDeleted}) {
    const [status, setStatus] = useState("pending");
    const [isLoading, setIsLoading] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);

    function deleteRequest(id) {
      async function deleteAdByID() {
        try {
          setIsLoading(true);
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/adverts/${id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
            });
          if(!res.ok) throw new Error("Das Inserat konnte nicht gelöscht werden. Bitte versuche es noch einmal.");
          setStatus("success");
          setIsDeleted(true);
        } catch (err) {
          setStatus("fail");
          setIsDeleted(false);
          console.log(err.message)
        } finally {
          setIsLoading(false);
        }
      }
      deleteAdByID();
    }

    return (


      
      <Stack align="flex-start">
          {(status === "pending" || status === "fail") && !isLoading && <Button mt="xl" size="md" onClick={open}>Jetzt löschen</Button>}
          <Dialog bg="var(--mantine-color-dark-6)" size="md" withBorder opened={opened} position={{ bottom: 30, right: 30 }} withCloseButton onClose={close} radius="md">
            <Stack>
              <Text fz={{base: ".7rem", sm: ".9rem"}}>Bist du sicher, dass du dein Inserat löschen möchtest?</Text>
              <Button fz={{base: ".6rem", sm: ".9rem"}} onClick={() => {close(); deleteRequest(id)}}>Inserat unwiderruflich löschen</Button>
            </Stack>
          </Dialog>
          {isLoading && <Loader/>}
      </Stack>

  )
}

export default DeleteAd
