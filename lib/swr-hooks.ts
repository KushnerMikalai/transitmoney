import useSWR from 'swr'

// function fetcher(url: string) {
//   return window.fetch(url).then((res) => res.json())
// }
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useEntrypoint() {
  const {data, error} = useSWR('/api/entrypoint', fetcher)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useCountries() {
  const {data, error} = useSWR('/api/countries', fetcher)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useCurrencies() {
  const {data, error} = useSWR('/api/currencies', fetcher)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}


// TODO api services
// export function useEntries() {
//   const {data, error} = useSWR(`/api/get-entries`, fetcher)
//
//   return {
//     entries: data,
//     isLoading: !error && !data,
//     isError: error,
//   }
// }
//
// export function useEntry(id: string) {
//   return useSWR(`/api/get-entry?id=${id}`, fetcher)
// }