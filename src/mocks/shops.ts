import { ShopRespDTO } from 'client';

export const SHOPS_MOCK: ShopRespDTO[] = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    address: { city: 'Москва', house: '87к6', street: 'Бауманская', id: Math.floor(Math.random() * 100) },
}));
