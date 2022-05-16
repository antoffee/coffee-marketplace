import { useEffect, useMemo, useRef } from 'react';
import { debounce } from '@mui/material';
import { ShopListSortByEnum, SortOrderEnum } from 'client';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchShopList } from 'store/reducers/shopsReducer';
import { AppDispatch } from 'store/store';

const MIN_SHOWN_STORES = 2;

export const useInfiniteShopsLoading = (shouldDo?: boolean) => {
    const dispatch = useAppDispatch();
    const { shopList: shownStores, shopListEndReached, shopListLoading } = useAppSelector((state) => state.shops);

    const offsetRef = useRef<number>(0);

    const debouncedLoader = useMemo(
        () =>
            debounce(
                (dispatch: AppDispatch, isVisible: boolean, shopListEndReached: boolean, shopListLoading: boolean) => {
                    if (isVisible && !shopListEndReached && !shopListLoading) {
                        void dispatch(
                            fetchShopList({
                                sortBy: ShopListSortByEnum.ID,
                                offset: offsetRef.current,
                                count: MIN_SHOWN_STORES,
                                order: SortOrderEnum.ASC,
                            }),
                        );
                    }
                },
                100,
            ),
        [],
    );

    useEffect(() => {
        debouncedLoader(dispatch, !!shouldDo, !!shopListEndReached, !!shopListLoading);
    }, [debouncedLoader, dispatch, shouldDo, shopListEndReached, shopListLoading]);

    useEffect(() => {
        offsetRef.current = shownStores?.length ?? 0;
    }, [shownStores?.length]);
};
