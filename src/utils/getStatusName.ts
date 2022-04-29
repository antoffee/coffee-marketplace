import { OrderStatusEnum } from 'client';

export const getStatusName = (status: OrderStatusEnum) => {
    switch (status) {
        case OrderStatusEnum.CANCELLED:
            return 'Отменен';
        case OrderStatusEnum.COLLECTING:
            return 'На комплектации';
        case OrderStatusEnum.CREATED:
            return 'Создан';
        case OrderStatusEnum.DELIVERED:
            return 'Доставлен';
        case OrderStatusEnum.DELIVERING:
            return 'В пути';
        case OrderStatusEnum.ERROR:
            return 'Ошибка';
        case OrderStatusEnum.FINISHED:
            return 'Выполнен';
        case OrderStatusEnum.READY:
            return 'Готов к выдаче';
        default:
            return 'Статус уточняется';
    }
};
