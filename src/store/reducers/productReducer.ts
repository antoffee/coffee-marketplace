import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductListSortByEnum, ProductService, ShopProductDTO, SortOrderEnum } from 'client';

export type ProductListReqDTO = {
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
        const response = await ProductService.getListApiProductListGet(shopId, sortBy, count, offset, order);
        return { products: response.products, shopId, total: response.total };
    },
);


export const fetchProductDetails = createAsyncThunk(
    'products/fetchProductDetails',
    async ({ productId, shopId }: { productId: number; shopId: number }) => {
        const resp = await ProductService.getApiProductGet(productId, shopId);
        return resp;
    },
);

interface ProductState {
    productList: { shopId: number; products: ShopProductDTO[] }[];
    productListLoading?: boolean;
    currentProductListOffset: number;
    productsListEndReached?: boolean;
    productDetails?: ShopProductDTO;
    productDetailsError?: string;
    productDetailsLoading?: boolean;
}

const initialState = {
    productList: [],
    currentProductListOffset: 0,
} as ProductState;

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
            let productList = state.productList;
            const index = productList.findIndex((item) => item.shopId === action.payload.shopId);
            if (index >= 0) {
                productList[index] = action.payload;
            } else {
                productList = productList.concat(action.payload);
            }
            state.productList = productList;
            state.currentProductListOffset = productList.length;
            state.productsListEndReached = productList.length >= action.payload.total;
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

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
