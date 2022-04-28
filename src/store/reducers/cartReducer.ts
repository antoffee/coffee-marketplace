import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { OrderListSortByEnum, OrderRespDTO, OrdersService, SortOrderEnum } from 'client';
import { Product } from 'types/product';

export type OrderListReqDTO = {
    count: number;
    offset: number;
    sortBy?: OrderListSortByEnum;
    order?: SortOrderEnum;
};

// First, create the thunk
export const fetchOrderList = createAsyncThunk(
    'cart/fetchOrderList',
    async ({ sortBy, count, offset, order }: OrderListReqDTO) => {
        const response = await OrdersService.getListApiOrdersListGet(count, offset, sortBy, order);
        return response;
    },
);

export const fetchOrderDetails = createAsyncThunk('cart/fetchOrderDetails', async (id: number) => {
    const resp = await OrdersService.getApiOrdersGet(id);
    return resp;
});

interface CartState {
    orderList: OrderRespDTO[];
    orderListLoading?: boolean;
    orderListTotal: number;
    orderListEndReached?: boolean;
    orderDetails?: Product;
    orderDetailsError?: string;
    orderDetailsLoading?: boolean;
}

const initialState = {
    orderList: [],
    orderListTotal: 0,
} as CartState;

// Then, handle actions in your reducers:
const productSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        resetCartState: () => initialState,
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchOrderList.pending, (state) => {
            state.orderListLoading = true;
        });
        builder.addCase(fetchOrderList.fulfilled, (state, action) => {
            state.orderList = action.payload.orders;
            state.orderListTotal = action.payload.total;
            state.orderListEndReached = action.payload.orders?.length >= action.payload.total;
            state.orderListLoading = false;
        });
        builder.addCase(fetchOrderList.rejected, (state) => {
            state.orderListLoading = false;
            // console.warn(action.error, action.meta);
        });
        builder.addCase(fetchOrderDetails.pending, (state) => {
            state.orderDetailsLoading = true;
            state.orderDetailsError = undefined;
        });
        builder.addCase(fetchOrderDetails.fulfilled, (state, action) => {
            state.orderDetailsLoading = false;
            state.orderDetails = action.payload;
        });
        builder.addCase(fetchOrderDetails.rejected, (state) => {
            state.orderDetailsLoading = false;
            state.orderDetailsError = 'error';
        });
    },
});

export const { resetCartState: logout } = productSlice.actions;
export default productSlice.reducer;
