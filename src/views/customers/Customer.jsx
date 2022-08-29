import React, { useState } from "react";
import ViewCustomers from "./ViewCustomers";
import Heading from "../../components/util/Heading";
import AddCustomer from "./AddCustomer";
import Button from "../../components/util/Button";
import anchors from "../../anchors/Anchors";
import { useSelector, useDispatch } from "react-redux";
import "./customer.css";
import axios from "axios";
import SearchBox from "../../components/util/SearchBox";

function Customer() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(true);
  const customerAnchor = anchors["customerAnchor"];
  const customers = useSelector((state) => state.customers);
  const dispatch = useDispatch();

  function saveCustomer(customer) {
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
          dispatch({
            type: "ADD_CUSTOMER",
            payload: customer,
          });
        }
      } catch (e) {
        alert(
          `customer could not be added due to invalid details provided with error ${e}`
        );
      }
    }
    saveCustomerDB();

    setIsFormSubmitted(true);
  }

  function formInitiated() {
    setIsFormSubmitted(false);
  }

  async function setCustomerView(field, key) {
    if (key.length === 0) {
      async function getCustomers() {
        try {
          const baseCustomerURLNew = "http://localhost:8080/Home/customers";
          const response = await axios.get(baseCustomerURLNew);
          if (response.status === 200) {
            const customersFetched = response.data["fetched all customers as"];
            customersFetched.map((customerFetched) => {
              return (customerFetched.createdOn = new Date(
                customerFetched["createdAt"] * 1000
              ).toLocaleDateString());
            });
            dispatch({
              type: "SET_CUSTOMERS",
              payload: customersFetched,
            });
          }
        } catch (e) {
          alert(`customers could not be fetched due to backend error ${e}`);
        }
      }
      getCustomers();
    } else {
      try {
        var baseCustomerURL = "http://localhost:8080/Home/customer/GetBy";
        baseCustomerURL += field.charAt(0).toUpperCase() + field.slice(1) + "?";
        baseCustomerURL += field;
        baseCustomerURL += "=";
        baseCustomerURL += key;

        const response = await axios.get(baseCustomerURL);
        if (
          response.status === 200 &&
          response.data[`fetched all customers with ${field} successfully`] !==
            null
        ) {
          const customersFetched =
            response.data[`fetched all customers with ${field} successfully`];
          customersFetched.map((customerFetched) => {
            return (customerFetched.createdOn = new Date(
              customerFetched["createdAt"] * 1000
            ).toLocaleDateString());
          });
          dispatch({
            type: "SET_CUSTOMERS",
            payload: customersFetched,
          });
        }
        if (
          response.data[`fetched all customers with ${field} successfully`] ===
          null
        ) {
          dispatch({
            type: "SET_CUSTOMERS",
            payload: [],
          });
        }
      } catch (e) {
        alert(
          `customers search results could not be fetched due to backend error ${e}`
        );
      }
    }
  }

  const headingContent = isFormSubmitted ? "Customers" : "New Customer";

  return (
    <div className="customer">
      <div className="customer-header">
        {<Heading headingContent={headingContent}></Heading>}
        {isFormSubmitted && (
          <Button
            buttonContent="New Customer"
            iconButton="+"
            buttonCall={formInitiated}
          ></Button>
        )}
      </div>
      <div>
        {isFormSubmitted && (
          <SearchBox
            getSearchResults={setCustomerView}
            fields={customerAnchor}
          />
        )}
      </div>
      <div className="customer-view-control">
        {isFormSubmitted ? (
          <ViewCustomers customers={customers} />
        ) : (
          <AddCustomer addCustomer={saveCustomer} />
        )}
      </div>
    </div>
  );
}

export default Customer;
