import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function AddInvoiceCustomer(props) {
  const customers = useSelector((state) => state.customers);
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [searchKey, setSearchKey] = useState("");
  const [customerDetails, setCustomerDetails] = useState(
    `${customers[0].id} ${customers[0].name}`
  );

  const handleChange = (e) => {
    const { value } = e.target;
    setCustomerDetails(value);
  };

  const handleSubmit = () => {
    const customerID = customerDetails.substring(
      0,
      customerDetails.indexOf(" ")
    );
    const customerWithID = customers.filter((customer) => {
      return customer.id === parseInt(customerID);
    });
    props.onSubmit(customerWithID[0]);
  };

  const handleChangeSearchKey = (e) => {
    const { value } = e.target;
    setSearchKey(value);
    if (value.length >= 0) {
      const filteredCustomersNew = customers.filter((customer) => {
        return customer.name.includes(value) === true;
      });
      setFilteredCustomers(filteredCustomersNew);
    }
  };

  return (
    <div className="add-invoice-customer">
      <div className="add-customer-1">
        <label htmlFor="customerSearchKey"></label>
        <input
          type="text"
          id="customerSearchKey"
          placeholder="Customer Search Key"
          value={searchKey}
          onChange={handleChangeSearchKey}
          required
        ></input>
      </div>

      <div className="add-customer-2">
        <select
          name="customerSelect"
          id="customerSelect"
          value={customerDetails}
          onChange={handleChange}
        >
          {filteredCustomers.map((customer, index) => {
            return (
              <option key={index}>
                {customer.id} {customer.name}
              </option>
            );
          })}
        </select>
        <p className="error">{props.error}</p>
      </div>

      <div className="add-customer-3">
        <button onClick={handleSubmit}>Add Customer</button>
      </div>

      <div className="add-customer-4">
        <button onClick={props.onCancel}>Cancel</button>
      </div>
    </div>
  );
}
