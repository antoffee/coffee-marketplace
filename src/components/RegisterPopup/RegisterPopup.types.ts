export type RegisterFormValues = {
    email: string;
    password: string;
    passwordRepeat: string;
    code?: string;
};

export type RegisterFormErrors = Partial<Record<keyof RegisterFormValues, string | undefined>>;

export type RegisterPopupProps = {
    opened: boolean;
    onCloseClick: () => void;
};
