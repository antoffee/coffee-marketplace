import { OrderReceiveKindEnum } from 'client';

export const getReceiveName = (receive?: OrderReceiveKindEnum) => {
    switch (receive) {
        case OrderReceiveKindEnum.DELIVERY:
            return 'Доставка по указанному адресу';
        default:
            return 'Самовывоз';
    }
};
