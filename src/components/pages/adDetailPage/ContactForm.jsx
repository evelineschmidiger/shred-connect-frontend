import { TextInput, Textarea, Fieldset } from '@mantine/core';


function ContactForm() {

    return (
        <Fieldset legend="Kontakt aufnehmen">
            <TextInput
            label="Dein Name"
            description="Input description"
            placeholder="Input placeholder"
            />
            <TextInput
            label="Deine E-Mailadresse"
            description="Input description"
            placeholder="Input placeholder"
            />
            <Textarea
            label="Deine Nachricht"
            description="Input description"
            placeholder="Input placeholder"
            />
  
        </Fieldset>
    )
  }

export default ContactForm
