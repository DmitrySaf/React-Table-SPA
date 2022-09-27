import { useState } from 'react'

import { IFlight, ISearchFilter } from '../interfaces';

import './Table.scss'

type TableProps = {
  searchFilters: ISearchFilter,
  flightsList: IFlight[],
  currentPage: number
}

const Table = ({searchFilters, flightsList, currentPage}: TableProps) => {
  const [flights, setFlights] = useState<IFlight[]>(flightsList);
  const startIndex = 10 * (currentPage - 1);

  const renderFlights = (flights: IFlight[]) => {
    const { searchValue, column } = searchFilters;

    if (searchValue === '') return createRows(flights);
    switch (column) {
      case 'name': return validateStrings(flights).splice(startIndex, 10);
      case 'quantity': return validateNumbers(flights, 'quantity').splice(startIndex, 10);
      case 'distance': return validateNumbers(flights, 'distance').splice(startIndex, 10);
      default: return createRows(flights);
    }
  }

  const createRows = (flights: IFlight[]) => {
    return flights.map(flight => <Flight key={flight.id} flight={flight}/>).splice(startIndex, 10);
  }

  const validateNumbers = (flights: IFlight[], prop: 'quantity' | 'distance') => {
    const { clause, searchValue } = searchFilters;

    switch (clause) {
      case 'equal': return flights.map(flight => {
        if (flight[prop] === +searchValue!) return <Flight key={flight.id} flight={flight}/>
      });
      case 'contains': return flights.map(flight => {
        if (new RegExp(`${searchValue}`, 'i').test(`${flight[prop]}`)) return <Flight key={flight.id} flight={flight}/>
      });
      case 'less': return flights.map(flight => {
        if (flight[prop] < +searchValue!) return <Flight key={flight.id} flight={flight}/>
      })
      case 'more': return flights.map(flight => {
        if (flight[prop] > +searchValue!) return <Flight key={flight.id} flight={flight}/>
      })
      default: return createRows(flights);
    }
  }

  const validateStrings = (flights: IFlight[]) => {
    const { searchValue, clause } = searchFilters;
    const regExp = (clause === 'equal')
      ? new RegExp(`^${searchValue}$`)
      : new RegExp(`${searchValue}`, 'i');

    return flights.map(flight => {
      if (regExp.test(flight.name)) return <Flight key={flight.id} flight={flight}/>
    })
  }
  
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Дата вылета</th>
          <th>Название города</th>
          <th>Количество мест</th>
          <th>Расстояние (км)</th>
        </tr>
      </thead>
      <tbody>
        {renderFlights(flights)}
      </tbody>
    </table>
  )
}

const Flight = ({flight}: {flight: IFlight}) => {
  const { date, name, quantity, distance } = flight;

  return (
    <tr>
      <td>{date}</td>
      <td>{name}</td>
      <td>{quantity}</td>
      <td>{distance}</td>
    </tr>
  )
}

export default Table;
