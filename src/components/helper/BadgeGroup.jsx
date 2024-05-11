import { Badge, Group } from '@mantine/core';

export default function BadgeGroup({ array, color }) {
    return (
            <Group gap="md">{array.map((el, i) => <Badge style={{fontSize: ".58rem"}} variant="filled" size="md" radius="sm" color={color} key={array[i]}>{el}</Badge>)}</Group>
    )
}

