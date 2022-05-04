import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    CartProductDTO,
    CartRespDTO,
    CartService,
    OrderListSortByEnum,
    OrderReceiveKindEnum,
    OrderRespDTO,
    OrderService,
    SortOrderEnum,
} from 'client';
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
        const response = await OrderService.getListApiOrderListGet(count, offset, sortBy, order);
        return response;
    },
);

export const fetchOrderDetails = createAsyncThunk('cart/fetchOrderDetails', async (id: number) => {
    const resp = await OrderService.getApiOrderGet(id);
    return resp;
});

export const fetchCartProducts = createAsyncThunk('cart/fetchCartProducts', async () => {
    const resp = await CartService.getApiCartGet();
    return resp;
});

export const fetchChangeQty = createAsyncThunk(
    'cart/fetchChangeQty',
    async ({ item, qty }: { item: Product; qty: number }) => {
        const resp: CartRespDTO = (await CartService.updateApiCartPatch(item.id ?? -1, qty)) as unknown as CartRespDTO;
        return resp;
    },
);

export const fetchCreateOrder = createAsyncThunk(
    'cart/fetchCreateOrder',
    async ({ shopId, receiveKind }: { shopId: number; receiveKind?: OrderReceiveKindEnum }) => {
        const response: { order_id: number } = (await OrderService.placeOrderApiOrderPut(shopId, receiveKind)) as {
            order_id: number;
        };
        return response;
    },
);

interface CartState {
    orderList: OrderRespDTO[];
    orderListLoading?: boolean;
    orderListTotal: number;
    orderListEndReached?: boolean;
    orderDetails?: OrderRespDTO;
    orderDetailsError?: string;
    orderDetailsLoading?: boolean;

    cart?: CartProductDTO[];
    cartLoading?: boolean;
    cartPrice?: number;
    cartError?: string;

    createOrderLoading?: boolean;
    createdOrderId?: number;
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
        builder.addCase(fetchCartProducts.pending, (state) => {
            state.cartLoading = true;
            state.cartError = undefined;
            state.createdOrderId = undefined;
        });
        builder.addCase(fetchCartProducts.fulfilled, (state, action) => {
            state.cartLoading = false;
            state.cart = action.payload.products;
            state.cartPrice = action.payload.total_price;
        });
        builder.addCase(fetchCartProducts.rejected, (state) => {
            state.cartLoading = false;
            state.cartError = 'error';
        });

        builder.addCase(fetchChangeQty.pending, (state) => {
            state.cartLoading = true;
            state.cartError = undefined;
        });
        builder.addCase(fetchChangeQty.fulfilled, (state, action) => {
            state.cartLoading = false;
            state.cart = action.payload.products;
            state.cartPrice = action.payload.total_price;
        });
        builder.addCase(fetchChangeQty.rejected, (state) => {
            state.cartLoading = false;
            state.cartError = 'error';
        });

        builder.addCase(fetchCreateOrder.pending, (state) => {
            state.createOrderLoading = true;
            state.cartError = undefined;
        });
        builder.addCase(fetchCreateOrder.fulfilled, (state, action) => {
            state.createOrderLoading = false;
            state.createdOrderId = action.payload.order_id;
        });
        builder.addCase(fetchCreateOrder.rejected, (state) => {
            state.createOrderLoading = false;
            state.cartError = 'error';
        });
    },
});

export const { resetCartState: logout } = productSlice.actions;
export default productSlice.reducer;
