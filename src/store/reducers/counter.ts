import { CounterActions } from 'store/actions/counter';

export interface ICounterReducer {
    value: number;
}

const initialState: ICounterReducer = {
    value: 0,
};

export const counterReducer = (state = initialState, { type }: CounterActions): ICounterReducer => {
    switch (type) {
        case 'COUNTER/INCREMENT':
            return {
                value: state.value + 1,
            };
        case 'COUNTER/DECREMENT':
            return {
                value: state.value - 1,
            };
        default:
            return state;
    }
};
