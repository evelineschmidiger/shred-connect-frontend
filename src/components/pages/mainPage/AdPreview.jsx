import { Link } from 'react-router-dom';
import { Image, Stack, Badge, Card, Group, Title, Divider } from '@mantine/core';

import BadgeGroup from "../../helper/BadgeGroup.jsx";


function AdPreview({ ad }) {
    return (
        
        <Card style={{width: "220px", height: "470px"}} padding="xs" withBorder>
            
                <Card.Section>
                    <Badge color="var(--mantine-color-blue-9)">{ad.canton.charAt(0).toUpperCase() + ad.canton.slice(1)}</Badge>
                        <Link to={`ads/${ad._id}`}>   
                            <Image
                            src={`/${ad.image}.jpg` || "/choice_14.jpg"}
                            height={160}
                            alt="Live Musician"
                            />
                        </Link>
                </Card.Section>
    
                <Group mt="md" mb="xs">
                    <Title order={5} style={{fontSize: "1rem"}}>{ad.name}</Title>
                </Group>

                <Divider size="xs" label="Stil" labelPosition="left" />
                <Stack mt="md" mb="xs">
                    {/* <Title order={6}>Stil</Title> */}
                    <BadgeGroup array={ad.style} color="var(--mantine-color-blue-9)" key={ad.style}/>
                </Stack>

                <Divider size="xs" label="Instrument" labelPosition="left" />
    
                <Stack mt="md" mb="xs">
                    {/* <Title order={6}>Instrument</Title> */}
                    <BadgeGroup array={ad.instrument} color="var(--mantine-color-blue-9)" key={ad.instrument}/>
                </Stack>
        </Card>
    
    )
    }

export default AdPreview
