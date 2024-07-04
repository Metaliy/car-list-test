import { Link, useRouteError } from 'react-router-dom'
import SadCat from 'shared/assets/images/sadCat.svg?react'
import { RejectedDataType } from 'shared/types'

import './fallback.scss'

export const Fallback = () => {
  const error = useRouteError()
  const knownError = error as RejectedDataType

  return (
      <div role='alert' className='fallback'>
          <SadCat className='fallback__img' />
          <h1 className='fallback__img'>Что-то пошло не так</h1>
          <span className='fallback__describe'>
              {knownError?.messageError} {knownError?.status}
          </span>
          <Link to='/' className='fallback__link'>
              Go to home page
          </Link>
      </div>
  )
}