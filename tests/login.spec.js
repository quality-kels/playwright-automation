const { test, expect } = require("@playwright/test");

test.describe("Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  // --- Happy path ---
  test("should login with valid credentials", async ({ page }) => {
    await page.getByRole("textbox", { name: "Username" }).fill("standard_user");
    await page.getByRole("textbox", { name: "Password" }).fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText("Products")).toBeVisible();
  });

  // --- Error states ---
  test("should show error for invalid credentials", async ({ page }) => {
    await page.getByRole("textbox", { name: "Username" }).fill("bad_user");
    await page.getByRole("textbox", { name: "Password" }).fill("bad_pass");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(
      page.getByText("Username and password do not match")
    ).toBeVisible();
  });

  test("should show error when username is empty", async ({ page }) => {
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Username is required")).toBeVisible();
  });

  test("should show error when password is empty", async ({ page }) => {
    await page.getByRole("textbox", { name: "Username" }).fill("standard_user");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Password is required")).toBeVisible();
  });

  // --- locator fallback (and hello XPath) ---
  test("should display the login form", async ({ page }) => {
    await expect(page.locator("#user-name")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});
