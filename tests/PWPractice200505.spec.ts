import { test, expect, Locator } from "@playwright/test";

test("Verify getByPlaceholder() Locators", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/tests/app.html");

    console.log("Performing 1st Asserion:");
    await page.getByPlaceholder("Enter your full name").fill("SB Davis");
    console.log("Its done");
    console.log("Performing 2nd Asserion:");
    await page.getByLabel("Phone number (xxx-xxx-xxxx)").fill("9461234567");
    console.log("Its done");
    console.log("Performing 3rd Asserion:");
    await page.getByLabel("Type your message here...").fill("Hello, this is Playwright automation");
    console.log("Its done");
    console.log("Performing 4th Asserion:");
    await page.getByLabel("Search products...").fill("Books");
    console.log("Its done");
    console.log("Performing 5th Asserion:");
    await page.getByLabel(" Standard").click();
    console.log("Its done");
    

});