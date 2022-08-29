const { test, expect } = require("@playwright/test");

test("test is written for add item view page and items list page", async ({
  page,
}) => {
  //open the home page
  await page.goto("http://localhost:3000/");

  //check title of the page
  await expect(page).toHaveTitle(/React App/);

  //check item view page
  await page.locator("a", { hasText: "Items" }).click();
  await page.locator("button", { hasText: "+ New Item" }).click();
  await page.locator("[placeholder='name']").fill("laptop");
  await page.locator("[placeholder='price']").fill("5000000");
  await page
    .locator("[placeholder='description']")
    .fill("bought from near buy shop");
  await page.locator("button", { hasText: "Save Item" }).click();
});
