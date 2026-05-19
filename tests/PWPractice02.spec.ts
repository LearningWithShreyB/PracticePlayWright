import {test,expect} from "@playwright/test"

test("Verify your URL",async({page})=>
{
    await page.goto("https://bookcart.azurewebsites.net/");
    let url:string=await page.url();
    console.log("URL is:",url);
    await expect(page).toHaveURL("https://bookcart.azurewebsites.net/")
})