export type AddDeliveryAddressValues = {
    city: string;
    street: string;
    house: string;
    entrance: number;
    floor?: number;
    flat?: string;
};

export type AddDeliveryAddressErrors = Partial<Record<keyof AddDeliveryAddressValues, string | undefined>>;

export type AddDeliveryAddressPopupProps = {
    opened: boolean;
    onSubmit: (values: AddDeliveryAddressValues) => void;
    onCloseClick: () => void;
};
