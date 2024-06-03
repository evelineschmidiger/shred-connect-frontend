import { useState, useEffect } from "react";
import { SegmentedControl, Group, Title, Stack, Container, Card, Radio, Flex } from '@mantine/core';
import AdDetail from "../../../reusable/AdDetail";
import DeleteAd from "./verifySub/DeleteAd";
import UpdateAd from "./verifySub/UpdateAd";
import CodeVerification from "./CodeVerification";
import { useMediaQuery } from "@mantine/hooks";


function Verify() {
  const [adId, setAdId] = useState("");
  const [ad, setAd] = useState("");
  const [value, setValue] = useState(""); // pending / delete / update - choose activity
  const [isDeleted, setIsDeleted ] = useState(false)
  const [isUpdated, setIsUpdated ] = useState(false);
  const isSmall = useMediaQuery(`(max-width: 600px)`);

    return (
    <>
        {!ad && <CodeVerification setAd={setAd} setAdId={setAdId}/>}
        {ad && 
          <Flex direction={isSmall ? "column-reverse" : "row"} justify="center" align="flex-start" grow gap="lg">
              {/* Trigger re-render of AdDetail when ad is updated: */}
              {!isDeleted && !isUpdated && <Container style={isSmall ? {} : {flex: "1 1 0", width: "0"}}><AdDetail ad={ad}></AdDetail></Container>}
              {!isDeleted && isUpdated && <Container p="0" style={isSmall ? {} : {flex: "1 1 0", width: "0"}}><AdDetail ad={ad}></AdDetail></Container>}
             
              <Card bg="var(--mantine-color-dark-7)" style={isSmall ? {} : {flex: "1 1 0", width: "0"}}>
                  {!isDeleted && 
                  <Stack pb="xl">
                        <Radio.Group 
                         size="md"
                          value={value}
                          onChange={setValue}
                          label="Was möchstest du mit deinem Inserat machen?"
                        >
                          <Group pt="lg">
                            <Radio size="md" value="delete" label="löschen" />
                            <Radio size="md" value="update" label="ändern" />
                          </Group>

                        </Radio.Group>
                  </Stack>}
                  
                  <Stack>
                  {value === "delete" && <DeleteAd id={adId} setIsDeleted={setIsDeleted} />}
                  {value === "update" && <UpdateAd id={adId} ad={ad} setAd={setAd} setIsUpdated={setIsUpdated}/>}
                  </Stack>
              </Card>
          </Flex>}
    </>
    )
}


export default Verify
