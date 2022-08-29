import React from "react";

function InvoiceBudget(props) {
  var sumItemsPrice = 0;
  props.itemsList.map((item) => {
    return (sumItemsPrice += item.price * item.quantity);
  });
  return (
    <div className="invoice-calculation">
      <div>
        {props.itemsList.map((item, index) => {
          return (
            <div key={index} className="calculation-item">
              <p>{item.name}</p>
              <p>
                <i className="fa fa-times" aria-hidden="true"></i>{" "}
                {item.quantity}
              </p>
              <p>{item.price}</p>
            </div>
          );
        })}
      </div>
      <hr style={{ height: "30px" }}></hr>
      <div className="invoice-amount">
        <p>Total Amount</p>
        <p>{sumItemsPrice}</p>
      </div>
    </div>
  );
}

export default InvoiceBudget;
