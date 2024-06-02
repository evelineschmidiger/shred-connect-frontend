import { Badge, Group } from '@mantine/core';

export default function BadgeGroup({ array, color }) {
    return (
            <Group gap="5">{array.map((el, i) => <Badge fw={600} fz=".6rem" variant="gradient" size="sm" radius="xs" color={color} key={array[i]}>{el}</Badge>)}</Group>
    )
}

