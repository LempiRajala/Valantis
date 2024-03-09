export type APIResponse<T> = { result: T };

export type Item = {
  id: string,
  brand: string | null,
  price: number,
  product: string
}

export type FilterParams = {
  brand?: string,
  price?: number,
  product?: string }