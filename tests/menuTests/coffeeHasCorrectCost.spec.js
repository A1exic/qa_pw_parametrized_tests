import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { COFFEES } from '../../src/constants';

COFFEES.forEach(({ name, price }) => {
  test(`${name} has correct cost`, async ({ page }) => {
    const menuPage = new MenuPage(page);

    await menuPage.open();
    await menuPage.assertCoffeeCupCostHasValue(name, `$${price}.00`);
  });
});
