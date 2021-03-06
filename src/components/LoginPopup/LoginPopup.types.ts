export type LoginFormValues = {
    email: string;
    password: string;
};

export type LoginFormErrors = Partial<Record<keyof LoginFormValues, string | undefined>>;

export type LoginPopupProps = {
    opened: boolean;
    onSubmit: (values: LoginFormValues) => void;
    onCloseClick: () => void;
};
