import { useState } from 'react';

import { IFlight } from '../interfaces';

import './Pagination.scss'

type PagintaionProps = {
  flightsList: IFlight[],
  onPageChange: (index: number) => void
}

const Pagination = ({flightsList, onPageChange}: PagintaionProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const FLIGHTS_PER_PAGE = 10;
  const pages = Math.ceil(flightsList.length / FLIGHTS_PER_PAGE);

  const onCurrentPage = (index: number) => {
    onPageChange(index);
    setCurrentPage(index);
  }

  const renderPagesNumber = () => {
    let pagesList = [];
    for (let i = 1; i <= pages; i++) {
      pagesList.push(
        <li
          tabIndex={0}
          onClick={() => onCurrentPage(i)}
          className={"pagination__item " + ((currentPage === i) && "pagination__item_active")}
          key={i}
        >{i}
        </li>
      );
    }
    return pagesList
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {renderPagesNumber()}
      </ul>
    </div>
  );
}

export default Pagination;
