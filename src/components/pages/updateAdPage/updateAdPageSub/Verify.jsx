import { useState, useEffect } from "react";
import { SegmentedControl, Card, Text, Group, Container, Loader, Alert, Title, Stack } from '@mantine/core';
import CodeVerification from "../../../helper/CodeVerification";
import AdDetail from "../../adDetailPage/AdDetail";
import DeleteAd from "./verifySub/DeleteAd";
import UpdateAd from "./verifySub/UpdateAd";



function Verify() {
  const [adId, setAdId] = useState("");
  const [value, setValue] = useState(""); // pending / delete / update - choose activity
  const [isDeleted, setIsDeleted ] = useState(false)
  const [isUpdated, setIsUpdated ] = useState(false);
  
  useEffect(function() {
    setAdId(adId);
  }, [isUpdated, adId, setAdId])


    return (
      
    <>
        {!adId && <CodeVerification setAdId={setAdId}/>}
        {adId && 
          
          <Group justify="center" align="flex-start" grow gap="lg" >
                {/* Trigger re-render of AdDetail when ad is updated: */}
              {!isDeleted && !isUpdated && <AdDetail id={adId}></AdDetail>}
              {!isDeleted && isUpdated && <AdDetail id={adId}></AdDetail>}
              <Stack>
                {!isDeleted && <Stack>
                    <Title order={4}>Was möchtest du mit deinem Inserat machen?</Title>
                    <SegmentedControl
                      value={value}
                      onChange={setValue}
                      data={[
                        { label: 'löschen', value: 'delete' },
                        { label: 'ändern', value: 'update' },
                      ]}
                    />
                </Stack>}
                <Stack>
                {value === "delete" && <DeleteAd id={adId} setIsDeleted={setIsDeleted} />}
                {value === "update" && <UpdateAd id={adId} setIsUpdated={setIsUpdated}/>}
                </Stack>
              </Stack>
          </Group>}


    </>
    )
}


export default Verify
