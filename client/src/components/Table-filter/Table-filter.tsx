import { useReducer, useEffect } from 'react';

import { ISearchFilter, IReducerAction } from '../interfaces';

import './Table-filter.scss'

type Props = {
  onSearch: (args: ISearchFilter) => void,
  initialFilters: ISearchFilter
}

const reducer = (state: ISearchFilter, action: IReducerAction) => {
  switch (action.type) {
    case 'column': return {...state, column: action.payload};
    case 'clause': return {...state, clause: action.payload};
    case 'searchValue': return {...state, searchValue: action.payload}
    default: return state
  }
}

const TableFilter = ({onSearch, initialFilters}: Props) => {
  const [state, dispatch] = useReducer(reducer, initialFilters);

  useEffect(() => {
    onSearch(state);
  }, [state]);

  return (
    <div className="table-filter">
      <select
        onChange={(e) => dispatch({type: 'column', payload: e.target.value})}
        value={state.column}
        name="column"
        id="column"
        className="table-filter__column"
      >
        <option value="name">Название</option>
        <option value="quantity">Количество</option>
        <option value="distance">Расстояние</option>
      </select>
      <select
        onChange={(e) => dispatch({type: 'clause', payload: e.target.value})}
        value={state.clause}
        name="clause"
        id="clause"
        className="talbe-filter__clause"
      >
        <option value="equal">Равно</option>
        <option value="contains">Содержит</option>
        <option value="more">Больше</option>
        <option value="less">Меньше</option>
      </select>
      <input
        onChange={(e) => dispatch({type: 'searchValue', payload: e.target.value})}
        value={state.searchValue}
        type="text"
        className="table-filter__input"
        placeholder="Введите значение"
      />
    </div>
  )
}

export default TableFilter;
