import { test, expect, Locator } from '@playwright/test';

test('Verifying the dropdown - Part2', async ({ page }) => {
    await page.goto("https://www.bstackdemo.com/");
    const dropdown01 = page.locator("div.sort>select");
    await expect(dropdown01).toBeVisible();
    await expect(dropdown01).toBeEnabled();

    await dropdown01.selectOption('Lowest to highest');

    const name:Locator=page.locator("p.shelf-item__title");
    const price:Locator=page.locator('div.val');

    console.log("Name of the elements:",await name.allInnerTexts());
});