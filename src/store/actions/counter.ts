import { createEmptyAction } from 'utils/actions';

export const increment = () => createEmptyAction('COUNTER/INCREMENT');

export const decrement = () => createEmptyAction('COUNTER/DECREMENT');

export type CounterActions = ReturnType<typeof increment> | ReturnType<typeof decrement>;
