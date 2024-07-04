import { ICarSpecifications } from "shared/api/car";
import { RejectedDataType } from "shared/types";


export interface ICarsListState {
  cars: ICarSpecifications[],
  readonly loading: boolean
  readonly error: RejectedDataType | null
}