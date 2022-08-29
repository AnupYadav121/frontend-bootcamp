import React from "react";

function Input(props) {
  const { label, error, setError, myClassName, ...inputProps } = props;

  return (
    <div className={myClassName}>
      <label>{label}</label>
      <input {...inputProps} className="form-control"></input>
      <p className="error">{error}</p>
    </div>
  );
}

export default Input;
