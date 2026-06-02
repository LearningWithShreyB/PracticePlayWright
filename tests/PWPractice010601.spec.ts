import {test, expect} from '@playwright/test';

test('Performing the dropdown testing - Part01', async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    await page.locator('#country').selectOption('Japan');
    await page.waitForTimeout(1000);
    await page.locator('#country').selectOption({value:'australia'});
    await page.waitForTimeout(1000);
    await page.locator('#country').selectOption({label:'France'});
    await page.waitForTimeout(1000);
    await page.locator('#country').selectOption({index:9});
    await page.waitForTimeout(1000);

    
});