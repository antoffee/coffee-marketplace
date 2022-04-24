import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ShopListSortByEnum, ShopRespDTO, ShopService, SortOrderEnum } from 'client';

type ShopListReqDTO = {
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

export const fetchShopDetails = createAsyncThunk('shops/fetchShopDetails', async (id: number) => {
    const resp = await ShopService.getShopApiShopGet(id);
    return resp;
});

interface ShopsState {
    shopList?: ShopRespDTO[];
    shopListLoading?: boolean;

    shopDetailsError?: string;
    shopDetails: ShopRespDTO;
    shopDetailsLoading?: boolean;
}

const initialState = {} as ShopsState;

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
            state.shopList = action.payload.shops;
            state.shopListLoading = false;
        });
        builder.addCase(fetchShopList.rejected, (state) => {
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
    },
});

export const { resetShopsState: logout } = shopsSlice.actions;
export default shopsSlice.reducer;
