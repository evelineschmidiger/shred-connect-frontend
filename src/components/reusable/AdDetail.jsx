import { Stack, Text, Card, Image, Title, Divider } from '@mantine/core';
import BadgeGroup from './BadgeGroup';


function AdDetail({ ad }) {



  const created = ad.createdAt && formatDate(ad.createdAt);
  const updated = ad.lastUpdatedAt && formatDate(ad.lastUpdatedAt);

  function formatDate(date) {
    return new Date(date).toLocaleDateString("ch-DE", {day: "numeric", month: "long", year: "numeric"})
  }

    return (
        <Card>
            <Stack>
              <Title order={3}>{ad.name}</Title>
              <Image
                src={`/${ad.image}.jpg` || "/choice_14.jpg"}
                alt="Live Musician"
              />   
              <Text mt="md" lh="1.8" fz=".9rem">
              {ad.message}
              </Text>
              <Stack>
                <Divider size="xs" label="Instrument" labelPosition="left" />
                <BadgeGroup array={ad.instrument} color="blue" />
              </Stack>

              <Stack>
                <Divider size="xs" label="Kanton" labelPosition="left" />
                <BadgeGroup array={[ad.canton]} color="blue" />
              </Stack>

              <Stack>
                <Divider size="xs" label="Stil" labelPosition="left" />
                <BadgeGroup array={ad.style} color="blue"/>
              </Stack>

              {created && 
              <Stack>
                <Divider size="xs" label="Erstellt am" labelPosition="left" />
                <Text tt="uppercase" fz=".9rem">{created}</Text>
              </Stack>
              }

              {updated && 
              <Stack>
                <Divider size="xs" label="Letztes Update" labelPosition="left" />
                <Text tt="uppercase" fz=".9rem">{updated}</Text>
              </Stack>
              }
            </Stack>
        </Card>
    )
  }

export default AdDetail;



