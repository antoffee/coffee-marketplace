import { UseFieldConfig } from 'react-final-form';
import { TextFieldProps } from '@mui/material';

type FieldProps<T> = UseFieldConfig<T, T>;

export type CustomInputFieldProps<T extends string | number | unknown[]> = Omit<TextFieldProps, keyof FieldProps<T>> &
    Omit<FieldProps<T>, 'children'> & {
        name: string;
    };
