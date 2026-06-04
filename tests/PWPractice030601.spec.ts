import { test, expect, Locator } from '@playwright/test';

test('Verifying the dropdown - Part2', async ({ page }) => {
    await page.goto("https://www.bstackdemo.com/");
    const dropdown01 = page.locator("div.sort>select");
    await expect(dropdown01).toBeVisible();
    await expect(dropdown01).toBeEnabled();

    await dropdown01.selectOption('Lowest to highest');

    const name: Locator = page.locator("p.shelf-item__title");
    const price: Locator = page.locator('div.val');

    console.log("The name of all the elements:", await name.allInnerTexts());
    console.log("The price of all the elements:", await price.allTextContents());

    const nameString: string[] = await name.allTextContents();
    const priceString: Array<string> = await price.allInnerTexts();

    console.log("The name of all the elements:", nameString);
    console.log("The price of all the elements:", priceString);

    expect(nameString.length).toBe(priceString.length);

    for (let i = 0; i < priceString.length; i++) {
        console.log(`${nameString[i]} : ${priceString[i]}`);
    }


});