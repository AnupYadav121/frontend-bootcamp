const anchors = {
  customerAnchor: [
    { field: "name", header: "NAME" },
    { field: "email", header: "EMAIL" },
    { field: "phone", header: "PHONE" },
    { field: "createdOn", header: "CREATED ON" },
  ],
  itemAnchor: [
    { field: "name", header: "NAME" },
    { field: "description", header: "DESCRIPTION" },
    { field: "price", header: "PRICE" },
    { field: "createdOn", header: "ADDED ON" },
  ],
  invoiceAnchor: [
    { field: "created_at", header: "DATE" },
    { field: "customer_id", header: "CUSTOMER" },
    { field: "id", header: "NUMBER" },
    { field: "paid_status", header: "PAID STATUS" },
    { field: "amount", header: "AMOUNT" },
    { field: "amount_due", header: "AMOUNT DUE" },
  ],
};
export default anchors;
