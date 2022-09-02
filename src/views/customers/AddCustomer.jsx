import React from "react";
import { useState } from "react";
import Button from "../../components/util/Button";
import Input from "../../components/util/Input";
import { v4 as uuid4 } from "uuid";
import { inputs } from "../../anchors/Inputs";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setIsCustomerSet } from "../../actions/actions";

function AddCustomer(props) {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  let myUseNavigate = useNavigate();

  function formInitiatedDone() {
    dispatch(setIsCustomerSet(true));
  }

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
      const baseCustomerURL = "http://localhost:8080/Home/customer";

      async function saveCustomerDB() {
        const dummyCustomer = {};
        dummyCustomer.name = customer["name"];
        dummyCustomer.email = customer["email"];
        dummyCustomer.phone = customer["phone"];
        try {
          const responseCustomer = await axios.post(
            baseCustomerURL,
            JSON.stringify(dummyCustomer)
          );
          if (responseCustomer.status === 200) {
            dispatch(addCustomer(customer));
          }
        } catch (e) {
          alert(
            `customer could not be added due to invalid details provided with error ${e}`
          );
        }
      }
      saveCustomerDB();
      formInitiatedDone();
      myUseNavigate(-1);
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
