interface IFlight {
  id: number,
  date: string,
  name: string,
  quantity: number,
  distance: number
}

interface ISearchFilter {
  searchValue: string,
  column: string,
  clause: string
}

export type {
  IFlight,
  ISearchFilter
}
