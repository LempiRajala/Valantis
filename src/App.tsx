import { useEffect, useState } from 'react';
import './App.css';
import useDebounce, { useFilter, useIds } from './hooks';
import { SWRConfig } from 'swr';
import SearchResults from './components/SearchResults';
import { DEFAULT_LIMIT } from './const';
import Input from './components/Input';
import merge from 'lodash/merge';
import { FilterParams } from './types';

export default function App() {
  const [pageIndex, setPageIndex] = useState(0);
  const [searchByPrice, setSearchByPrice] = useState('');
  const debouncedSearchByPrice = useDebounce(searchByPrice, 500);
  const [searchByBrand, setSearchByBrand] = useState('');
  const debouncedSearchByBrand = useDebounce(searchByBrand, 500);
  const [searchByProduct, setSearchByProduct] = useState('');
  const debouncedSearchByProduct = useDebounce(searchByProduct, 500);
  useEffect(
    () => setPageIndex(0),
    [debouncedSearchByProduct, debouncedSearchByBrand, debouncedSearchByPrice]);

  let filter: FilterParams | null = null;
  if(debouncedSearchByProduct) filter = merge(filter ?? {}, { product: debouncedSearchByProduct });
  if(debouncedSearchByBrand) filter = merge(filter ?? {}, { brand: debouncedSearchByBrand });
  if(debouncedSearchByPrice) filter = merge(filter ?? {}, { price: +debouncedSearchByPrice });

  const { data: ids, error } = (
    filter ?
    useFilter(filter) :
    useIds({
      offset: pageIndex * DEFAULT_LIMIT,
      limit: DEFAULT_LIMIT }));

  if(error) {
    console.error(error);
  }

  return (
    <SWRConfig value={{
      revalidateOnFocus: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
      errorRetryInterval: 1e3,
      shouldRetryOnError: true
    }}>
      <main className="w-full max-w-[1024px] h-full grid grid-rows-[auto-1fr] justify-items-center p-5 gap-5">
        <div className='w-full bg-blacky grid gap-2'>
          <Input placeholder='Поиск по названию' value={searchByProduct} onChange={setSearchByProduct}/>
          <Input placeholder='Поиск по бренду' value={searchByBrand} onChange={setSearchByBrand}/>
          <Input placeholder='Поиск по цене' value={searchByPrice} onChange={setSearchByPrice} type='number'/>
        </div>
        <div>
          {
            !!ids &&
            <SearchResults ids={ids} pageIndex={pageIndex} onChangePage={setPageIndex}
              limit={DEFAULT_LIMIT} className='border-gray-600 border-1 px-2 py-1 rounded-sm'/>
          }
        </div>
      </main>
    </SWRConfig>
  )
}