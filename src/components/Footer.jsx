import { ActionIcon, Group, HoverCard, Paper, Stack, Text } from "@mantine/core"
import { IconBrandGithubFilled } from "@tabler/icons-react";

function Footer() {
    return (
        <>
        <Group pt="xl" pb="xl" justify="space-around">


                <address style={{fontSize: "0.8rem", color: "#828282", fontStyle: "normal"}}>
                    Shred-Connect<br />
                    Elsässerstrasse 38<br />
                    4056 Basel
                </address>




            <p style={{fontSize: "0.96rem", fontStyle: "normal"}}>
                Hast du deinen Inserate-Code vergessen, ein Problem oder eine Frage?
                Wende dich an <a className="emailLink" href= "mailto: info@shred-connect.ch">info@shred-connect.ch</a>
            </p>


            <Group gap="xs">
                <HoverCard width={190}>
                    <HoverCard.Target>
                            <ActionIcon 
                                component="a"
                                size="2.3rem"
                                variant="filled"
                                style={{color: "var(--mantine-color-teal-1)", backgroundColor: "var(--mantine-color-teal-8)", transform: "scaleX(-1)"}}
                                aria-label="Link to Github"
                                target="_blank"
                                href="https://github.com/evelineschmidiger/shred-connect"
                            >
                                <IconBrandGithubFilled stroke={1.5} style={{ width: "2.3rem", height: "2.3rem" }} />
                            </ActionIcon>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <Text size="xs">Shred-Connect Backend</Text>
                    </HoverCard.Dropdown>
                </HoverCard>

                <HoverCard width={190}>
                    <HoverCard.Target>
                        <ActionIcon 
                            component="a"
                            size="2.3rem"
                            variant="filled"
                            style={{color: "var(--mantine-color-blue-1)", backgroundColor: "var(--mantine-color-blue-8)"}}
                            aria-label="Link to Github"
                            target="_blank"
                            href="https://github.com/evelineschmidiger/shred-connect-frontend"
                        >
                            <IconBrandGithubFilled stroke={1.5} style={{ width: "2.3rem", height: "2.3rem" }} />
                        </ActionIcon>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <Text size="xs">Shred-Connect Frontend</Text>
                    </HoverCard.Dropdown>
                </HoverCard>
            </Group>

        </Group>

        </>

    )
}

export default Footer
