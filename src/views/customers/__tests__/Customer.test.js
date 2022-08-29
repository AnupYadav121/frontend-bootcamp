import { handlers } from "../../../test_mocks/mockFetchSetResults";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { Provider } from "react-redux";
import store from "../../../store/store";
import Customer from "../Customer";
import anchors from "../../../anchors/Anchors";
import { customer1, allCustomers } from "../../../test_mocks/TestObject";

const server = new setupServer(...handlers);

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

test("main customer page view test", async () => {
  render(
    <Provider store={store}>
      <Customer />
    </Provider>
  );

  expect(await screen.findByText("Customers")).toBeInTheDocument();

  expect(screen.getByRole("table")).toBeInTheDocument();

  const newCustomerAddButton = screen.getByRole("button", {
    name: "+ New Customer",
  });
  expect(newCustomerAddButton).toBeInTheDocument();
  fireEvent.click(newCustomerAddButton);

  const saveCustomerButton = screen.getByRole("button", {
    name: "Save Customer",
  });
  expect(saveCustomerButton).toBeInTheDocument();
  fireEvent.click(saveCustomerButton);

  expect(screen.getByRole("table")).toBeInTheDocument();

  expect(await screen.findByText("test4")).toBeInTheDocument();

  const allButtons = await screen.findAllByRole("button");
  expect(allButtons[0]).toHaveTextContent("+ New Customer");
  expect(allButtons[1]).toHaveTextContent("Search Results");
  expect(allButtons[2]).toHaveTextContent("Previous");
  expect(allButtons[3]).toHaveTextContent("1");
  expect(allButtons[4]).toHaveTextContent("2");
  expect(allButtons[5]).toHaveTextContent("Next");
  expect(allButtons).toHaveLength(6);
});

test("search based dropdown testing on correct input", async () => {
  render(
    <Provider store={store}>
      <Customer />
    </Provider>
  );

  expect(screen.getByPlaceholderText("Search Key")).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Search Results" })
  ).toBeInTheDocument();

  //check initial select option is available
  expect(screen.getByRole("option", { name: "name" }).selected).toBe(true);
  expect(screen.getAllByRole("option").length).toBe(4);
  expect(screen.getByRole("option", { name: "name" })).toBeInTheDocument();

  //check all select option values exist
  anchors.customerAnchor.forEach((anchor) => {
    userEvent.selectOptions(
      screen.getByRole("combobox"),
      screen.getByRole("option", { name: anchor.field })
    );
    expect(screen.getByRole("option", { name: anchor.field }).selected).toBe(
      true
    );
  });

  //set all dropdown select value
  userEvent.selectOptions(
    screen.getByRole("combobox"),
    screen.getByRole("option", { name: "name" })
  );
  expect(screen.getByRole("option", { name: "name" }).selected).toBe(true);
  const [searchKeyInput] = screen.getAllByRole("textbox").slice(-1);
  fireEvent.change(searchKeyInput, { target: { value: "test5" } });
  expect(searchKeyInput).toHaveValue("test5");
  fireEvent.click(screen.getByText(/Search Results/i));

  //search customer results
  expect(await screen.findByText("test5")).toBeInTheDocument();
  expect(await screen.findByText("test5@razorpay.com")).toBeInTheDocument();
  expect(await screen.findByText("9306098395")).toBeInTheDocument();
  expect(
    screen.getByText(String(new Date(1662153097 * 1000).toLocaleDateString()))
  ).toBeInTheDocument();

  const newCustomerAddButton = screen.getByRole("button", {
    name: "+ New Customer",
  });
  expect(newCustomerAddButton).toBeInTheDocument();
  fireEvent.click(newCustomerAddButton);
});

test("search based on drop down testing on incorrect input", async () => {
  render(
    <Provider store={store}>
      <Customer />
    </Provider>
  );

  expect(await screen.findByText(customer1.name)).toBeInTheDocument();

  expect(screen.getByRole("option", { name: "name" }).selected).toBe(true);
  const [searchKeyInput] = screen.getAllByRole("textbox").slice(-1);
  fireEvent.change(searchKeyInput, { target: { value: "wrong input" } });
  expect(searchKeyInput).toHaveValue("wrong input");
  fireEvent.click(screen.getByText(/Search Results/i));

  await waitFor(() => expect(screen.getAllByRole("row")).toHaveLength(1));

  expect(screen.queryByText("test4")).not.toBeInTheDocument();
  expect(screen.queryByText("test4@razorpay.com")).not.toBeInTheDocument();
  expect(screen.queryByText("9306098394")).not.toBeInTheDocument();
  expect(
    screen.queryByText(String(new Date(1661153097 * 1000).toLocaleDateString()))
  ).not.toBeInTheDocument();
});

test("search based on drop down testing on blank input", async () => {
  render(
    <Provider store={store}>
      <Customer />
    </Provider>
  );

  expect(await screen.findByText("test4")).toBeInTheDocument();

  const allButtons = await screen.findAllByRole("button");
  var start = 0;
  allCustomers.forEach((customer) => {
    expect(screen.getAllByText(customer.name)[0]).toBeInTheDocument();
    expect(screen.getAllByText(customer.email)[0]).toBeInTheDocument();
    expect(screen.getAllByText(customer.phone)[0]).toBeInTheDocument();
    expect(
      screen.getAllByText(
        new Date(customer.createdAt * 1000).toLocaleDateString()
      )[0]
    ).toBeInTheDocument();
    start += 1;
    if (start % 4 === 0) {
      fireEvent.click(allButtons[5]);
    }
  });
});
