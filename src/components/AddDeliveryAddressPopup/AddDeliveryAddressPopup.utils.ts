import { REQUIRED_FIELD_ERROR } from 'shared/constants';

import { AddDeliveryAddressErrors, AddDeliveryAddressValues } from './AddDeliveryAddressPopup.types';

export const validateAddDelivery = (values: AddDeliveryAddressValues): AddDeliveryAddressErrors => ({
    city: values.city ? undefined : REQUIRED_FIELD_ERROR,
    street: values.street ? undefined : REQUIRED_FIELD_ERROR,
    house: values.house ? undefined : REQUIRED_FIELD_ERROR,
    entrance: values.entrance ? undefined : REQUIRED_FIELD_ERROR,
});
