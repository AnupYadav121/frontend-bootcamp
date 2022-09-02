import React from "react";
import Header from "./components/app/MainHeader";
import Footer from "./components/app/MainFooter";
import { Outlet } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/app/Home";
import Customer from "./views/customers/Customer";
import Item from "./views/items/Item";
import Invoice from "./views/invoices/Invoice";
import Navbar from "./components/app/Navbar";
import ViewCustomers from "./views/customers/ViewCustomers";
import AddCustomer from "./views/customers/AddCustomer";

function App() {
  return (
    <div className="main-app">
      <div className="main-header">
        <Header>Bill App</Header>
      </div>
      <div className="main-body">
        <div className="router">
          <BrowserRouter>
            <div className="navbar">
              <Navbar></Navbar>
            </div>
            <div className="app-routes">
              <Routes>
                <Route path="/">
                  <Route index element={<Home />} />
                  <Route path="customers" element={<Customer />}>
                    <Route index element={<ViewCustomers />} />
                    <Route path="add" element={<AddCustomer />} />
                  </Route>
                  <Route path="items" element={<Item />} />
                  <Route path="invoices" element={<Invoice />} />
                </Route>
              </Routes>
            </div>
            <div className="navbar-target">
              <Outlet></Outlet>
            </div>
          </BrowserRouter>
        </div>
      </div>
      <div className="main-footer">
        <Footer>Copyright 2022</Footer>
      </div>
    </div>
  );
}

export default App;
