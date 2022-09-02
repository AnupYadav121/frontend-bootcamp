import React from "react";
import PaginationTable from "../../components/util/PaginatedTable";
import SearchBox from "../../components/util/SearchBox";
import { useState } from "react";
import { useEffect } from "react";
import anchors from "../../anchors/Anchors";
import { useSelector } from "react-redux";

function ViewInvoices() {
  const invoiceAnchor = anchors["invoiceAnchor"];
  const invoices = useSelector((state) => state.invoices);
  const [filteredInvoices, setFilteredInvoices] = useState([]);

  useEffect(() => {
    setFilteredInvoices(invoices);
  }, [invoices]);

  const handleInvoicesView = (name, key) => {
    var tmpFilteredInvoices = [];
    if (key.length === 0) {
      setFilteredInvoices(invoices);
      return;
    }
    invoices.forEach((invoice) => {
      if (invoice[name].includes(key) === true) {
        tmpFilteredInvoices.push(invoice);
      }
    });
    setFilteredInvoices(tmpFilteredInvoices);
  };

  return (
    <div>
      <SearchBox getSearchResults={handleInvoicesView} fields={invoiceAnchor} />
      <PaginationTable list={filteredInvoices} tableHeader="invoice" />
    </div>
  );
}

export default ViewInvoices;
