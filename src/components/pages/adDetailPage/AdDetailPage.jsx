import { useState } from 'react';
import { useParams, useNavigate } from "react-router";
import {  Button, Container, Group, Card, Title, Loader } from '@mantine/core';

import ContactForm from './ContactForm';
import AdDetail from '../../reusable/AdDetail';
import { useFetchAdById } from '../../../hooks/useFetchAdById';




export default function AdDetailPage() {
  const { id } = useParams();
  const { ad, isLoading, errorMessage} = useFetchAdById(id);

    return (
        <Container>

          <Group justify="center" align="start" grow gap="lg">
            <Card>
              {isLoading && <Loader />}
              {errorMessage && <Title order={4}>{errorMessage}</Title>}
              {!isLoading && !errorMessage && ad && <AdDetail ad={ad}/>}
            </Card>
            <ContactForm adCreatedAt={ad.createdAt} adName={ad.name} adId={ad._id}/>
          </Group>

          {/* <Button onClick={() => navigate(-1)}>Zurück</Button> */}
          
        </Container>
    )
  }





