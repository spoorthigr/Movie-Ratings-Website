import React from 'react'
import Logo from '../logo.jpg'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='flex border space-x-8 items-center pl-3 py-4'>
      
      <img className='w-[50px]' src={Logo} alt="" />

      <Link to="/" className='text-blue-500 text-3xl font-bold'>Movies</Link>

      <Link to="/watchlist" className='text-blue-500 text-3xl font-bold'>WatchList</Link>
    </div>
  )
}

export default Navbar
