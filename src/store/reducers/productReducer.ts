import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductListSortByEnum, ProductsService, SortOrderEnum } from 'client';
import { Product } from 'types/product';

type ProductListReqDTO = {
    shopId: number;
    count: number;
    offset: number;
    sortBy?: ProductListSortByEnum;
    order?: SortOrderEnum;
};

// First, create the thunk
export const fetchProductList = createAsyncThunk(
    'products/fetchProductList',
    async ({ shopId, sortBy, count, offset, order }: ProductListReqDTO) => {
        const response = await ProductsService.getListApiProductsListGet(shopId, count, offset, sortBy, order);
        return response;
    },
);

export const fetchProductDetails = createAsyncThunk(
    'products/fetchProductDetails',
    async ({ productId, shopId }: { productId: number; shopId: number }) => {
        const resp = await ProductsService.getByShopApiProductsGet(productId, shopId);
        return resp;
    },
);

interface ProductState {
    productList?: Product[];
    productListLoading?: boolean;

    productDetails: Product;
    productDetailsError?: string;
    productDetailsLoading?: boolean;
}

const initialState = {} as ProductState;

// Then, handle actions in your reducers:
const productSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        resetProductState: () => initialState,
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchProductList.pending, (state) => {
            state.productListLoading = true;
        });
        builder.addCase(fetchProductList.fulfilled, (state, action) => {
            state.productList = action.payload.products;
            state.productListLoading = false;
        });
        builder.addCase(fetchProductList.rejected, (state) => {
            state.productListLoading = false;
            // console.warn(action.error, action.meta);
        });
        builder.addCase(fetchProductDetails.pending, (state) => {
            state.productDetailsLoading = true;
            state.productDetailsError = undefined;
        });
        builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
            state.productDetailsLoading = false;
            state.productDetails = action.payload;
        });
        builder.addCase(fetchProductDetails.rejected, (state) => {
            state.productDetailsLoading = false;
            state.productDetailsError = 'error';
        });
    },
});

export const { resetProductState: logout } = productSlice.actions;
export default productSlice.reducer;
