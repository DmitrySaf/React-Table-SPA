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

    if (searchValue === '') return goods.map(good => <Good key={good.id} good={good}/>);
    switch (column) {
      case 'name': return validateStrings(goods);
      case 'quantity': return validateNumbers(goods, 'quantity');
      case 'distance': return validateNumbers(goods, 'distance');
      default: return goods.map(good => <Good key={good.id} good={good}/>);
    }
  }

  const validateNumbers = (goods: IGood[], prop: 'quantity' | 'distance') => {
    const { clause, searchValue } = searchFilters;

    switch (clause) {
      case 'equal': return goods.map(good => {
        if (good[prop] === +searchValue!) return <Good key={good.id} good={good}/>
      });
      case 'contains': return goods.map(good => {
        if (new RegExp(`${searchValue}`, 'i').test(`${good[prop]}`)) return <Good key={good.id} good={good}/>
      });
      case 'less': return goods.map(good => {
        if (good[prop] < +searchValue!) return <Good key={good.id} good={good}/>
      })
      case 'more': return goods.map(good => {
        if (good[prop] > +searchValue!) return <Good key={good.id} good={good}/>
      })
      default: return goods.map(good => <Good key={good.id} good={good}/>);
    }
  }

  const validateStrings = (goods: IGood[]) => {
    const { searchValue, clause } = searchFilters;
    const regExp = (clause === 'equal')
      ? new RegExp(`^${searchValue}$`)
      : new RegExp(`${searchValue}`, 'i');

    return goods.map(good => {
      if (regExp.test(good.name)) return <Good key={good.id} good={good}/>
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
        {createRows(goods)}
      </tbody>
    </table>
  )
}

const Good = ({good}: {good: IGood}) => {
  const { date, name, quantity, distance } = good;

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
