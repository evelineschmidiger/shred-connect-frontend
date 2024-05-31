import { Title, Text, Center } from '@mantine/core';




export default function Header() {
    return (
        <> 
                <Center style={{padding: "20px"}}>
                    <Text size="xl" fw={900} variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>Finde Musiker für deine Band</Text>
                </Center>
        </>
    )
}