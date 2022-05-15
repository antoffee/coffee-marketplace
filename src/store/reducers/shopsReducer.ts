import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductService, ShopListSortByEnum, ShopRespDTO, ShopService, SortOrderEnum } from 'client';
import { Product } from 'types/product';

import { ProductListReqDTO } from './productReducer';

export type ShopListReqDTO = {
    sortBy: ShopListSortByEnum;
    count: number;
    offset: number;
    order: SortOrderEnum;
};

// First, create the thunk
export const fetchShopList = createAsyncThunk(
    'shops/fetchShopList',
    async ({ sortBy, count, offset, order }: ShopListReqDTO) => {
        const response = await ShopService.getListApiShopListGet(sortBy, count, offset, order);
        return response;
    },
);

export const fetchAllShopList = createAsyncThunk(
    'shops/fetchAllShopList',
    async ({ sortBy, offset, order }: ShopListReqDTO) => {
        const response = await ShopService.getListApiShopListGet(sortBy, 100, offset, order);
        return response;
    },
);

export const fetchShopDetails = createAsyncThunk('shops/fetchShopDetails', async (id: number) => {
    const resp = await ShopService.getShopApiShopGet(id);
    return resp;
});

export const fetchShopProducts = createAsyncThunk(
    'shops/fetchShopProducts',
    async ({ shopId, sortBy, count, offset, order }: ProductListReqDTO) => {
        const response = await ProductService.getListApiProductListGet(shopId, sortBy, count, offset, order);
        return response.products;
    },
);

interface ShopsState {
    shopList?: ShopRespDTO[];
    shopListEndReached?: boolean;
    shopListLoading?: boolean;

    shopDetailsError?: string;
    shopDetails: ShopRespDTO;
    shopDetailsLoading?: boolean;

    shopProducts?: Product[];
}

const initialState = {
    shopListEndReached: false,
    shopListLoading: false,
} as ShopsState;

// Then, handle actions in your reducers:
const shopsSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        resetShopsState: () => initialState,
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchShopList.pending, (state) => {
            state.shopListLoading = true;
        });
        builder.addCase(fetchShopList.fulfilled, (state, action) => {
            state.shopList = (state.shopList ?? []).concat(action.payload.shops);
            state.shopListEndReached =
                action.payload.total === state.shopList?.length ?? 0 + action.payload.shops?.length;
            state.shopListLoading = false;
        });
        builder.addCase(fetchShopList.rejected, (state) => {
            state.shopListLoading = false;
            // console.warn(action.error, action.meta);
        });
        builder.addCase(fetchAllShopList.pending, (state) => {
            state.shopListLoading = true;
        });
        builder.addCase(fetchAllShopList.fulfilled, (state, action) => {
            state.shopList = action.payload.shops;
            state.shopListEndReached = true;
            state.shopListLoading = false;
        });
        builder.addCase(fetchAllShopList.rejected, (state) => {
            state.shopListLoading = false;
            // console.warn(action.error, action.meta);
        });
        builder.addCase(fetchShopDetails.pending, (state) => {
            state.shopDetailsLoading = true;
            state.shopDetailsError = undefined;
        });
        builder.addCase(fetchShopDetails.fulfilled, (state, action) => {
            state.shopDetailsLoading = false;
            state.shopDetails = action.payload;
        });
        builder.addCase(fetchShopDetails.rejected, (state) => {
            state.shopDetailsLoading = false;
            state.shopDetailsError = 'error';
        });
        builder.addCase(fetchShopProducts.pending, (state) => {
            state.shopDetailsLoading = true;
        });
        builder.addCase(fetchShopProducts.fulfilled, (state, action) => {
            state.shopDetailsLoading = false;
            state.shopProducts = action.payload;
        });
        builder.addCase(fetchShopProducts.rejected, (state) => {
            state.shopDetailsLoading = true;
            state.shopDetailsError = 'error';
        });
    },
});

export const { resetShopsState } = shopsSlice.actions;
export default shopsSlice.reducer;
