import {test, expect} from "@playwright/test"

test("Verify your Title",async({page})=>
{
   await page.goto("https://bookcart.azurewebsites.net/");
    let titleName:string=await page.title();
    console.log("The name of the title is:",titleName);
    await expect(page).toHaveTitle("Home");
})