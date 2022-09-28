import { useState, useEffect } from 'react'

import Table from '../Table/Table'
import TableFilter from '../Table-filter/Table-filter'
import Pagination from '../Pagination/Pagination'
import { ISearchFilter, IFlight } from '../interfaces'

import './App.scss'

const App = ({flights}: {flights: IFlight[]}) => {
  const initialFilters = {
    column: 'name',
    clause: 'equal',
    searchValue: ''
  };
  const FLIGHTS_PER_PAGE = 10;
  const [searchFilters, setSearchFilters] = useState<ISearchFilter>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [flightsList, setFlightsList] = useState(flights)

/*   useEffect(() => {
    console.log('render');
  }) */

  const onPageChange = (index: number) => {
    setCurrentPage(index);
  }

  const onSearch = (value: ISearchFilter) => {
    setSearchFilters(value);
  }

  const validatedFlights = (flights: IFlight[]) => {
    const { searchValue, column } = searchFilters;
    
    if (searchValue === '') return flights;
      switch (column) {
        case 'name': return validateStrings(flights);
        case 'quantity': return validateNumbers(flights, 'quantity');
        case 'distance': return validateNumbers(flights, 'distance');
        default: return flights;
      }
  }

  const validateNumbers = (flights: IFlight[], prop: 'quantity' | 'distance') => {
    const { clause, searchValue } = searchFilters;
    const regExp = new RegExp(`${searchValue}`, 'i');

    switch (clause) {
      case 'equal': return flights.filter(flight => flight[prop] === +searchValue!);
      case 'contains': return flights.filter(flight => regExp.test(`${flight[prop]}`));
      case 'less': return flights.filter(flight => flight[prop] < +searchValue!);
      case 'more': return flights.filter(flight => flight[prop] > +searchValue!);
      default: return flights;
    }
  }

  const validateStrings = (flights: IFlight[]) => {
    const { searchValue, clause } = searchFilters;
    const regExp = (clause === 'equal')
      ? new RegExp(`^${searchValue}$`)
      : new RegExp(`${searchValue}`, 'i');

    return flights.filter(flight => regExp.test(flight.name));
  }

  return (
    <div className="App">
      <h1 className="table-title">Доступные рейсы:</h1>
      <TableFilter onSearch={onSearch} initialFilters={initialFilters}/>
      <Table
        searchFilters={searchFilters}
        flightsList={validatedFlights(flightsList)}
        currentPage={currentPage}
        flightsPerPage={FLIGHTS_PER_PAGE}
      />
      <Pagination
        flightsList={validatedFlights(flightsList)}
        onPageChange={onPageChange}
        flightsPerPage={FLIGHTS_PER_PAGE}
      />
    </div>
  )
}

export default App
