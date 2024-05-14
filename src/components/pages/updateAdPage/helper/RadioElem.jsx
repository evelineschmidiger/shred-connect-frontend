import { TextInput, MultiSelect, Flex, Image, Radio } from '@mantine/core';



function RadioElement( {number}) {
    return (
        <Flex>
            <Radio value={`choice_${number}`}/><Image src={`/choice_${number}.jpg`} alt="it's me" radius="sm" gap="xs" size="xl" h={90} w={140}/>
        </Flex>
    )
}

export default RadioElement
