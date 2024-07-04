import { createAsyncThunk } from '@reduxjs/toolkit'
import { ErrorType, RejectedDataType } from 'shared/types'
import { getCarsList, ICarSpecifications } from 'shared/api/car'

export const fetchCarsList = createAsyncThunk<
    ICarSpecifications[],
    void,
    { rejectValue: RejectedDataType }
>('cars/fetchCarsList', async (_, thunkAPI) => {
    try {
        const response = await getCarsList()
        return response
    } catch (err: unknown) {
        const knownError = err as ErrorType

        return thunkAPI.rejectWithValue({
            messageError: knownError.message,
            status: knownError.response?.status,
        })
    }
})
