import { ICarSpecifications } from '.'
import { apiInstance } from '../base'

const BASE_URL = 'vehicles'

export const getCarsList = (): Promise<ICarSpecifications[]> => {
    return apiInstance.get(`${BASE_URL}`)
}
