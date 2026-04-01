const { test, expect } = require("@playwright/test");

test.describe("Inventory", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("textbox", { name: "Username" }).fill("standard_user");
    await page.getByRole("textbox", { name: "Password" }).fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
    // explicit nav wait
    await page.waitForURL(/inventory/);
  });

  test("should display the products page", async ({ page }) => {
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator(".title")).toBeVisible();
    await expect(page.locator(".title")).toHaveText("Products");
  });

  test("should display 6 products", async ({ page }) => {
    const items = page.locator(".inventory_item");
    await expect(items).toHaveCount(6);
  });

  test("should add item to cart and update cart badge", async ({ page }) => {
    await page.waitForSelector(".inventory_item");
    await page.locator(".btn_inventory").first().click();
    const cartBadge = page.locator(".shopping_cart_badge");
    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toHaveText("1");
  });
});
