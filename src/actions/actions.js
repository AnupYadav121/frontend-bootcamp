export const setCustomers = (data) => {
  return {
    type: "SET_CUSTOMERS",
    payload: data,
  };
};

export const addCustomer = (data) => {
  return {
    type: "ADD_CUSTOMER",
    payload: data,
  };
};

export const setMyInvoices = (data) => {
  return {
    type: "SET_INVOICES",
    payload: data,
  };
};

export const addMyInvoice = (data) => {
  return {
    type: "ADD_INVOICE",
    payload: data,
  };
};

export const addMyItem = (data) => {
  return {
    type: "ADD_ITEM",
    payload: data,
  };
};

export const setMyItems = (data) => {
  return {
    type: "SET_ITEMS",
    payload: data,
  };
};

export const setMyInvoiceItems = (data) => {
  return {
    type: "SET_INVOICES_ITEMS",
    payload: data,
  };
};

export const addMyInvoiceItem = (data) => {
  return {
    type: "ADD_INVOICE_ITEM",
    payload: data,
  };
};

export const setIsCustomerSet = (data) => {
  return {
    type: "SET_CUSTOMER_FORM",
    payload: data,
  };
};
