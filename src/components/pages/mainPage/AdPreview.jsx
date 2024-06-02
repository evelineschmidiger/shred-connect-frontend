import { Link } from 'react-router-dom';
import { Image, Stack, Badge, Card, Group, Flex, Text, Container, Box, Title, Divider } from '@mantine/core';

import BadgeGroup from '../../reusable/BadgeGroup';


function AdPreview({ ad }) {

    return (
        
        <Card style={{width: "250px", height: "450px"}} padding="xs" radius="sm" withBorder>

           
                    <Flex h="46" mb="4"align="flex-end" justify="start">
                    <Text tt="uppercase" fz=".92rem" fw="600"order={5} >{ad.name}</Text>
                    </Flex>
              
                            
                <Card.Section pb="md">
                        <Link to={`ads/${ad._id}`}>   
                            <Image
                            src={`/${ad.image}.jpg` || "/choice_14.jpg"}
                            height={140}
                            alt="Live Musician"
                            />
                        </Link>
                </Card.Section>
    

             
                <Stack gap="xs" mb="0">
                    <Stack h="70" gap="xs" mt="1">
                    <Divider size="xs" label="Stil" labelPosition="left" />
                        {/* <Title order={6}>Stil</Title> */}
                        <BadgeGroup array={ad.style} color="var(--mantine-color-blue-9)" key={ad.style}/>
                    </Stack>

                    
        
                    <Stack h="70" gap="xs" mt="1">
                    <Divider size="xs" label="Instrument" labelPosition="left" />
                        {/* <Title order={6}>Instrument</Title> */}
                        <BadgeGroup array={ad.instrument} color="var(--mantine-color-blue-9)" key={ad.instrument}/>
                    </Stack>
                    
        
                    <Stack h="60" gap="xs" mt="1" mb="0">
                    <Divider size="xs" label="Kanton" labelPosition="left"/>
                        {/* <Title order={6}>Instrument</Title> */}
                        <Badge fw={600} style={{fontSize: ".6rem"}} variant="gradient" size="sm" radius="xs">{ad.canton.charAt(0).toUpperCase() + ad.canton.slice(1)}</Badge>
                    </Stack>
                </Stack>
       

        </Card>
    
    )
    }

export default AdPreview
