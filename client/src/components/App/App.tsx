import { useState } from 'react'

import Table from '../Table/Table'
import TableFilter from '../Table-filter/Table-filter'
import Pagination from '../Pagination/Pagination'
import { ISearchFilter, IFlight } from '../interfaces'

import './App.scss'

const App = ({flights}: {flights: IFlight[]}) => {
  const initialFilters = {
    searchValue: '',
    column: 'name',
    clause: 'equal'
  }
  const [searchFilters, setSearchFilters] = useState<ISearchFilter>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (index: number) => {
    setCurrentPage(index);
  }

  const onSearch = (value: ISearchFilter) => {
    setSearchFilters(value);
  }

  return (
    <div className="App">
      <h1 className="table__title">Доступные рейсы:</h1>
      <TableFilter onSearch={onSearch} />
      <Table searchFilters={searchFilters} flightsList={flights} currentPage={currentPage} />
      <Pagination flightsList={flights} onPageChange={onPageChange} />
    </div>
  )
}

export default App
