import React, { useEffect } from "react";
import axios from "axios";
import PaginationTable from "../../components/util/PaginatedTable";
import { useSelector, useDispatch } from "react-redux";
import { setCustomers } from "../../actions/actions";
import SearchBox from "../../components/util/SearchBox";
import anchors from "../../anchors/Anchors";

// act, await for certain elements to be visible.
function ViewCustomers() {
  const customers = useSelector((state) => state.customers);
  const dispatch = useDispatch();
  const baseCustomerURL = "http://localhost:8080/Home/customers";
  const customerAnchor = anchors["customerAnchor"];

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
            dispatch(setCustomers(customersFetched));
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
          dispatch(setCustomers(customersFetched));
        }
        if (
          response.data[`fetched all customers with ${field} successfully`] ===
          null
        ) {
          dispatch(setCustomers([]));
        }
      } catch (e) {
        alert(
          `customers search results could not be fetched due to backend error ${e}`
        );
      }
    }
  }

  useEffect(() => {
    async function getCustomers() {
      try {
        const response = await axios.get(baseCustomerURL);
        if (response.status === 200) {
          var customersFetched = response.data["fetched all customers as"];
          if (customersFetched !== null && customersFetched.length > 0) {
            customersFetched.map((customerFetched) => {
              return (customerFetched.createdOn = new Date(
                customerFetched["createdAt"] * 1000
              ).toLocaleDateString());
            });
          } else {
            customersFetched = [];
          }
          dispatch(setCustomers(customersFetched));
        }
      } catch (e) {
        alert(`customers could not be fetched due to backend error ${e}`);
      }
    }
    getCustomers();
  }, [dispatch]);

  return (
    <div>
      <SearchBox getSearchResults={setCustomerView} fields={customerAnchor} />
      <PaginationTable list={customers} tableHeader="customer" />
    </div>
  );
}

export default ViewCustomers;

//use actions hook
