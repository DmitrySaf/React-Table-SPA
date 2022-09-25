import { useState } from 'react'

import Table from '../Table/Table'
import TableFilter from '../Table-filter/Table-filter'

import './App.scss'

function App() {
  return (
    <div className="App">
      <h1 className="table__title">Table of goods:</h1>
      <TableFilter />
      <Table />
    </div>
  )
}

export default App
