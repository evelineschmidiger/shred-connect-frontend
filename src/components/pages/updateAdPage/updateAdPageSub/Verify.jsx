import { useState, useEffect } from "react";
import { SegmentedControl, Group, Title, Stack, Container, Card, Radio } from '@mantine/core';
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
              <Card withBorder={false} bg="var(--mantine-color-dark-7)">
              <Stack>
                {!isDeleted && <Stack>
{/*                     <SegmentedControl
                      // orientation="vertical"
                      size="md"
                      value={value}
                      onChange={setValue}
                      data={[
                        { label: 'löschen', value: 'delete' },
                        { label: 'ändern', value: 'update' },
                      ]}
                    /> */}
                        <Radio.Group 
                         size="md"
                          value={value}
                          onChange={setValue}
                          //name="favoriteFramework"
                          label="Was möchstest du mit deinem Inserat machen?"
                          //description="This is anonymous"
                        >
                          <Group >
                          <Radio p="lg" size="md" value="delete" label="löschen" />
                          <Radio size="md" value="update" label="ändern" />
                          </Group>

                        </Radio.Group>
                </Stack>}
                <Stack>
                {value === "delete" && <DeleteAd id={adId} setIsDeleted={setIsDeleted} />}
                {value === "update" && <UpdateAd id={adId} ad={ad} setAd={setAd} setIsUpdated={setIsUpdated}/>}
                </Stack>
              </Stack>
              </Card>
          </Group>}
    </>
    )
}


export default Verify
