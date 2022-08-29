import React, { useState } from "react";
import Table from "../table/Table";
import Pagination from "./Pagination";

const PaginationTable = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(4);

  // Get current rows
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = props.list.slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const setPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const setNextPage = () => {
    if (currentPage < Math.ceil(props.list.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <Table list={currentRows} tableHeader={props.tableHeader} />
      <Pagination
        rowsPerPage={rowsPerPage}
        totalRows={props.list.length}
        paginate={paginate}
        paginatePrevious={setPreviousPage}
        paginateNext={setNextPage}
      />
    </div>
  );
};

export default PaginationTable;
