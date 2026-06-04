import {test,expect,Locator} from '@playwright/test';

test('Verifying the Auto suggested dropdown',async({page})=>
{
    await page.goto("https://www.google.com/");

    await page.locator("#APjFqb").fill("playwright");
    await page.waitForTimeout(2000);
});