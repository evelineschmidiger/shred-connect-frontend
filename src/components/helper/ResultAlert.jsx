import { Alert } from '@mantine/core';

function ResultAlert( { title, message, wasSuccessful } ) {
    return (
        <Alert title={title} color={wasSuccessful ? "green" : "red"}>{message}</Alert>
    )
}

export default ResultAlert
