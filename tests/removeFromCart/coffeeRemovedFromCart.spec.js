import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';
import { COFFEES } from '../../src/constants';

COFFEES.forEach(({ name }) => {
  test(`${name} can be removed from cart`, async ({ page }) => {
    const menuPage = new MenuPage(page);
    const cartPage = new CartPage(page);

    await menuPage.open();
    await menuPage.clickCoffeeCup(name);
    await menuPage.clickCartLink();

    await cartPage.removeAllCoffee(name);
    await cartPage.assertCoffeeItemIsHidden(name);
  });
});
