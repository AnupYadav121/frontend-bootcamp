import React from "react";
import ListRowData from "./TableRowData";
import anchors from "../../anchors/Anchors";

function TableRow(props) {
  const tmpAnchor = `${props.tableHeader}Anchor`;
  const data = anchors;
  const anchorsList = data[tmpAnchor];

  return (
    <tr className="table-row">
      {anchorsList.map((anchorData, index) => {
        return (
          <ListRowData
            rowData={props[anchorData.field]}
            id={index}
            key={index}
          ></ListRowData>
        );
      })}
    </tr>
  );
}

export default TableRow;
