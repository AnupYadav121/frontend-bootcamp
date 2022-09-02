import React from "react";
import { useState, useEffect } from "react";
import AddInvoiceCustomer from "../../components/Invoice/AddInvoiceCustomer";
import AddInvoiceItem from "../../components/Invoice/AddInvoiceItem";
import InvoiceBudget from "../../components/Invoice/InvoiceBudget";
import InvoiceItem from "../../components/Invoice/InvoiceItem";
import InvoiceItemHeader from "../../components/Invoice/InvoiceItemHeader";
import TextArea from "../../components/util/TextArea";
import InvoiceInput from "../../components/Invoice/InvoiceInput";
import axios from "axios";
import Button from "../../components/util/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  setCustomers,
  addMyInvoiceItem,
  setMyInvoiceItems,
  addMyInvoice,
} from "../../actions/actions";
import { setMyItems } from "../../actions/actions";

function AddInvoice(props) {
  const [isCustomerSet, setIsCustomerSet] = useState(true);
  const [isItemSet, setIsItemSet] = useState(true);
  const tmpInvoiceId = Math.ceil(Math.random() * 10000000000000);
  const [notes, setNotes] = useState("");
  const invoiceItems = useSelector((state) => state.invoiceItems);
  const dispatch = useDispatch();
  const [invoiceCustomer, setInvoiceCustomer] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
  });
  // eslint-disable-next-line no-unused-vars
  const [invoiceItem, setInvoiceItem] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    quantity: "",
    invoiceId: "",
  });
  const [invoiceDetails, setInvoiceDetails] = useState({
    issuedAt: "",
    dueDate: "",
    invoiceNumber: "",
    refNumber: "",
  });
  const [invoiceDetailsError, setInvoiceDetailsError] = useState({
    issuedAt: "",
    dueDate: "",
    refNumber: "",
  });

  const handleInvoiceDetails = (e) => {
    const { name, value } = e.target;
    var isError = false;
    if (
      name === "issuedAt" &&
      (value < 1529644667834 ||
        (invoiceDetails.dueDate.length > 0 &&
          parseInt(invoiceDetails.dueDate.slice(-2)) <
            parseInt(value.slice(-2))))
    ) {
      isError = true;
      setInvoiceDetailsError((preError) => {
        return {
          ...preError,
          issuedAt: "issued date is not valid",
        };
      });
    } else {
      if (name === "issuedAt") {
        setInvoiceDetailsError((preError) => {
          return {
            ...preError,
            issuedAt: "",
          };
        });
      }
    }
    if (
      name === "dueDate" &&
      (value < 1529644667834 ||
        (invoiceDetails.issuedAt.length > 0 &&
          parseInt(invoiceDetails.issuedAt.slice(-2)) >
            parseInt(value.slice(-2))))
    ) {
      isError = true;
      setInvoiceDetailsError((preError) => {
        return {
          ...preError,
          dueDate: "due date is not valid",
        };
      });
    } else {
      if (name === "dueDate") {
        setInvoiceDetailsError((preError) => {
          return {
            ...preError,
            dueDate: "",
          };
        });
      }
    }
    if (name === "refNumber" && value.length < 5) {
      isError = true;
      setInvoiceDetailsError((preError) => {
        return {
          ...preError,
          refNumber: "please provide a valid reference number",
        };
      });
    } else {
      if (name === "refNumber") {
        setInvoiceDetailsError((preError) => {
          return {
            ...preError,
            refNumber: "",
          };
        });
      }
    }
    if (isError === false) {
      setInvoiceDetails((preDetails) => {
        return {
          ...preDetails,
          [name]: value,
        };
      });
    }
  };

  useEffect(() => {
    async function setItems() {
      try {
        const baseItemURL = "http://localhost:8080/Home/items";
        const response = await axios.get(baseItemURL);
        if (response.status === 200) {
          const itemsFetched = response.data;
          itemsFetched.map((itemFetched) => {
            return (itemFetched.createdOn = new Date(
              itemFetched["created_at"] * 1000
            ).toLocaleDateString());
          });
          dispatch(setMyItems(itemsFetched));
        }
      } catch (e) {
        alert(`items could not be fetched due to DB error ${e}`);
      }
    }
    setItems();
  }, [dispatch]);

  useEffect(() => {
    async function getCustomers() {
      try {
        const baseCustomerURL = "http://localhost:8080/Home/customers";
        const response = await axios.get(baseCustomerURL);
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
  }, [dispatch]);

  const handleCustomerClick = () => {
    setIsCustomerSet(!isCustomerSet);
  };

  const handleCustomerSubmit = (customer) => {
    setInvoiceCustomer(customer);
    setIsCustomerSet(!isCustomerSet);
  };

  const handleItemSubmit = (quantity, item) => {
    item.quantity = quantity;
    setInvoiceItem(item);
    dispatch(addMyInvoiceItem(item));
  };

  const handleChangeNotes = (e) => {
    const { value } = e.target;
    setNotes(value);
  };

  const handleItemClick = () => {
    setIsItemSet(!isItemSet);
  };

  const handleDeleteInvoiceItem = (id) => {
    const filteredItems = invoiceItems.filter((item, index) => {
      return index !== id;
    });
    dispatch(setMyInvoiceItems(filteredItems));
  };

  const handleSaveInvoice = () => {
    const invoiceBody = {};
    invoiceBody.id = tmpInvoiceId;
    invoiceBody.due_date = new Date(invoiceDetails.dueDate).getTime() / 1000;
    invoiceBody.issued_date =
      new Date(invoiceDetails.issuedAt).getTime() / 1000;
    invoiceBody.ref_no = invoiceDetails.refNumber;
    invoiceBody.customer_id = invoiceCustomer.id;
    invoiceBody.bill_address = `${invoiceCustomer.name} \n ${invoiceCustomer.email} \n ${invoiceCustomer.phone}`;
    if (invoiceItems.length > 0) {
      invoiceBody.paid_status = "Created";
    } else {
      invoiceBody.paid_status = "Issued";
    }
    invoiceBody.notes = notes;
    const tmpInvoiceItems = [];
    invoiceItems.forEach((invoiceItem) => {
      const tmpInvoiceItem = {};
      tmpInvoiceItem.item_id = invoiceItem.id;
      tmpInvoiceItem.item_quantity = parseInt(invoiceItem.quantity);
      tmpInvoiceItems.push(tmpInvoiceItem);
    });
    invoiceBody.invoice_items = tmpInvoiceItems;

    const baseInvoicePostURL = "http://localhost:8080/Home/invoice";
    var baseInvoiceGetURL = "http://localhost:8080/Home/invoice/";
    async function saveInvoiceDB() {
      var fetchError = "";
      try {
        const responseInvoice = await axios.post(
          baseInvoicePostURL,
          JSON.stringify(invoiceBody)
        );
        baseInvoiceGetURL += tmpInvoiceId;
        const getSavedInvoice = await axios.get(baseInvoiceGetURL);
        const invoiceData =
          getSavedInvoice.data["Invoice fetched Successfully:"];
        invoiceData.created_at = new Date(
          invoiceData.updated_at * 1000
        ).toLocaleDateString();
        if (responseInvoice.status === 200) {
          dispatch(addMyInvoice(invoiceData));
        } else {
          if (responseInvoice.data["error"] !== null) {
            fetchError = responseInvoice.data["error"];
          }
        }
      } catch (e) {
        if (fetchError.length > 0) {
          alert(`invoice could not be added due to error ${fetchError}`);
        }
        alert(`invoice could not be added due to error ${e}`);
      }
    }
    dispatch(setMyInvoiceItems([]));
    saveInvoiceDB();
    props.saveFormToggle();
  };

  return (
    <div>
      <div className="save-invoice-button">
        <Button
          buttonContent="Save Invoice"
          iconButton={<i className="fa fa-solid fa-file-lines"></i>}
          buttonCall={handleSaveInvoice}
        />
      </div>
      <div className="add-invoice-view-part1">
        <div className="invoice-customer-data">
          {isCustomerSet ? (
            <div className="show-invoice-customer">
              <TextArea
                name="customerData"
                id="customerData"
                rows="5"
                columns="40"
                customerFetched={invoiceCustomer}
              />
              <button onClick={handleCustomerClick}>Change Customer</button>
            </div>
          ) : (
            <AddInvoiceCustomer
              onSubmit={handleCustomerSubmit}
              onCancel={handleCustomerClick}
            />
          )}
        </div>
        <div className="invoice-details">
          <InvoiceInput
            type="date"
            placeholder="invoice issue date"
            label="Issued At"
            name="issuedAt"
            key={1}
            error={invoiceDetailsError.issuedAt}
            onChange={handleInvoiceDetails}
            className="invoiceInput1"
          ></InvoiceInput>
          <InvoiceInput
            type="date"
            placeholder="invoice due date"
            label="Due Date"
            name="dueDate"
            key={2}
            error={invoiceDetailsError.dueDate}
            onChange={handleInvoiceDetails}
            className="invoiceInput2"
          ></InvoiceInput>
          <InvoiceInput
            type="number"
            placeholder="invoice  number"
            label="Invoice Number"
            name="invoiceNumber"
            key={3}
            defaultValue={tmpInvoiceId}
          ></InvoiceInput>
          <InvoiceInput
            type="text"
            placeholder="invoice reference number"
            label="Ref Number"
            name="refNumber"
            key={4}
            error={invoiceDetailsError.refNumber}
            onChange={handleInvoiceDetails}
          ></InvoiceInput>
        </div>
      </div>

      <div className="invoice-items-details">
        <table className="invoice-item-table">
          <thead className="invoice-item-table-header">
            <InvoiceItemHeader />
          </thead>
          <tbody>
            {invoiceItems.map((invoiceItemTmp, index) => {
              return (
                <InvoiceItem
                  invoiceItem={invoiceItemTmp}
                  key={index}
                  deleteInvoiceItem={handleDeleteInvoiceItem}
                  id={index}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="invoice-item-view">
        {isItemSet ? (
          <div className="add-invoice-item">
            <p>
              <i className="fa fa-shopping-basket" aria-hidden="true"></i>
            </p>
            <button onClick={handleItemClick}>Add Item</button>
          </div>
        ) : (
          <AddInvoiceItem
            onSubmit={handleItemSubmit}
            onCancel={handleItemClick}
          />
        )}
      </div>

      <hr></hr>

      <div className="invoice-view-footer">
        <div>
          <label>Notes</label>
          <br></br>
          <textarea
            type="text"
            value={notes}
            onChange={handleChangeNotes}
            rows="5"
            cols="40"
            name="invoiceNotes"
          ></textarea>
        </div>
        <InvoiceBudget itemsList={invoiceItems} />
      </div>
    </div>
  );
}

export default AddInvoice;
