import { useState, useEffect } from "react";
import { Space, SegmentedControl, Card, Text, Group, Container, Loader, Alert, Title, Stack } from '@mantine/core';
import CodeVerification from "../../../helper/CodeVerification";
import AdDetail from "../../adDetailPage/AdDetail";
import DeleteAd from "./verifySub/DeleteAd";
import UpdateAd from "./verifySub/UpdateAd";


/* first get request to ask for id - then alert - then delete ad with id */

function Verify() {
  const [adId, setAdId] = useState("");
  const [value, setValue] = useState("");

    return (
      
    <>
        {!adId && <Card style={{backgroundColor: "transparent"}} withBorder><CodeVerification setAdId={setAdId} /></Card> }
        {adId && 
          
          <Group justify="center" align="flex-start" grow gap="lg" >
              <AdDetail id={adId}></AdDetail>
              <Stack>
                  <Title order={4}>Was möchtest du mit deinem Inserat machen?</Title>
                  <SegmentedControl
                    value={value}
                    onChange={setValue}
                    data={[
                      { label: 'löschen', value: 'delete' },
                      { label: 'ändern', value: 'update' },
                    ]}
                  />
                {value === "delete" && <DeleteAd id={adId} ad={ad} />}
                {value === "update" && <UpdateAd id={adId} />}
              </Stack>
          </Group>}


    </>
    )
}


export default Verify
