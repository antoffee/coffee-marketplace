import { Product } from 'types/product';

export type CatalogItemProps = { onClick: () => void; item: Product };
export type CatalogProps = { items: Product[]; onItemClick: (item: Product) => void };
