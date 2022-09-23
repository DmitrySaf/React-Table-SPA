import { useRef, useState } from 'react';

import './Table-filter.scss'

const TableFilter = () => {
  const [column, setColumn] = useState('name');
  const [clause, setClause] = useState('equal');
  const selectColumn = useRef<HTMLSelectElement>(null);
  const selectClause = useRef<HTMLSelectElement>(null);

  const onSelect = () => {
    if (selectColumn.current) {
      setColumn(selectColumn.current.value);
    }
    if (selectClause.current) {
      setClause(selectClause.current.value);
    }
  }

  const onSearch = () => {
    
  }

  return (
    <div className="table-filter">
      <select onChange={onSelect} ref={selectColumn} name="column" id="column" className="table-filter__column">
        <option value="name">Название</option>
        <option value="quantity">Количество</option>
        <option value="distance">Расстояние</option>
      </select>
      <select onChange={onSelect} ref={selectClause} name="clause" id="clause" className="talbe-filter__clause">
        <option value="equal">Равно</option>
        <option value="contains">Содержит</option>
        <option value="more">Больше</option>
        <option value="less">Меньше</option>
      </select>
      <input onChange={onSearch} type="text" className="table-filter__input" />
    </div>
  )
}

export default TableFilter;
