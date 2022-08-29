import React from "react";
import { useState } from "react";
import Button from "../../components/util/Button";
import Input from "../../components/util/Input";
import { v4 as uuid4 } from "uuid";
import { inputs } from "../../anchors/Inputs";

function AddCustomer(props) {
  const [errors, setErrors] = useState({});

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    createdOn: "",
  });

  function saveCustomerDetail(event) {
    const { name, value } = event.target;
    const date = new Date().toLocaleDateString();
    setCustomer((preDetails) => ({
      ...preDetails,
      [name]: value,
      createdOn: date,
      key: uuid4(),
      id: uuid4(),
    }));
  }

  function checkCustomerDetail(event) {
    // eslint-disable-next-line no-unused-vars
    const { name, value } = event.target;
    setErrors(validate(customer, name));
  }

  function checkCustomerSubmit() {
    setErrors(validate(customer, ""));
  }

  function addCustomer(event) {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      if (props.addCustomer !== undefined) {
        props.addCustomer(customer);
      }
    }
  }

  const validate = (customerDetail, field) => {
    const errors = {};
    const regexEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

    if (
      (field === "" || field === "name") &&
      customerDetail["name"].length < 3
    ) {
      errors.name = "name should be at-least  3 character long";
    }
    if ((field === "" || field === "email") && !customerDetail.email) {
      errors.email = "customer email is required";
    }
    if ((field === "" || field === "phone") && !customerDetail.phone) {
      errors.phone = "customer phone number is required";
    }
    if (
      (field === "" || field === "email") &&
      !regexEmail.test(customerDetail.email)
    ) {
      errors.email = "email provided has wrong format";
    }

    return errors;
  };

  return (
    <div className="add-customer">
      {inputs.map((input, index) => {
        const myClass = `input-${index}`;
        return (
          <Input
            key={input.id}
            {...input}
            value={customer[input.name]}
            onChange={saveCustomerDetail}
            onBlur={checkCustomerDetail}
            error={errors[input.name]}
            myClassName={myClass}
          ></Input>
        );
      })}

      <div className="customer-add-button">
        <Button
          buttonContent="Save Customer"
          iconButton={<i className="fa fa-save"></i>}
          buttonCall={addCustomer}
          onMouseOver={checkCustomerSubmit}
        ></Button>
      </div>
    </div>
  );
}

export default AddCustomer;
