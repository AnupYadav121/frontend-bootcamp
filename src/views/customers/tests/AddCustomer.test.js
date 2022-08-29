import { handlers } from "../../../mocks/mockFetchSetResults";
import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { Provider } from "react-redux";
import store from "../../../store/store";
import AddCustomer from "../AddCustomer";
import { inputs } from "../../../anchors/Inputs";

const server = new setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("add customer page test", async () => {
  render(
    <Provider store={store}>
      <AddCustomer />
    </Provider>
  );

  //testing input element label and placeholder text
  inputs.forEach((input) => {
    expect(screen.getByText(input.label)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(input.placeholder)).toBeInTheDocument();
  });

  //check save customer button state (ask doubt about save customer fireEvent)
  const saveCustomerButton = screen.getByRole("button", {
    name: "Save Customer",
  });
  expect(saveCustomerButton).toBeInTheDocument();
  expect(saveCustomerButton).not.toBeDisabled();
});

test("right input form provided test", async () => {
  render(
    <Provider store={store}>
      <AddCustomer />
    </Provider>
  );

  //check input fields working
  const [nameInput, emailInput, phoneInput] = screen
    .getAllByRole("textbox")
    .slice(-3);

  fireEvent.change(nameInput, { target: { value: "test 6" } });
  expect(nameInput).toHaveValue("test 6");
  fireEvent.change(emailInput, {
    target: { value: "test6@razorpay.com" },
  });
  expect(emailInput).toHaveValue("test6@razorpay.com");
  fireEvent.change(phoneInput, { target: { value: "9306098396" } });
  expect(phoneInput).toHaveValue("9306098396");

  fireEvent.click(screen.getByText(/Save Customer/i));
});

test("wrong form input provided test on submit", async () => {
  render(
    <Provider store={store}>
      <AddCustomer />
    </Provider>
  );

  //check input fields working
  const [nameInput, emailInput, phoneInput] = screen
    .getAllByRole("textbox")
    .slice(-3);

  fireEvent.change(emailInput, {
    target: { value: "test6223" },
  });
  fireEvent.mouseOver(screen.getByText(/Save Customer/i));
  expect(
    await screen.findByText("email provided has wrong format")
  ).toBeInTheDocument();
  fireEvent.change(nameInput, {
    target: { value: "t" },
  });
  fireEvent.mouseOver(screen.getByText(/Save Customer/i));
  expect(
    await screen.findByText("name should be at-least 3 character long")
  ).toBeInTheDocument();
  fireEvent.change(phoneInput, {
    target: { value: "" },
  });
  fireEvent.mouseOver(screen.getByText(/Save Customer/i));
  expect(
    await screen.findByText("customer phone number is required")
  ).toBeInTheDocument();
});

test("wrong form input provided test on focus out", async () => {
  render(
    <Provider store={store}>
      <AddCustomer />
    </Provider>
  );

  //check input fields working
  const [nameInput, emailInput, phoneInput] = screen
    .getAllByRole("textbox")
    .slice(-3);

  fireEvent.change(emailInput, {
    target: { value: "test6@223" },
  });
  fireEvent.focusOut(emailInput);
  expect(
    await screen.findByText("email provided has wrong format")
  ).toBeInTheDocument();
  fireEvent.change(nameInput, {
    target: { value: "t" },
  });
  fireEvent.focusOut(nameInput);
  expect(
    await screen.findByText("name should be at-least 3 character long")
  ).toBeInTheDocument();
  fireEvent.change(phoneInput, {
    target: { value: "" },
  });
  fireEvent.focusOut(phoneInput);
  expect(
    await screen.findByText("customer phone number is required")
  ).toBeInTheDocument();
});
