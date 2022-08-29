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
                <Route exact path="/" element={<Home />} />
                <Route path="customer" element={<Customer />} />
                <Route path="item" element={<Item />} />
                <Route path="invoice" element={<Invoice />} />
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
