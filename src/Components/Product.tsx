import React from 'react'

const Product = async () => {
  const res = await fetch('https://dummyjson.com/products')
  return await res.json()
}

export default Product
