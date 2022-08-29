import React from "react";
import { useState } from "react";
import Button from "../../components/util/Button";
import Input from "../../components/util/Input";
import { v4 as uuid4 } from "uuid";

function AddItem(props) {
  const inputs = [
    {
      id: 1,
      type: "text",
      placeholder: "name",
      label: "Name",
      name: "name",
    },
    {
      id: 2,
      type: "number",
      placeholder: "price",
      label: "Price",
      name: "price",
    },
    {
      id: 3,
      type: "text",
      placeholder: "description",
      label: "Description",
      name: "description",
    },
  ];

  const [errors, setErrors] = useState({});

  const [item, setItem] = useState({
    name: "",
    price: "",
    description: "",
    createdOn: "",
  });

  function saveItemDetail(event) {
    const { name, value } = event.target;
    const date = new Date().toLocaleDateString();
    setItem((preDetails) => ({
      ...preDetails,
      [name]: value,
      createdOn: date,
      key: uuid4(),
      id: uuid4(),
    }));
  }

  const checkItemDetail = (event) => {
    // eslint-disable-next-line no-unused-vars
    const { name, value } = event.target;
    setErrors(validate(item, name));
  };

  function checkSubmitItem() {
    setErrors(validate(item, ""));
  }

  function addItem(event) {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      props.addItem(item);
    }
  }

  const validate = (itemDetail, field) => {
    const errors = {};

    if ((field === "" || field === "name") && itemDetail.name.length < 3) {
      errors.name = "name should be at-least  3 character long";
    }
    if ((field === "" || field === "price") && !itemDetail.price) {
      errors.price = "item price is required";
    }
    if ((field === "" || field === "description") && !itemDetail.description) {
      errors.description = "item description is required";
    }
    return errors;
  };

  return (
    <div className="add-item">
      {inputs.map((input, index) => {
        const myClass = `input-${index}`;
        return (
          <Input
            key={input.id}
            {...input}
            value={item[input.name]}
            onChange={saveItemDetail}
            onBlur={checkItemDetail}
            error={errors[input.name]}
            myClassName={myClass}
          ></Input>
        );
      })}

      <div className="item-add-button">
        <Button
          buttonContent="Save Item"
          iconButton={<i className="fa fa-save"></i>}
          buttonCall={addItem}
          onMouseOver={checkSubmitItem}
        ></Button>
      </div>
    </div>
  );
}

export default AddItem;
