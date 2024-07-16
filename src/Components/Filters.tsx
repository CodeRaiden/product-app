// including the use client for react hooks
'use client'
import {
  ReadonlyURLSearchParams,
  useSearchParams,
  useRouter,
} from 'next/navigation'
import React, { useEffect, useState, ChangeEvent } from 'react'
import Link from 'next/link'

const sortProductsBy = ['Price: Low to High', 'Price: High to Low']

const categories = ['beauty', 'fragrances', 'furniture', 'groceries']

const brands = [
  'Nail Couture',
  'Essence',
  'Chic Cosmetics',
  'Glamour Beauty',
  'Velvet Touch',
  'Calvin Klein',
  'Chanel',
  'Dior',
  'Dolce & Gabbana',
  'Gucci',
  'Annibale Colombo',
  'Furniture Co.',
  'KnollBath Trends',
]

const filterableOptions = [
  {
    id: 'sort',
    title: 'Sort By',
    options: sortProductsBy,
    filterType: 'radio',
  },
  {
    id: 'categories',
    title: 'Product Categories',
    options: categories,
    filterType: 'checkbox',
  },
  {
    id: 'brands',
    title: 'Product Brands',
    options: brands,
    filterType: 'checkbox',
  },
]

// interface for filter children
interface FilterUsingCheckboxAndRadioButtons {
  children: React.ReactNode
}

interface CheckboxAndRadioItems
  extends React.ComponentPropsWithoutRef<'input'> {
  label: string
}

// functions to add children into the filter

// function to add checkboxes and RadioButtons
function CheckboxesAndRadioButtons({
  children,
}: FilterUsingCheckboxAndRadioButtons) {
  return <div className='flex flex-items hover:opacity-75'>{children}</div>
}

// function for checking checkbox and radio items
function CheckboxAndRadioItem({ id, label, ...props }: CheckboxAndRadioItems) {
  return (
    <div className=''>
      <input id={id} className='w-5 h-5 shrink-0 mr-3' />
      <label htmlFor={id} className='text-md'>
        {label}
      </label>
    </div>
  )
}

// function to filter queries by the user
function CheckValidQuery(queries: string[]) {
  // filter the queries to return non empty queries
  return queries.filter((query) => query !== '').length > 0
}

// function to check if a filtered query is valid
function ConvertValidStringQueries(queries: Record<string, string[]>) {
  let query = ''

  for (let [key, value] of Object.entries(queries)) {
    query = query + `${query === '' ? '' : '&'}${key}=${value}`
  }

  return query
}

// creating the saveAllUserOptions to read the search parameter and save all the options(selected by user, available in the search parameter) in a list

export function saveAllUserOptions(searchParams: ReadonlyURLSearchParams) {
  // save options selected by the user in an object(Record) of context string,string[]
  let selectedQueries: Record<string, string[]> = {}
  searchParams.forEach((values, key) => {
    // separate the user selected options with a comma
    const queries = values.split(',')

    // if selecteQueries obj contains a key "key", push "key" all selected parameters into searchParams
    if (selectedQueries[key]) {
      selectedQueries[key].push(...queries)
    } else {
      //else we drop the selected query
      selectedQueries[key] = queries
    }
  })
  return selectedQueries
}

/*************************************************************************************** */

const Filters = async () => {
  // LOGIC

  // to make use of the url route
  const router = useRouter()
  // to grab parameters inside the url
  const searchParams = useSearchParams()
  // to set filter queries
  const [selectedFilterQueries, setSelectedFilterQueries] = useState<
    Record<string, string[]>
  >({})

  useEffect(() => {
    // save all user options in params object
    const paramsObj = saveAllUserOptions(searchParams)
    // update the user variable to the params object
    setSelectedFilterQueries(paramsObj)
  }, [searchParams])

  // function to pass the selected filter options to the filter children div
  function selectedFilterOptions(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name
    const value = event.target.value
    const filterType = event.target.type

    let selectedQueries = selectedFilterQueries
    // if
    if (selectedQueries[name]) {
      // if filtertype is a radio button then the selectedQueries[name] = value
      if (filterType === 'radio') {
        selectedQueries[name] = [value]
      } else if (selectedQueries[name].includes(value)) {
        selectedQueries[name] = selectedQueries[name].filter(
          (query) => query !== value
        )
        if (!CheckValidQuery(selectedQueries[name])) {
          delete selectedFilterQueries[name]
        }
      } else {
        selectedQueries[name].push(value)
      }
    } else if (selectedQueries) {
      selectedQueries[name] = [value]
    }

    // using the router to push query
    router.push(`/?${ConvertValidStringQueries(selectedQueries)}`, {
      scroll: false,
    })
  }

  // function to chck if a option is checked
  function IsOptionChecked(id: string, option: string) {
    return (
      Boolean(selectedFilterQueries[id]) &&
      selectedFilterQueries[id].includes(option.toLowerCase())
    )
  }

  return (
    <div className='col-span-2 space-y6 top-12 h-fit sticky'>
      <div className='py-2 mb-8'>
        <Link href='/'>
          <button className='text-accent cursor-pointer font-semibold'>
            clear all filters
          </button>
        </Link>
      </div>

      {/* map filters */}
      {filterableOptions.map(({ id, title, options, filterType }) => {
        return (
          <div className='border-b pb-4' key={id}>
            <p className='font-medium mb-4 capitalize'>{title}</p>
            <div className='space-y-2'>
              {options.map((value) => {
                return (
                  <CheckboxesAndRadioButtons key={value}>
                    <CheckboxAndRadioItem
                      type={filterType}
                      name={id}
                      label={value}
                      // since everything inside the url is in lowercase then covert the id value to lowercase
                      id={value.toLowerCase().trim()}
                      value={value.toLowerCase().trim()}
                      onChange={selectedFilterOptions}
                      checked={IsOptionChecked(id, value)}
                    />
                  </CheckboxesAndRadioButtons>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Filters
