import { test, expect, Locator } from "@playwright/test";

test("Verify getByTitle() Locators", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/tests/app.html");

    console.log("Performing 1st Asserion:");
    await expect(page.getByTitle("Home page link")).toHaveText("Home");
    console.log("Its done");
    console.log("Performing 2nd Asserion:");
    await expect(page.getByTitle("HyperText Markup Language")).toHaveText("HTML");
    console.log("Its done");
    console.log("Performing 3rd Asserion:");
    await expect(page.getByTitle("Tooltip text")).toHaveText("This text has a tooltip");
    console.log("Its done");
    console.log("Performing 4th Asserion:");
    await expect(page.getByTitle("Click to save your changes")).toHaveText("Save");
    console.log("Its done");
    

});