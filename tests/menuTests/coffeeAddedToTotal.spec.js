import { test, expect } from '@playwright/test';
import { MenuPage } from '../../src/pages/menu.page';
import { COFFEES } from '../../src/constants';

COFFEES.forEach(({ id, name, price }) => {
  test(`${name} добавляется в итоговую сумму`, async ({ page }) => {
    const menuPage = new MenuPage(page);

    await page.goto('/');
    await menuPage.addCoffeeToCart(id);

    await expect(page.locator('[data-test="total"]')).toHaveText(
      `$${price.toFixed(2)}`,
    );
  });
});
