import { Alert } from '@mantine/core';

function ResultAlert( { message, wasSuccessful } ) {
    return (
        <Alert color={wasSuccessful ? "green" : "red"}>{message}</Alert>
    )
}

export default ResultAlert
