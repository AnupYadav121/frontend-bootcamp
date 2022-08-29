import React from "react";
import ListRow from "./TableRow";
import TableHeader from "./TableHeader";
import "./table.css";

function Table(props) {
  return (
    <table className="list">
      <TableHeader tableHeader={props.tableHeader}></TableHeader>
      <tbody>
        {props.list.map((row, index) => {
          return (
            <ListRow
              key={index}
              {...row}
              tableHeader={props.tableHeader}
            ></ListRow>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
