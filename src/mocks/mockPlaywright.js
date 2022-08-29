import { customer1, customers } from "../views/customers/tests/TestObject";

var isSaved = false;

export const customerRoute = (page) =>
  page.route("http://localhost:8080/Home/customer", (route) => {
    isSaved = true;
    route.fulfill({
      body: JSON.stringify({
        "Saved CustomerEntity Successfully": {
          id: 1,
          name: "test 8",
          email: "test8@razorpay.com",
          phone: "9306098398",
          createdAt: 1662153097,
          updatedAt: 1662153097,
        },
      }),
    });
  });

export const customersRoute = (page) =>
  page.route("http://localhost:8080/Home/customers", (route) => {
    if (isSaved === true) {
      route.fulfill({
        body: JSON.stringify({
          "fetched all customers as": customers,
        }),
      });
    } else {
      route.fulfill({
        body: JSON.stringify({
          "fetched all customers as": [customer1],
        }),
      });
    }
  });

export const customersSearchRouteEmail = (page) =>
  page.route(
    "http://localhost:8080/Home/customer/GetByEmail?email=test2@razorpay.com",
    (route) => {
      route.fulfill({
        body: JSON.stringify({
          "fetched all customers with email successfully": [
            {
              id: 1,
              name: "test2",
              email: "test2@razorpay.com",
              phone: "9306098392",
              createdAt: 1662153097,
              updatedAt: 1662153097,
            },
          ],
        }),
      });
    }
  );
