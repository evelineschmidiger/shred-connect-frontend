import { Badge, Group } from '@mantine/core';

export default function BadgeGroup({ array, color }) {
    return (
            <Group gap="xs">{array.map((el, i) => <Badge fw={600} style={{fontSize: ".6rem"}} variant="gradient" size="sm" radius="xs" color={color} key={array[i]}>{el}</Badge>)}</Group>
    )
}

