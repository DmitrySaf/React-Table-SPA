import { useState } from 'react'

import TableFilter from '../Table-filter/Table-filter'

import './Table.scss'

type RowData = {
  date: string,
  name: string,
  quantity: number, 
  distance: number
}

const Table = () => {
  const [rows, setRows] = useState<RowData[]>([
    {
      date: '21.02.2022',
      name: 'John',
      quantity: 123,
      distance: 12
    },
    {
      date: '20.02.2022',
      name: 'Alex',
      quantity: 1100,
      distance: 10
    },
    {
      date: '19.02.2022',
      name: 'Croc',
      quantity: 1,
      distance: 14
    }
  ]);

  const createRows = (rows: RowData[]) => {
    return rows.map((item, i) => (
      <tr key={i}>
        <td>{item.date}</td>
        <td>{item.name}</td>
        <td>{item.quantity}</td>
        <td>{item.distance}</td>
      </tr>
    ))
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Дата</th>
          <th>Название</th>
          <th>Количество</th>
          <th>Расстояние</th>
        </tr>
      </thead>
      <tbody>
        {createRows(rows)}
      </tbody>
    </table>
  )
}

export default Table;
