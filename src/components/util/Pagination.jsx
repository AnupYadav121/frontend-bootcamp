import React from "react";

const Pagination = ({
  rowsPerPage,
  totalRows,
  paginate,
  paginatePrevious,
  paginateNext,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-navbar">
      <button onClick={paginatePrevious}>Previous</button>
      {pageNumbers.map((number, index) => (
        <button
          key={index}
          onClick={() => paginate(number)}
          className="page-link"
        >
          {number}
        </button>
      ))}
      <button onClick={paginateNext}>Next</button>
    </nav>
  );
};

export default Pagination;
