import { Badge, Group } from '@mantine/core';

export default function BadgeGroup({ array, color }) {
    return (
        <Group mt="md" mb="xs">
            <Group fz="12">{array.map((el, i) => <Badge variant="filled" radius="sm" color={color} key={array[i]}>{el}</Badge>)}</Group>
        </Group>
    )
}

