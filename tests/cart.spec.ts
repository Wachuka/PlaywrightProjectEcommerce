import { test, expect } from '@playwright/test';

test("add product to cart",async({page})=>{

    //Navigate to ecommerce site
    await page.goto("https://www.automationexercise.com/products");

    //hover over the first product
    const firstProduct = page.locator('.product-image-wrapper').nth(1);
    await firstProduct.hover();

    await page.waitForTimeout(2000);

    //click the add to cart button
    const addToCart = firstProduct.locator("//a[contains(text(),'Add to cart')]").nth(1);
    await addToCart.click();
    
    await page.waitForTimeout(5000);

    //verify product has been added to cart successfully
    const cartMessage = page.locator('//*[@id="cartModal"]//div[@class = "modal-content"]');    
    await expect (cartMessage).toBeVisible();
    await expect (cartMessage).toContainText("Your product has been added to cart.");
})