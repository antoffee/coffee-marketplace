import { AddressAddDTO } from 'client';

export const getDeliveryAddress = (address: AddressAddDTO) =>
    [
        address?.city,
        address?.street,
        address?.house,
        address?.entrance && `подъезд ${address?.entrance}`,
        address.floor && `${address?.floor} этаж`,
        address.flat,
    ]
        .filter(Boolean)
        .join(',');
