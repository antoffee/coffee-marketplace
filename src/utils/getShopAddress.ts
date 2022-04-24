export const getShopAddress = ({
    city,
    street,
    house,
    floor,
}: {
    city?: string;
    street?: string;
    house?: string;
    floor?: string;
} = {}) => [city, street, house, floor].filter(Boolean).join(', ');
