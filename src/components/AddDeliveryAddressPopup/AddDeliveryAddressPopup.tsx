import React from 'react';
import { Form } from 'react-final-form';
import { Close } from '@mui/icons-material';
import { Alert, Button, IconButton } from '@mui/material';
import cnBind, { Argument } from 'classnames/bind';
import { useAppSelector } from 'store/hooks';

import { CustomInputField } from 'components/Fields/CustomInputField';
import { disableWindowScroll } from 'utils/disableWindowScroll';

import { AddDeliveryAddressPopupProps, AddDeliveryAddressValues } from './AddDeliveryAddressPopup.types';
import { validateAddDelivery } from './AddDeliveryAddressPopup.utils';

import styles from './AddDeliveryAddressPopup.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const AddDeliveryAddressPopup: React.FC<AddDeliveryAddressPopupProps> = ({ opened, onCloseClick, onSubmit }) => {
    disableWindowScroll(opened);
    const { addDeliveryError } = useAppSelector((state) => state.profile);

    return (
        <div onClick={onCloseClick} className={cx('add-delivery-wrapper', { opened })}>
            <div className={cx('add-delivery')} onClick={(e) => e.stopPropagation()}>
                <IconButton className={cx('close')} onClick={onCloseClick}>
                    <Close />
                </IconButton>
                <Form<AddDeliveryAddressValues>
                    validate={validateAddDelivery}
                    onSubmit={(values, formApi) => {
                        onSubmit(values);
                        formApi?.reset();
                    }}
                >
                    {({ valid, handleSubmit }) => (
                        <form>
                            <CustomInputField label="Город" required name="city" margin="dense" />
                            <CustomInputField required label="Улица" name="street" />
                            <CustomInputField required label="Дом" name="house" />
                            <CustomInputField required label="Подъезд" name="entrance" />
                            <CustomInputField label="Этаж" name="floor" />
                            <CustomInputField label="Квартира" name="flat" />
                            <Button disabled={!valid} variant="contained" onClick={handleSubmit}>
                                Сохранить
                            </Button>
                        </form>
                    )}
                </Form>
                {addDeliveryError && <Alert severity="error">{addDeliveryError}</Alert>}
            </div>
        </div>
    );
};
