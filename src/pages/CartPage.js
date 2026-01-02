const { expect } = require('@playwright/test');

export class CartPage {
  constructor(page) {
    this.page = page;

    this.cartList = page.getByRole('list').nth(1);
    this.notCoffeeMessage = page.getByText('No coffee, go add some.');
    this.totalCheckout = page.getByTestId('checkout');
  }

  cartItem(name) {
    return this.cartList.getByRole('listitem').filter({ hasText: name });
  }

  cartItemName(name) {
    return this.cartItem(name).locator('div').nth(0);
  }

  cartItemUnit(name) {
    return this.cartItem(name).locator('div').nth(1);
  }

  cartItemTotalCost(name) {
    return this.cartItem(name).locator('div').nth(3);
  }

  removeAllButton(name) {
    return this.page.getByLabel(`Remove all ${name}`);
  }

  removeOneButton(name) {
    return this.page.getByRole('button', {
      name: `Remove one ${name}`,
    });
  }

  addOneButton(name) {
    return this.page.getByRole('button', {
      name: `Add one ${name}`,
    });
  }

  async open() {
    await this.page.goto('/cart');
  }

  async removeAllCoffee(name) {
    await this.removeAllButton(name).click();
  }

  async removeOneCoffee(name) {
    await this.removeOneButton(name).click();
  }

  async addOneCoffee(name) {
    await this.addOneButton(name).click();
  }

  async assertCoffeeItemIsVisible(name) {
    await expect(this.cartItem(name)).toBeVisible();
  }

  async assertCoffeeItemIsHidden(name) {
    await expect(this.cartItem(name)).toBeHidden();
  }

  async assertCoffeeNameIsCorrect(name) {
    await expect(this.cartItemName(name)).toContainText(name);
  }

  async assertCoffeeUnitContainsText(name, text) {
    await expect(this.cartItemUnit(name)).toContainText(text);
  }

  async assertCoffeeTotalCostContainsText(name, text) {
    await expect(this.cartItemTotalCost(name)).toContainText(text);
  }

  async assertNoCoffeeMessageIsVisible() {
    await expect(this.notCoffeeMessage).toBeVisible();
  }

  async assertTotalCheckoutContainsValue(value) {
    await expect(this.totalCheckout).toContainText(value);
  }
}
