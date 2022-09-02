import React from "react";
import "./invoice.css";
import Heading from "../../components/util/Heading";
import Button from "../../components/util/Button";
import { useState, useEffect } from "react";
import ViewInvoices from "./ViewInvoices";
import AddInvoice from "./AddInvoice";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMyInvoices } from "../../actions/actions";

function Invoice() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(true);
  const invoices = useSelector((state) => state.invoices);
  const dispatch = useDispatch();

  const headingContent = isFormSubmitted ? "Invoice" : "New Invoice";

  function formToggle() {
    setIsFormSubmitted(!isFormSubmitted);
  }

  const baseInvoiceURL = "http://localhost:8080/Home/invoices";
  useEffect(() => {
    async function setInvoices() {
      try {
        const response = await axios.get(baseInvoiceURL);
        if (
          response.status === 200 &&
          response.data["Invoices fetched Successfully:"] !== null
        ) {
          const invoicesFetched =
            response.data["Invoices fetched Successfully:"];
          invoicesFetched.map((invoiceFetched) => {
            return (invoiceFetched.created_at = new Date(
              invoiceFetched["updated_at"] * 1000
            ).toLocaleDateString());
          });
          dispatch(setMyInvoices(invoicesFetched));
        }
      } catch (e) {
        alert(`invoices could not be fetched due to DB error ${e}`);
      }
    }
    setInvoices();
  }, [dispatch]);

  return (
    <div className="invoice">
      <div className="invoice-header">
        {<Heading headingContent={headingContent}></Heading>}
        {isFormSubmitted && (
          <Button
            buttonContent="New Invoice"
            iconButton="+"
            buttonCall={formToggle}
          />
        )}
      </div>

      <div className="invoice-view-control">
        {invoices.length === 0 ? (
          <h1 style={{ textAlign: "center", verticalAlign: "center" }}>
            Loading ......
          </h1>
        ) : isFormSubmitted ? (
          <ViewInvoices />
        ) : (
          <AddInvoice saveFormToggle={formToggle} />
        )}
      </div>
    </div>
  );
}

export default Invoice;
