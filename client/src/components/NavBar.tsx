import React from 'react'
import { Link } from 'react-router-dom'
const NavBar = () => {
  const style = {
    nav: ` bg-gray-100 w-[100%] h-[50px] flex items-center justify-end px-10 gap-4 `,
  }
  return (
    <nav className={style.nav}>
      <Link to="/gallary">Gallary</Link>
      <Link to="/">Upload Image</Link>
    </nav>
  )
}

export default NavBar
