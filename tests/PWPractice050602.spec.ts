import { test, expect, Locator } from '@playwright/test';

test('Verifying auto-suggested dropdown of Amazon', async ({ page }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

  await page.locator("input[placeholder='Username']").fill('Admin');
  await page.locator("input[placeholder='Password']").fill('admin123');
  await page.locator("button[type='submit']").click();

  await page.getByText('PIM').click();
  await page.waitForTimeout(3000);

  await page.locator("form i").nth(2).click();
  await page.waitForTimeout(3000);

  const options: Locator = page.locator("div[role='listbox']");
  await expect(options).toBeVisible({ timeout: 5000 });
  const count = await options.count();
  for (let i = 0; i < count; i++) {
    const optionLocator = options.nth(i);
    const text = await optionLocator.innerText();
    console.log(text);
  }

  for (let i = 0; i < count; i++) {
    const text = await options.nth(i).innerText();
    if (text === 'Automaton Tester') {
      await options.nth(i).click();
      break;
    }

  }

  await page.waitForTimeout(5000);

});