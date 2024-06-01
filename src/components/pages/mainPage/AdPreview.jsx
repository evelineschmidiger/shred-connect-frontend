import { Link } from 'react-router-dom';
import { Image, Stack, Badge, Card, Group, Flex, Container, Box, Title, Divider } from '@mantine/core';

import BadgeGroup from '../../reusable/BadgeGroup';


function AdPreview({ ad }) {

    return (
        
        <Card style={{width: "250px", height: "516px"}} padding="sm" withBorder>

                <Container h="170" m="0" p="0">
                    <Flex align="flex-end">
                    <Title fz="1rem" order={5} >{ad.name}</Title>
                    </Flex>
                </Container>
                            
                <Card.Section pb="md">
                        <Link to={`ads/${ad._id}`}>   
                            <Image
                            src={`/${ad.image}.jpg` || "/choice_14.jpg"}
                            height={160}
                            alt="Live Musician"
                            />
                        </Link>
                </Card.Section>
    


                <Divider size="xs" label="Stil" labelPosition="left" />
                <Stack h="150px" mt="sm" mb="xs">
                    {/* <Title order={6}>Stil</Title> */}
                    <BadgeGroup array={ad.style} color="var(--mantine-color-blue-9)" key={ad.style}/>
                </Stack>

                <Divider size="xs" label="Instrument" labelPosition="left" />
    
                <Stack h="150px" mt="sm" mb="sm">
                    {/* <Title order={6}>Instrument</Title> */}
                    <BadgeGroup array={ad.instrument} color="var(--mantine-color-blue-9)" key={ad.instrument}/>
                </Stack>
                <Divider size="xs" label="Kanton" labelPosition="left" />
    
                <Stack h="150px" mt="sm" mb="xs">
                    {/* <Title order={6}>Instrument</Title> */}
                    <Badge radius="sm" size="sm" variant="gradient">{ad.canton.charAt(0).toUpperCase() + ad.canton.slice(1)}</Badge>
                </Stack>
        </Card>
    
    )
    }

export default AdPreview
