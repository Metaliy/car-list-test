import Logo from 'shared/assets/images/logo.svg?react'
import './header.scss'

export const Header = () => {

  return (
    <header className='header _container'>
      <Logo className='logo'/>
      <h1 className='title'>Available cars</h1>
    </header>
  )
}