import React from "react";
import Heading from "../../components/util/Heading";
import Button from "../../components/util/Button";
import "./customer.css";
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsCustomerSet } from "../../actions/actions";

function Customer() {
  const isFormSubmitted = useSelector((state) => state.isCustomerSet);
  const headingContent = isFormSubmitted ? "Customers" : "New Customer";
  const dispatch = useDispatch();

  function formInitiated() {
    dispatch(setIsCustomerSet(false));
  }

  return (
    <div className="customer">
      <div className="customer-header">
        {<Heading headingContent={headingContent}></Heading>}
        {isFormSubmitted && (
          <Link to="/customers/add">
            <Button
              buttonContent="New Customer"
              iconButton="+"
              buttonCall={formInitiated}
            ></Button>
          </Link>
        )}
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default Customer;
