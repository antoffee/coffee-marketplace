import { OrderStatusEnum } from 'client';

export const getStatusColor = (
    status?: OrderStatusEnum,
): 'primary' | 'secondary' | 'default' | 'error' | 'info' | 'success' | 'warning' => {
    switch (status) {
        case OrderStatusEnum.CANCELLED:
            return 'error';
        case OrderStatusEnum.COLLECTING:
            return 'info';
        // case OrderStatusEnum.CREATED:
        //     return 'info';
        case OrderStatusEnum.DELIVERED:
            return 'success';
        case OrderStatusEnum.DELIVERING:
            return 'info';
        case OrderStatusEnum.ERROR:
            return 'error';
        case OrderStatusEnum.FINISHED:
            return 'success';
        case OrderStatusEnum.READY:
            return 'primary';
        default:
            return 'warning';
    }
};
