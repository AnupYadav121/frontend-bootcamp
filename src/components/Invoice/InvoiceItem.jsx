import React from "react";

function InvoiceItem(props) {
  const invoiceItem = props.invoiceItem;
  const handleClick = () => {
    props.deleteInvoiceItem(props.id);
  };

  return (
    <tr>
      <td>{invoiceItem.name}</td>
      <td>{invoiceItem.quantity}</td>
      <td>{invoiceItem.price}</td>
      <td>{parseInt(invoiceItem.price) * parseInt(invoiceItem.quantity)}</td>
      <td>
        <button onClick={handleClick}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
      </td>
    </tr>
  );
}

export default InvoiceItem;
