import { Link } from 'react-router-dom';
import { Image, Stack, Badge, Card, Grid, Flex, Text, Divider } from '@mantine/core';

import BadgeGroup from '../../reusable/BadgeGroup';
//style={{width: "230px", height: "460px"}}

function AdPreview({ ad }) {
    return (
        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card  padding="xs" radius="sm" withBorder>

                <Flex h="46" mb="6"align="center" justify="center">
                    <Text ta="center" fz="1rem" fw="600"order={5} >{ad.name}</Text>
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
                        <BadgeGroup array={ad.style} color="var(--mantine-color-blue-9)" key={ad.style}/>
                    </Stack>

                    <Stack h="70" gap="xs" mt="1">
                        <Divider size="xs" label="Instrument" labelPosition="left" />
                        <BadgeGroup array={ad.instrument} color="var(--mantine-color-blue-9)" key={ad.instrument}/>
                    </Stack>
                        
                    <Stack h="60" gap="xs" mt="1" mb="0">
                        <Divider size="xs" label="Kanton" labelPosition="left"/>
                        <Badge fw={600} fz=".6rem" variant="gradient" size="sm" radius="xs">{ad.canton.charAt(0).toUpperCase() + ad.canton.slice(1)}</Badge>
                    </Stack>

                </Stack>
            </Card>
        </Grid.Col>
    )
 }

export default AdPreview
