import { IFlight, ISearchFilter } from '../interfaces';

import './Table.scss'

type TableProps = {
  searchFilters: ISearchFilter,
  flightsList: IFlight[],
  currentPage: number,
  flightsPerPage: number
}

const Table = ({flightsList, currentPage, flightsPerPage}: TableProps) => {
  const createRows = () => {
    const startIndex = flightsPerPage * (currentPage - 1);

    return flightsList
      .map(flight => <Flight key={flight.id} flight={flight}/>)
      .splice(startIndex, flightsPerPage);
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
        {createRows()}
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
