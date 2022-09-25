import { useState } from 'react'

import Table from '../Table/Table'
import TableFilter from '../Table-filter/Table-filter'
import { ISearchFilter } from '../interfaces'

import './App.scss'

function App() {
  const [searchFilters, setSearchFilters] = useState<ISearchFilter>({});

  const onSearch = (value: ISearchFilter) => {
    setSearchFilters(value);
  }

  return (
    <div className="App">
      <h1 className="table__title">Table of goods:</h1>
      <TableFilter onSearch={onSearch} />
      <Table searchFilters={searchFilters} />
    </div>
  )
}

export default App
