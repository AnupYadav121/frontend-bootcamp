import "@testing-library/jest-dom";
import { rest } from "msw";
import { customer1, allCustomers } from "../views/customers/tests/TestObject";

const getCustomersResponse = rest.get(
  "http://localhost:8080/Home/customers",
  async (req, res, ctx) => {
    return res(
      ctx.json({
        "fetched all customers as": allCustomers,
      })
    );
  }
);

const postCustomerResponse = rest.post(
  "http://localhost:8080/Home/customer",
  async (req, res, ctx) => {
    return res(
      ctx.json({
        "Saved CustomerEntity Successfully": {
          customer1,
        },
      })
    );
  }
);

const getCustomerSearchResponse = rest.get(
  "http://localhost:8080/Home/customer/GetByName",
  async (req, res, ctx) => {
    const customerName = req.url.searchParams.get("name");
    if (customerName === "test5") {
      return res(
        ctx.json({
          "fetched all customers with name successfully": [
            {
              id: 1,
              name: "test5",
              email: "test5@razorpay.com",
              phone: "9306098395",
              createdAt: 1662153097,
              updatedAt: 1662153097,
            },
          ],
        })
      );
    } else {
      if (customerName === "") {
        return res(
          ctx.json({
            "fetched all customers with name successfully": allCustomers,
          })
        );
      } else {
        return res(
          ctx.json({
            "fetched all customers with name successfully": null,
          })
        );
      }
    }
  }
);

export const handlers = [
  postCustomerResponse,
  getCustomersResponse,
  getCustomerSearchResponse,
];

// Only for fetch api not for axios
// const getCustomersResponse = {
//   "fetched all customers as": [
//     {
//       id: 1,
//       name: "Anup Yadav",
//       email: "anupyadav@razorpay.com",
//       phone: "9306098399",
//       createdAt: 1661153097,
//       updatedAt: 1661153097,
//     },
//   ],
// };

// const saveCustomerResponse = {
//   "Saved CustomerEntity Successfully": {
//     id: 4,
//     name: "anup yadav",
//     email: "anupyadav20177@gmail.com",
//     phone: "9306098399",
//     createdAt: 1661320872,
//     updatedAt: 1661320872,
//   },
// };

// export default async function mockFetchSetResults(url) {
//   console.log('')
//   switch (url) {
//     case "http://localhost:8080/Home/customers": {
//       return {
//         ok: true,
//         status: 200,
//         data: {
//           "fetched all customers as": [
//             {
//               id: 1,
//               name: "Anup Yadav",
//               email: "anupyadav@razorpay.com",
//               phone: "9306098399",
//               createdAt: 1661153097,
//               updatedAt: 1661153097,
//             },
//           ],
//         },
//       };
//     }
//     case "http://localhost:8080/Home/customer": {
//       return {
//         ok: true,
//         status: 200,
//         data: {
//           "Saved CustomerEntity Successfully": {
//             id: 4,
//             name: "anup yadav",
//             email: "anupyadav20177@gmail.com",
//             phone: "9306098399",
//             createdAt: 1661320872,
//             updatedAt: 1661320872,
//           },
//         },
//       };
//     }
//     default: {
//       throw new Error(`Unhandled request: ${url}`);
//     }
//   }
// }
