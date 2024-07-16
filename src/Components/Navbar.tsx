import React from 'react'
// imort navbar icon
import { AiOutlineMenu } from 'react-icons/ai'

const Navbar = () => {
  return (
    <div className='container pt-6'>
      <div className='flex justify-between items-center'>
        <img
          src='orange-1618917_1280.png'
          width={'50px'}
          height={'50px'}
          alt='flame'
        />
        <ul className='md:flex hidden gap-8 items-center font-semibold text-[14px]'>
          <li>Home</li>
          <li>About</li>
          <li>Products</li>
          <li>contact</li>

          <button className='bg-accent text-white px-6 py-2 rounded-3xl'>
            SignUp
          </button>
        </ul>

        <AiOutlineMenu className='md:hidden text-accent' size={'30px'} />
      </div>
    </div>
  )
}

export default Navbar
