import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ICarsListState } from './types'
import { ICarSpecifications } from 'shared/api/car'
import { fetchCarsList } from './carsListThunk'

const initialState: ICarsListState = {
    cars: [],
    loading: false,
    error: null,
}

export const carsListSlice = createSlice({
    name: 'carsList',
    initialState,
    reducers: {
        clearCars: (state) => {
            state.cars = [];
        },
        updateCar: (state, action: PayloadAction<ICarSpecifications>) => {
            const index = state.cars.findIndex(car => car.id === action.payload.id);
            if (index !== -1) {
                state.cars[index] = action.payload;
            }
        },
        deleteCar: (state, action: PayloadAction<number>) => {
            state.cars = state.cars.filter(car => car.id !== action.payload);
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchCarsList.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCarsList.fulfilled, (state, action) => {
                state.cars = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchCarsList.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? null
            }),
})

export const { clearCars, updateCar, deleteCar } = carsListSlice.actions

export default carsListSlice.reducer
