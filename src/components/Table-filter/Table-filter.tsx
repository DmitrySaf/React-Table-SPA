import { useRef, useState } from 'react';

import { ISearchFilter } from '../interfaces';

import './Table-filter.scss'

type Event = {
  target: {
    value: string
  }
}

type Props = {
  onSearch: (args: ISearchFilter) => void
}

const TableFilter = (props: Props) => {
  const [column, setColumn] = useState('name');
  const [clause, setClause] = useState('equal');
  const selectColumn = useRef<HTMLSelectElement>(null);
  const selectClause = useRef<HTMLSelectElement>(null);

  const onColumnSelect = () => {
    if (selectColumn.current) setColumn(selectColumn.current.value)
  }

  const onClauseSelect = () => {
    if (selectClause.current) setClause(selectClause.current.value);
  }

  const onSearch = (e: Event) => {
    props.onSearch({
      searchValue: e.target.value,
      column,
      clause
    });
  }

  return (
    <div className="table-filter">
      <select onChange={onColumnSelect} ref={selectColumn} name="column" id="column" className="table-filter__column">
        <option value="name">Название</option>
        <option value="quantity">Количество</option>
        <option value="distance">Расстояние</option>
      </select>
      <select onChange={onClauseSelect} ref={selectClause} name="clause" id="clause" className="talbe-filter__clause">
        <option value="equal">Равно</option>
        <option value="contains">Содержит</option>
        <option value="more">Больше</option>
        <option value="less">Меньше</option>
      </select>
      <input
        onChange={onSearch}
        type="text"
        className="table-filter__input"
        placeholder="Enter value"
      />
    </div>
  )
}

export default TableFilter;
