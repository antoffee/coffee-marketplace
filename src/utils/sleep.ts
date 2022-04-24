export const sleep = <T>(value: T, ms = 500) =>
    new Promise<T>((resolve) => {
        setTimeout(() => resolve(value), ms);
    });
