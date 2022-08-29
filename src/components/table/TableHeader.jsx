import React from "react";
import anchors from "../../anchors/Anchors";

function TableHeader(props) {
  const tmpAnchor = `${props.tableHeader}Anchor`;
  const data = anchors;
  const anchorsList = data[tmpAnchor];

  return (
    <thead>
      <tr>
        {anchorsList.map((anchorData, index) => {
          return <td key={index}>{anchorData.header}</td>;
        })}
      </tr>
    </thead>
  );
}

export default TableHeader;
