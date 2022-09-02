import { initialState } from "../states/States";

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CUSTOMER":
      return {
        ...state,
        customers: [...state.customers, action.payload],
      };
    case "SET_CUSTOMERS":
      return {
        ...state,
        customers: action.payload,
      };
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "SET_ITEMS":
      return {
        ...state,
        items: action.payload,
      };
    case "SET_INVOICES":
      return {
        ...state,
        invoices: action.payload,
      };
    case "ADD_INVOICE_ITEM":
      return {
        ...state,
        invoiceItems: [...state.invoiceItems, action.payload],
      };
    case "SET_INVOICE_ITEMS":
      return {
        ...state,
        invoiceItems: action.payload,
      };
    case "ADD_INVOICE":
      return {
        ...state,
        invoices: [...state.invoices, action.payload],
      };
    case "SET_CUSTOMER_FORM":
      return {
        ...state,
        isCustomerSet: action.payload,
      };
    default:
      return state;
  }
};

export default AppReducer;
