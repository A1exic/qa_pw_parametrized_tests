const { expect } = require('@playwright/test');

export class MenuPage {
  constructor(page) {
    this.page = page;

    this.cartLink = page.getByLabel('Cart page');
    this.totalCheckout = page.getByTestId('checkout');

    this.promoMessage = page.getByText(
      "It's your lucky day! Get an extra cup of Mocha for $4.",
    );
    this.yesPromoButton = page.getByRole('button', { name: 'Yes, of course!' });
    this.noPromoButton = page.getByRole('button', { name: "Nah, I'll skip." });
  }

  coffeeCup(coffeeName) {
    return this.page.getByTestId(coffeeName);
  }

  coffeeCupCost(coffeeName) {
    return this.page
      .getByRole('listitem')
      .filter({ has: this.coffeeCup(coffeeName) });
  }

  async open() {
    await this.page.goto('/');
  }

  async clickCoffeeCup(coffeeName) {
    await this.coffeeCup(coffeeName).click();
  }

  async clickCartLink() {
    await this.cartLink.click();
  }

  async clickYesPromoButton() {
    await this.yesPromoButton.click();
  }

  async clickNoPromoButton() {
    await this.noPromoButton.click();
  }

  async assertTotalCheckoutContainsValue(value) {
    await expect(this.totalCheckout).toContainText(value);
  }

  async assertCoffeeCupCostHasValue(coffeeName, value) {
    await expect(this.coffeeCupCost(coffeeName)).toContainText(value);
  }

  async assertPromoMessageIsVisible() {
    await expect(this.promoMessage).toBeVisible();
  }
}
