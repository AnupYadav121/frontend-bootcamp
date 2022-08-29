// import {
//   render,
//   screen,
//   waitForElementToBeRemoved,
//   within,
// } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import mockFetchSetResults from "../../../mocks/mockFetchSetResults";
// import Customer from "../Customer";
// import "@testing-Library/jest-dom/extend-expect";
// import { Provider } from "react-redux";
// import store from "../../../store/store";

// const axions  = {
//   ()
// }
// beforeEach(() => {
//   jest.spyOn(window, "fetch").mockImplementation(mockFetchSetResults);
// });

// afterEach(() => {
//   jest.restoreAllMocks();
// });

// test("renders the customers list page", async () => {
//   render(
//     <Provider store={store}>
//       <Customer />
//     </Provider>
//   );

//   expect(screen.getByRole("heading")).toHaveTextContent(/Customers/);
//   const allButtons = await screen.getAllByRole("button").slice(-4);
//   expect(allButtons[0]).toHaveTextContent("+ New Customer");
//   expect(allButtons[1]).toHaveTextContent("Search Results");
//   expect(allButtons[2]).toHaveTextContent("Previous");
//   expect(allButtons[3]).toHaveTextContent("Next");
//   expect(allButtons).toHaveLength(4);

//   // const c = await ;
//   await expect(screen.findByRole("table")).toBeInTheDocument();
//   expect(screen.getByText("NAME")).toBeInTheDocument();
//   expect(screen.getByText("EMAIL")).toBeInTheDocument();
//   expect(screen.getByText("PHONE")).toBeInTheDocument();
//   expect(screen.getByText("CREATED ON")).toBeInTheDocument();
// });
