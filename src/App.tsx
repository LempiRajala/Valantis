import { useEffect, useState } from 'react';
import './App.css';
import useDebounce, { useFilter, useIds } from './hooks';
import { SWRConfig } from 'swr';
import SearchResults from './components/SearchResults';
import { DEFAULT_LIMIT } from './const';
import Input from './components/Input';

export default function App() {
  const [pageIndex, setPageIndex] = useState(0);
  const [searchField, setSearchField] = useState<string>('product');
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 500);
  useEffect(() => setPageIndex(0), [debouncedSearchValue]);
  useEffect(() => setSearchValue(''), [searchField]);

  const { data: ids, error } = (
    searchField && debouncedSearchValue ?
    useFilter({ [searchField]: searchField === 'price' ? +debouncedSearchValue : debouncedSearchValue }) :
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
          <Input placeholder='Поиск' type={searchField === 'price' ? 'number' : 'text'}
            value={searchValue} onChange={setSearchValue}/>
          <div className='bg-darky grid grid-cols-2 items-baseline justify-center gap-1'>
            <span className='justify-self-end'>Искать по:</span>
            <select className='justify-self-start'
              onChange={e => setSearchField(e.currentTarget.value)} value={searchField}>
              <option value='product'>Названию</option>
              <option value='brand'>Бренду</option>
              <option value='price'>Цене</option>
            </select>
          </div>
        </div>
        <div>
          {
            !!ids ?
            <SearchResults ids={ids} pageIndex={pageIndex} onChangePage={setPageIndex}
              limit={DEFAULT_LIMIT} className='border-gray-600 border-1 px-2 py-1 rounded-sm'/>
            : 'Выполняем поиск...'
          }
        </div>
      </main>
    </SWRConfig>
  )
}