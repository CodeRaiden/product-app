import React from 'react'
import Navbar from '@/Components/Navbar'

const Hero = () => {
  return (
    <div className='relative min-h-screen'>
      <img
        className='lg:w-[580px] xl:w-[620px] h-auto absolute right-0 top-0 -z-10'
        src='./shopping-cart-371980_1280.png'
        width={1000}
        height={600}
        alt={'sway'}
      ></img>
      <Navbar />

      <div className='container h-[calc(100vh-120px)] grid items-center'>
        <div className='space-y-4 bg-[#ffffff98] w-fit p-4'>
          <p className='uppercase font-medium'>
            Get Products For The Best Prices
          </p>
          <h2 className='text-4xl sm:text-6xl font-bold'>
            E-commerce <span className='text-accent'>Store</span>
          </h2>
          <p className='text-gray-700 text-[14px] sm:text-[16px]'>
            Best deals money can buy. <br />
            what are you waiting for?
          </p>

          <button className='bg-accent text-white px-6 py-2 rounded-3xl text-[14px] sm:text-[16px]'>
            View More
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero
