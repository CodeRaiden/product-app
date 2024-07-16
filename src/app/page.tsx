import ProductsGrid from '@/Components/ProductsGrid'
import Product from '@/Components/Product'
import Hero from '@/Components/Hero'
import Image from 'next/image'
import Filters from '@/Components/Filters'

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <Filters /> */}
      <ProductsGrid content={<Product />} />
    </main>
  )
}
