import { test, expect, Locator } from "@playwright/test";

test("Verify getByTestId() Locators", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/tests/app.html");

    console.log("Performing 1st Asserion:");
    await expect(page.getByTestId("profile-name")).toHaveText("John Doe");
    console.log("Its done");
    console.log("Performing 2nd Asserion:");
    await expect(page.getByTestId("profile-email")).toHaveText("john.doe@example.com");
    console.log("Its done");
    /* console.log("Performing 3rd Asserion:");
    await expect(page.getByTestId("product-name")).toHaveText("Product A");
    console.log("Its done");
    console.log("Performing 4th Asserion:");
    await expect(page.getByTestId("product-price")).toHaveText("$19.99");
    console.log("Its done");
    console.log("Performing 5th Asserion:");
    await expect(page.getByTestId("product-name")).toHaveText("Product B");
    console.log("Its done");
    console.log("Performing 6th Asserion:");
    await expect(page.getByTestId("product-price")).toHaveText("$29.99");
    console.log("Its done");
    console.log("Performing 7th Asserion:");
    await expect(page.getByTestId("product-name")).toHaveText("Product C");
    console.log("Its done");
    console.log("Performing 8th Asserion:");
    await expect(page.getByTestId("product-price")).toHaveText("$39.99");
    console.log("Its done"); */
    console.log("Performing 9th Asserion:");
    await page.getByTestId("nav-home").click();
    console.log("Its done");
    console.log("Performing 10th Asserion:");
    await page.getByTestId("nav-products").click();
    console.log("Its done");
    console.log("Performing 11th Asserion:");
    await page.getByTestId("nav-contact").click();
    console.log("Its done");
    console.log("Performing 12th Asserion:");
    await page.getByTestId("edit-profile-btn").click();
    console.log("Its done");




});