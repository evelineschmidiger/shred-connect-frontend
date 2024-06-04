import { Alert } from '@mantine/core';
import { IconMail, IconNotification, IconExclamationCircle, IconCheckbox } from "@tabler/icons-react";

function ResultAlert( { title, message, wasSuccessful, icon } ) {

    return (
        <Alert 
            title={title} 
            icon={
                icon === "mail" && <IconMail/> ||
                icon === "notification" && <IconNotification/> ||
                icon === "check" && <IconCheckbox/> ||
                icon === "error" && <IconExclamationCircle />
            }
            color={wasSuccessful ? "green" : "red"}
        >
            {message}
        </Alert>
    )
}

export default ResultAlert
