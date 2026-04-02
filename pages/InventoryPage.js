class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator(".title");
    this.inventoryItems = page.locator(".inventory_item");
    this.addToCartButtons = page.locator(".btn_inventory");
    this.cartBadge = page.locator(".shopping_cart_badge");
  }

  async waitForPage() {
    await this.page.waitForURL(/inventory/);
  }
}

module.exports = InventoryPage;
