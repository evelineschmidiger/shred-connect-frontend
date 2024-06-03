
import { useParams } from "react-router";
import { Container, Card, Title, Loader, Flex } from '@mantine/core';
import ContactForm from './ContactForm';
import AdDetail from '../../reusable/AdDetail';
import { useFetchAdById } from '../../../hooks/useFetchAdById';
import { useMediaQuery } from "@mantine/hooks";


export default function AdDetailPage() {
  const { id } = useParams();
  const { ad, isLoading, errorMessage} = useFetchAdById(id);
  const isSmallTablet = useMediaQuery(`(max-width: 780px)`);

    return (
        <Container size="lg">
          <Flex direction={isSmallTablet ? "column" : "row"} justify="center" align="start" gap="lg">
              <Card style={isSmallTablet ? {} : {flex: "1 1 0", width: "0"}}>
                {isLoading && <Loader color="var(--mantine-color-dark-2)" size="xl"/>}
                {errorMessage && <Title order={4}>{errorMessage}</Title>}
                {!isLoading && !errorMessage && ad && <AdDetail ad={ad}/>}
              </Card >
              <ContactForm isSmallTablet={isSmallTablet} adCreatedAt={ad.createdAt} adName={ad.name} adId={ad._id}/>
          </Flex>
        </Container>
    )
  }





