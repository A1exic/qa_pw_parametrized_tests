import { test, expect } from '@playwright/test';
import { MenuPage } from '../../src/pages/menu.page';
import { COFFEES } from '../../src/constants';

COFFEES.forEach(({ id, name, price }) => {
  test(`${name} имеет корректную цену`, async ({ page }) => {
    const menuPage = new MenuPage(page);

    await page.goto('/');
    await expect(menuPage.getCoffeePrice(id)).toHaveText(
      `$${price.toFixed(2)}`,
    );
  });
});
