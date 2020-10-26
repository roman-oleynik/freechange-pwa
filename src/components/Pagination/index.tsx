import React from 'react';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
  pagesAmount: number,
	curPage: number,
  onPageChange: (page: number) => void,
}

export function Pagination({ onPageChange, pagesAmount, curPage }: Props) {
  if ( pagesAmount === 0 ) {
    return null;
  }
  return (
    <nav
      aria-label="Page navigation"
      className="container d-flex justify-content-center pt-2"
    >
      <ReactPaginate
        pageCount={pagesAmount}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        onPageChange={(EO) => onPageChange(EO.selected + 1)}
        initialPage={curPage - 1}
        forcePage={curPage - 1}
        previousLabel="&laquo;"
        nextLabel="&raquo;"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        disabledClassName="page-item disabled"
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        activeClassName="page-item active"
      />
    </nav>
    
  );
}


export default Pagination;