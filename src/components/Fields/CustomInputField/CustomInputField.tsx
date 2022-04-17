import React from 'react';
import { Field } from 'react-final-form';
import { TextField } from '@mui/material';

import { CustomInputFieldProps } from './CustomInputField.types';

export const CustomInputField = <T extends string | number | unknown[]>(
    props: CustomInputFieldProps<T>,
): JSX.Element => {
    return (
        <Field<T> {...props}>
            {({ input: { value, onChange, onFocus, onBlur }, meta: { error, touched } }) => (
                <TextField
                    value={value}
                    onInput={onChange}
                    error={!!error && touched}
                    helperText={touched && (error as string)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    {...props}
                />
            )}
        </Field>
    );
};
