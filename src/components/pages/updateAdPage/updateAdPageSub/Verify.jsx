import { useState, useEffect } from "react";
import { SegmentedControl, Group, Title, Stack } from '@mantine/core';
import AdDetail from "../../../reusable/AdDetail";
import DeleteAd from "./verifySub/DeleteAd";
import UpdateAd from "./verifySub/UpdateAd";
import CodeVerification from "./CodeVerification";


function Verify() {
  const [adId, setAdId] = useState("");
  const [ad, setAd] = useState("");
  const [value, setValue] = useState(""); // pending / delete / update - choose activity
  const [isDeleted, setIsDeleted ] = useState(false)
  const [isUpdated, setIsUpdated ] = useState(false);

    return (
    <>
        {!ad && <CodeVerification setAd={setAd} setAdId={setAdId}/>}
        {ad && 
          
          <Group justify="center" align="flex-start" grow gap="lg" >
                {/* Trigger re-render of AdDetail when ad is updated: */}
              {!isDeleted && !isUpdated && <AdDetail ad={ad}></AdDetail>}
              {!isDeleted && isUpdated && <AdDetail ad={ad}></AdDetail>}
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
                {value === "update" && <UpdateAd id={adId} ad={ad} setAd={setAd} setIsUpdated={setIsUpdated}/>}
                </Stack>
              </Stack>
          </Group>}
    </>
    )
}


export default Verify
