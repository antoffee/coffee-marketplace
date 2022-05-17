import { ShopProductDTO } from 'client';

export type CatalogItemProps = { onClick: () => void; item: ShopProductDTO };
export type CatalogProps = { items: ShopProductDTO[]; onItemClick: (item: ShopProductDTO) => void };
