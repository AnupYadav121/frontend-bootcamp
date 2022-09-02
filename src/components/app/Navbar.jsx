import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [activeDiv, setActiveDiv] = useState("");

  return (
    <div className="app-navbar">
      <nav>
        <div>
          <div
            onClick={() => setActiveDiv("home")}
            className={activeDiv === "home" ? "nav-home home-div" : "nav-home"}
          >
            <p>
              <i className="fa  fa-home"></i>
            </p>
            <Link to="/">Home</Link>
          </div>
          <div
            onClick={() => setActiveDiv("customer")}
            className={
              activeDiv === "customer"
                ? "nav-customer customer-div"
                : "nav-customer"
            }
          >
            <p>
              <i className="fa  fa-user"></i>
            </p>
            <Link to="/customers">Customers</Link>
          </div>
          <div
            onClick={() => setActiveDiv("item")}
            className={activeDiv === "item" ? "nav-item item-div" : "nav-item"}
          >
            <p>
              <i className="fa fa-star"></i>
            </p>
            <Link to="/items">Items</Link>
          </div>
          <div
            onClick={() => setActiveDiv("invoice")}
            className={
              activeDiv === "invoice"
                ? "nav-invoice invoice-div"
                : "nav-invoice"
            }
          >
            <p>
              <i className="fa fa-file"></i>{" "}
            </p>
            <Link to="/invoices">Invoices</Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
