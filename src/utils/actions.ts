export function createAction<T extends string, P>(type: T, payload: P) {
    return { type, payload };
}

export function createEmptyAction<T extends string>(type: T) {
    return { type };
}
