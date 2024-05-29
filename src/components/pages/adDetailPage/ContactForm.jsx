import { useState } from 'react';
import { useForm, hasLength, isNotEmpty } from "@mantine/form";
import { TextInput, Stack, Textarea, Fieldset, Button, Group } from '@mantine/core';
import ResultAlert from '../../helper/ResultAlert';


function ContactForm( { adName, adCreatedAt, adId }) {
    const[emailWasSent, setEmailWasSent] = useState(false);
    const[errMessage, setErrMessage] = useState(false);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          name: "",
          email: "",
          message: "",
        },
        validate: {
          name: hasLength({ min: 2, max: 20 }, "Der Name sollte mindestens 2, maximal 20 Buchstaben haben"),
          email: (value) => (/^\S+@\S+$/.test(value) ? null : "Ungültige E-Mailadresse"),
          message: isNotEmpty("Bitte füge eine Nachricht hinzu"),
        },
      });

    function formatDate(date) {
    return new Date(date).toLocaleDateString("ch-DE", {day: "numeric", month: "long", year: "numeric"})
    }

    function sendContactEmail(values) {
        const {name: formName, email: formEmail, message: formMessage} = values;

        setErrMessage("");
        setEmailWasSent(false);

        async function postRequest() {
            try {
            const response = await fetch(`http://localhost:7777/api/adverts/${adId}/contact`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                adName,
                adId,
                createdAt: formatDate(adCreatedAt),
                formName,
                formEmail,
                formMessage
                })
            })
            

            if (!response.ok) {
                console.log(response);
            throw new Error("Deine Nachricht konnte nicht versendet werden")
            }

            setEmailWasSent(true);
            } catch (err) {
            setErrMessage("Deine Nachricht konnte nicht versendet werden")
            }
        }
        postRequest();
    }

    return (
        <>
        <Stack>
        {errMessage && !emailWasSent && <ResultAlert title="Etwas ist schief gelaufen" icon="error" message={`Deine Nachricht an ${adName} konnte nicht gesendet werden. Bitte versuche es noch einmal`} wasSuccessful={false}></ResultAlert>}
        {!errMessage && emailWasSent && <ResultAlert title="Versendet" icon="mail"  message={`Deine Nachricht wurde an ${adName} gesendet.`} wasSuccessful={true} />}
        {!errMessage && !emailWasSent &&
             <form onSubmit={form.onSubmit(
                (values) => {
                sendContactEmail(values);
                })
            }>
                <Fieldset legend="Kontakt aufnehmen">
                    <TextInput
                    withAsterisk
                    label="Name"
                    placeholder="Horst Master-Shredder"
                    description="Dein Name (wird mitgesendet)"
                    key={form.key("name")}
                    {...form.getInputProps("name")}
                    />
                    <TextInput
                    withAsterisk
                    label="Email-Adresse"
                    description={`Die Email-Adresse, mit der ${adName} dich kontaktieren kann (wird mitgesendet)`}
                    placeholder="speed-is-everything@heavy-guitar.com"
                    key={form.key("email")}
                    {...form.getInputProps("email")}
                    />
                    <Textarea
                    withAsterisk
                    label="Nachricht"
                    description={`Deine Nachricht an ${adName}`}
                    placeholder="Ich bin interessiert."
                    key={form.key("message")}
                    {...form.getInputProps("message")}
                    />

                    <Group justify="flex-start" mt="md">
                        <Button type="submit">Nachricht versenden</Button>
                    </Group> 
        
                </Fieldset>
            </form> }
        </Stack>

        </>
    )

  }

export default ContactForm
