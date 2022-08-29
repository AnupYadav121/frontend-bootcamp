import { handlers } from "../../../mocks/mockFetchSetResults";
import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { Provider } from "react-redux";
import store from "../../../store/store";
import ViewCustomers from "../ViewCustomers";
import anchors from "../../../anchors/Anchors";
import { customer1, allCustomers } from "./TestObject";

const server = new setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("view customers page test", async () => {
  render(
    <Provider store={store}>
      <ViewCustomers />
    </Provider>
  );

  //testing table header
  anchors.customerAnchor.forEach((anchorAny) => {
    expect(screen.getByText(anchorAny.header)).toBeInTheDocument();
  });

  //testing table data
  expect(await screen.findByText(customer1.name)).toBeInTheDocument();
  expect(await screen.findByText(customer1.email)).toBeInTheDocument();
  expect(await screen.findByText(customer1.phone)).toBeInTheDocument();
  expect(
    await screen.findByText(
      new Date(customer1.createdAt * 1000).toLocaleDateString()
    )
  ).toBeInTheDocument();

  //testing button of pagination
  const allButtons = await screen.findAllByRole("button");
  expect(allButtons[0]).toHaveTextContent("Previous");
  expect(allButtons[1]).toHaveTextContent("1");
  expect(allButtons[2]).toHaveTextContent("2");
  expect(allButtons[3]).toHaveTextContent("Next");
  expect(allButtons).toHaveLength(4);

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
      fireEvent.click(allButtons[3]);
    }
  });
});
