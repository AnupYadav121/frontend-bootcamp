import React from "react";

function InvoiceInput(props) {
  const { label, error, className, ...inputProps } = props;

  return (
    <div className={`${className} invoice-input`}>
      <label>{label}</label>
      <input {...inputProps} required></input>
      <p className="error">{error}</p>
    </div>
  );
}

export default InvoiceInput;
