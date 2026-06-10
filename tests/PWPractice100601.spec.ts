import {test,expect, Locator} from "@playwright/test";

test('Verifying the Dynamic Table',async({page})=>{
    await page.goto("https://practice.expandtesting.com/dynamic-table");

    const table:Locator= page.locator(".table tbody");
    await expect(table).toBeVisible();

})