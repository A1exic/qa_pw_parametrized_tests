import { test, expect } from '@playwright/test';
import { MenuPage } from '../../src/pages/menu.page';
import { CartPage } from '../../src/pages/cart.page';
import { COFFEES } from '../../src/constants';

COFFEES.forEach(({ id, name }) => {
  test(`${name} удаляется из корзины`, async ({ page }) => {
    const menuPage = new MenuPage(page);
    const cartPage = new CartPage(page);

    await page.goto('/');
    await menuPage.addCoffeeToCart(id);
    await cartPage.removeCoffee(id);

    await expect(cartPage.cartItem(id)).toHaveCount(0);
  });
});
