const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");

test.describe("Login", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.visit();
  });

  // --- Happy path ---
  test("should login with valid credentials", async ({ page }) => {
    await loginPage.login(process.env.USERNAME, process.env.PASSWORD);
    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText("Products")).toBeVisible();
  });

  // --- Error handling ---
  test("should show error for invalid credentials", async ({ page }) => {
    await loginPage.login("bad_user", "bad_pass");
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
      "Username and password do not match"
    );
  });

  test("should show error when username is empty", async ({ page }) => {
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText("Username is required");
  });

  test("should show error when password is empty", async ({ page }) => {
    await loginPage.usernameInput.fill(process.env.USERNAME);
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText("Password is required");
  });

  test("should login with valid credentials after an error", async ({
    page,
  }) => {
    await loginPage.login("wrong_user", process.env.PASSWORD);
    await expect(loginPage.errorMessage).toBeVisible();
    await loginPage.usernameInput.clear();
    await loginPage.passwordInput.clear();
    await loginPage.login(process.env.USERNAME, process.env.PASSWORD);
    await expect(page).toHaveURL(/inventory/);
  });

  test("should show error for invalid password", async () => {
    await loginPage.login(process.env.USERNAME, "wrong_password");
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
      "Username and password do not match"
    );
  });

  test("should show error for invalid username", async () => {
    await loginPage.login("wrong_user", process.env.PASSWORD);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
      "Username and password do not match"
    );
  });

  test("should show error for locked account", async () => {
    await loginPage.login(process.env.LOCKED_USERNAME, process.env.PASSWORD);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
      "Sorry, this user has been locked out"
    );
  });

  // --- UI checks ---
  test("should display the login page", async ({ page }) => {
    await expect(page.locator("#user-name")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });
});
