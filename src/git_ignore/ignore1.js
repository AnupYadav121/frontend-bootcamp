// const handlers = [getCustomersResponse];

// const server = new setupServer(...handlers);

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// test("it should have the correct customer name", async () => {
//   render(
//     <Provider store={store}>
//       <ViewCustomers />
//     </Provider>
//   );
//   const ViewCustomersList = await screen.findByText("Anup Yadav");
//   expect(ViewCustomersList).toBeVisible();
// });

// import { screen, render } from "@testing-library/react";
// import Customer from "./Customer";
// import "@testing-library/jest-dom";
// import { rest } from "msw";
// import { setupServer } from "msw/node";
// import { Provider } from "react-redux";
// import store from "../../store/store";

// const handlers = [postCustomerResponse];

// const server = new setupServer(...handlers);

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// test("it should have the correct customer name", async () => {
//   render(
//     <Provider store={store}>
//       <Customer />
//     </Provider>
//   );
//   const ViewCustomerName = await screen.findByText("anup yadav");
//   expect(ViewCustomerName).toBeVisible();
// });

// expect(
//   // await screen.findByText("anupyadav@razorpay.com")
//   screen.getByRole("cell", { name: /anupyadav@razorpay.com/i })
// ).toBeInTheDocument();

// const row = await screen.findByRole("row", {
//   name: /Anup Yadav New anupyadav@razorpay\.com 9306098399 22\/08\/2022/i,
// });

// within(row).getByRole("cell", {
//   name: /anupyadav@razorpay\.com/i,
// });
