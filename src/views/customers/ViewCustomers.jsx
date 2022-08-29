import React, { useEffect } from "react";
import axios from "axios";
import PaginationTable from "../../components/util/PaginatedTable";
import { useSelector, useDispatch } from "react-redux";
// act, await for certain elements to be visible.
function ViewCustomers() {
  const customers = useSelector((state) => state.customers);
  const dispatch = useDispatch();

  const baseCustomerURL = "http://localhost:8080/Home/customers";

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
  }, [dispatch]);

  return <PaginationTable list={customers} tableHeader="customer" />;
}

export default ViewCustomers;
