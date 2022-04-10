export type RegisterFormValues = {
    email: string;
    password: string;
    passwordRepeat: string;
    confirmationCode?: string;
};

export type RegisterFormErrors = Partial<Record<keyof RegisterFormValues, string | undefined>>;
