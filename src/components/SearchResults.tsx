import clsx from "clsx";
import { useItems } from "../hooks"
import { Item } from "../types";
import { mapDict } from "../utils";
import Pagination from "./Pagination";

export default function SearchResults({
  ids, className, onChangePage, pageIndex, limit
}: {
  ids: string[], className?: string, pageIndex: number, limit: number
  onChangePage: (index: number) => void
}) {
  const idsToFetch = (
    ids.length > limit ?
    ids.slice(pageIndex * limit, (pageIndex + 1) * limit) :
    ids);
  const { data: items, error } = useItems({ ids: idsToFetch });

  if(error) {
    console.error(error);
    return null;
  }

  if(!items) {
    return <div>Грузим товары...</div>
  }

  if(items.length === 0) {
    return <div>Ничего не найдено</div>
  }

  const canLeft = pageIndex > 0;
  const canRight = idsToFetch.length === limit;

  const uniqueItems: Record<string, Item> = {};
  items.forEach(i => i.id in uniqueItems || (uniqueItems[i.id] = i));
  return (
    <div className="flex flex-col gap-3">
      <Pagination selected={pageIndex} onChange={onChangePage} canLeft={canLeft} canRight={canRight}/>
      <div className='w-full grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-3'>
      {
        Object.values(mapDict(uniqueItems, r => (
          <div key={r.id} className={clsx(
            "",
            className)}>
            <h2 className="text-md md:text-lg font-bold mb-1">{r.product}</h2>
            <div className="grid grid-cols-[auto_1fr] grid-flow-row ml-5">
              {
                r.brand &&
                <div className="grid grid-cols-subgrid col-span-full">
                  <span className="capitalize opacity-75 mr-1">бренд:</span>
                  <span>{r.brand}</span>
                </div>
              }
              <div className="grid grid-cols-subgrid col-span-full">
                <span className="capitalize opacity-75 mr-1">цена:</span>
                <span>{r.price} &#8381;</span>
              </div>
            </div>
          </div>
        )))
      }
      </div>
      <Pagination selected={pageIndex} onChange={onChangePage} canLeft={canLeft} canRight={canRight}/>
    </div>
  )
}