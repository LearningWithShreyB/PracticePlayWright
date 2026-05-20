import { test, expect, Locator } from "@playwright/test";

test("Verify getByLabel() Locators", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/tests/app.html");

    console.log("Performing 1st Asserion:");
    await page.getByLabel("Email Address:").fill("xyz@xyz.com");
    console.log("Its done");
    console.log("Performing 2nd Asserion:");
    await page.getByLabel("Password:").fill("xyz@123");
    console.log("Its done");
    console.log("Performing 3rd Asserion:");
    await page.getByLabel(" Standard").click();
    console.log("Its done");
    console.log("Performing 4th Asserion:");
    await page.getByLabel(" Express").click();
    console.log("Its done");
    console.log("Performing 5th Asserion:");
    await page.getByLabel("Age:").fill("27");
    console.log("Its done");
});