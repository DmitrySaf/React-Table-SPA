import { useState } from 'react'

import { IGood, ISearchFilter } from '../interfaces';

import './Table.scss'

const test = [
  {
    id: 1,
    date: '21.02.2022',
    name: 'John',
    quantity: 123,
    distance: 12
  },
  {
    id: 2,
    date: '20.02.2022',
    name: 'Alex',
    quantity: 1100,
    distance: 10
  },
  {
    id: 3,
    date: '19.02.2022',
    name: 'Croc',
    quantity: 1,
    distance: 14
  }
]

const Table = ({searchFilters}: {searchFilters: ISearchFilter}) => {
  const [goods, setGoods] = useState<IGood[]>(test);

  const createRows = (goods: IGood[]) => {
    const { searchValue, column } = searchFilters;

    if (searchValue === '') return goods.map(good => <Good good={good}/>);
    switch (column) {
      case 'name': return validateNames(goods);
      case 'quantity': return validateQuantities(goods);
      default: return goods.map(good => <Good good={good}/>);
    }
  }

  const validateQuantities = (goods: IGood[]) => {
    const { clause, searchValue } = searchFilters;

    switch (clause) {
      case 'equal': return goods.map(good => {
        if (good.quantity === +searchValue!) return <Good good={good}/>
      });
      default: return goods.map(good => <Good good={good}/>);
    }
  }

  const validateNames = (goods: IGood[]) => {
    const { searchValue, clause } = searchFilters;
    const regExp = (clause === 'equal')
      ? new RegExp(`^${searchValue}$`)
      : new RegExp(`${searchValue}`, 'i');

    return goods.map(good => {
      const name = (good.name === undefined) ? '' : good.name;
      if (regExp.test(name)) return <Good good={{...good, name}}/>
    })
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
        {createRows(goods)}
      </tbody>
    </table>
  )
}

const Good = ({good}: {good: IGood}) => {
  const { id, date, name, quantity, distance } = good;

  return (
    <tr key={id}>
      <td>{date}</td>
      <td>{name}</td>
      <td>{quantity}</td>
      <td>{distance}</td>
    </tr>
  )
}

export default Table;
