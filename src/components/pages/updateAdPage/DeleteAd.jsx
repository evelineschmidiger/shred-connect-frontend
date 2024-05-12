
import { useState } from "react";
import { TextInput, PinInput, MultiSelect, NativeSelect, Fieldset, Button, Group, Textarea } from '@mantine/core';
import { useForm, hasLength, isNotEmpty } from "@mantine/form";
import CodeVerification from "../../helper/CodeVerification";

/* first get request to ask for id - then alert - then delete ad with id */

function DeleteAd() {
  const [adId, setAdId] = useState(null);

    return (
      <>
      {!adId ? <CodeVerification setAdId={setAdId} /> : <div>Inserat gefunden, bist du sicher das du es löschen willst?</div>}
      </>
    )
}


export default DeleteAd
