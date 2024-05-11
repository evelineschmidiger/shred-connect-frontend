import { Link } from 'react-router-dom';
import { Image, Badge, Card, Group, Title } from '@mantine/core';

import BadgeGroup from "../../helper/BadgeGroup.jsx";


function AdPreview({ ad }) {
    return (
        
        <Card style={{width: "200px"}} padding="lg" withBorder>
            
                <Card.Section>
                    <Badge color="var(--mantine-color-blue-9)">{ad.canton.charAt(0).toUpperCase() + ad.canton.slice(1)}</Badge>
                        <Link to={`ads/${ad._id}`}>   
                            <Image
                            src="/ana-grave-gHcWaeldgtQ-unsplash.jpg"
                            height={160}
                            alt="Live Musician"
                            />
                        </Link>
                </Card.Section>
    
                <Group mt="md" mb="xs">
                    <Title order={4}>{ad.name}</Title>
                </Group>
                
                <Group mt="md" mb="xs">
                    <Title order={5}>Stil</Title>
                    <BadgeGroup array={ad.style} color="var(--mantine-color-blue-9)" key={ad.style}/>
                </Group>
    
                <Group mt="md" mb="xs">
                    <Title order={5}>Instrument</Title>
                    <BadgeGroup array={ad.instrument} color="var(--mantine-color-blue-9)" key={ad.instrument}/>
                </Group>
        </Card>
    
    )
    }

export default AdPreview
