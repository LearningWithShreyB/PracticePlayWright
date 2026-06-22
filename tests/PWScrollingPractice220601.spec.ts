import {test,expect} from '@playwright/test';

test('Automatic Scrolling_1',async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");

    const footer=page.locator(".footer-disclaimer");
    await expect(footer).toContainText('Copyright');

    const link=page.getByRole('link',{name:'nopCommerce'});
    await expect(link).toBeVisible();
    await page.waitForTimeout(2000);
    await link.click();
    const text=page.getByText('Global business');
    await expect(text).toBeVisible();
    await page.waitForTimeout(2000);
});