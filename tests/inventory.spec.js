const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const InventoryPage = require("../pages/InventoryPage");

test.describe("Inventory", () => {
  let loginPage;
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.visit();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.waitForPage();
  });

  test("should display the products page", async ({ page }) => {
    await expect(page).toHaveURL(/inventory/);
    await expect(inventoryPage.title).toBeVisible();
    await expect(inventoryPage.title).toHaveText("Products");
  });

  test("should display 6 products", async () => {
    await expect(inventoryPage.inventoryItems).toHaveCount(6);
  });

  test("should add item to cart and update cart badge", async () => {
    await inventoryPage.page.waitForSelector(".inventory_item");
    await inventoryPage.addToCartButtons.first().click();
    await expect(inventoryPage.cartBadge).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText("1");
  });
});
