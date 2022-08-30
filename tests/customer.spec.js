// @ts-check
const { test, expect } = require("@playwright/test");
const {
  customerRoute,
  customersRoute,
  customersSearchRouteEmail,
} = require("../src/test_mocks/mockPlaywright");

test.beforeEach(async ({ page }) => {
  await customerRoute(page);
  await customersRoute(page);
  await customersSearchRouteEmail(page);
});

test("test is written for add customer view page and customers list page", async ({
  page,
}) => {
  //open the home page
  await page.goto("http://localhost:3000/");

  //check title of the page
  await expect(page).toHaveTitle(/React App/);

  //fetch customer view page
  await page.locator("a", { hasText: "Customers" }).click();

  //check pagination working
  const totalPages = (await page.locator("button").count()) - 4;
  for (let i = 0; i < totalPages; i++) {
    await page.locator("button", { hasText: "Next" }).click();
  }
  for (let i = 0; i < totalPages + 1; i++) {
    await page.locator("button", { hasText: "Previous" }).click();
  }

  //check drop down based search box
  const dropdown = await page.locator("#fields");
  await dropdown.selectOption({ value: "email" });
  await page.locator("[placeholder='Search Key']").fill("test2@razorpay.com");
  await page.locator("button", { hasText: "Search Results" }).click();

  //check add customer form
  await page.locator("button", { hasText: "+ New Customer" }).click();
  await page.locator("[placeholder='name']").fill("test 8");
  await page.locator("[placeholder='email']").fill("test8@gmail.com");
  await page.locator("[placeholder='phone']").fill("9306098398");
  await page.locator("button", { hasText: "Save Customer" }).click();
});
