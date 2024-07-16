// 'use client'
import { useSearchParams } from 'next/navigation'
import Product from '@/Components/Product'
import { saveAllUserOptions } from './Filters'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import Dash from '@/Components/Dash'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const Products = async () => {
  // function to fetch external url
  const getProducts = async () => {
    const res = await fetch('https://dummyjson.com/products')
    return res.json()
  }

  // json data from the api response
  const data = await getProducts()

  return (
    <>
      <div className='container pt-40'>
        <h2 className='text-6xl font-bold'>Today's</h2>
        <h2 className='text-6xl font-bold pt-2'>
          Featured <span className='text-accent'>Products</span>
        </h2>

        <p className='max-w-[550px] pt-10 text-gray-700'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
          assumenda? Nulla a ea molestias, ad in est animi natus ut!
        </p>
      </div>
      <Dash />
      {/* items */}
      <ul className='grid md:grid-cols-[1fr,1fr,1fr] gap-16 mt-10'>
        {data.products.map((item: any, index: number) => (
          <li
            className='w-52 mx-4 hover:scale-105 transition-all ease-in-out'
            key={index}
          >
            <div className='relative w-fit mx-auto'>
              <Image
                className='w-[100%] max-w-[400px] sm:max-w-full h-auto shadow-2xl'
                src={item.thumbnail}
                alt={item.title}
                width={300}
                height={600}
              />
              {/* price tag for items */}
              <div className='absolute top-0 left-0 w-full h-full'>
                <p className='absolute text-white text-[12px] font-bold bg-accent p-2'>
                  {item.price}
                </p>
              </div>
              {/* add item to cart button */}
              <div className='pt-3'>
                <a href='' target='_blank'>
                  <button className='mb-5 bg-accent text-white hover:text-white hover:bg-slate-delay-300 font-bold text-1xl px-14 py-2 rounded-full uppercase'>
                    add to
                    <AiOutlineShoppingCart className='w-6 h-6 inline-block ml-2' />
                  </button>
                </a>
              </div>
              <div className='space-y-4'>
                <Dash />
                <h2 className='font-medium text-xl'>{item.title}</h2>
                <p className='text-gray-700 text-[14px] xl:text-[16px]'>
                  {item.description}
                </p>
                <p></p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Products
