import {test,expect} from '@playwright/test';

test('Verifying Multi select dropdown', async({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.locator("#colors").selectOption(['Red','Yellow']);
    await page.waitForTimeout(1000);
    await page.locator("#colors").selectOption([{value:'green'},{value:'yellow'},{value:'white'}]);
    await page.waitForTimeout(3000);
    await page.locator("#colors").selectOption([{label:'White'},{label:'Red'}]);
    await page.waitForTimeout(3000);
    await page.locator("#colors").selectOption([{index:0},{index:1}]);
    await page.waitForTimeout(3000);

})