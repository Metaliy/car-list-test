import { createSelector } from '@reduxjs/toolkit'

import { ICarsListState } from './types'

const selectBase = createSelector(
    (state: RootState) => state,
    (state) => state.carsList
)

export const selectcarsList = createSelector(
    selectBase,
    (state: ICarsListState) => state.cars
)
export const selectcarsListLoading = createSelector(
    selectBase,
    (state: ICarsListState) => state.loading
)
export const selectcarsListError = createSelector(
    selectBase,
    (state: ICarsListState) => state.error
)