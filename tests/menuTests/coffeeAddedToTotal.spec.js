import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { COFFEES } from '../../src/constants';

COFFEES.forEach(({ name, price }) => {
  test(`${name} is added to total`, async ({ page }) => {
    const menuPage = new MenuPage(page);

    await menuPage.open();
    await menuPage.clickCoffeeCup(name);

    await menuPage.assertTotalCheckoutContainsValue(`$${price}.00`);
  });
});
