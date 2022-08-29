import React from "react";

function TextArea(props) {
  const { rows, columns, name, id } = props;
  var customerData = `Bill to \n ${props.customerFetched.name} \n ${props.customerFetched.phone} \n ${props.customerFetched.email}`;
  return (
    <textarea
      id={id}
      name={name}
      rows={rows}
      cols={columns}
      defaultValue={customerData}
    ></textarea>
  );
}

export default TextArea;
