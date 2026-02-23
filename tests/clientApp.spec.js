const{test , expect} = require('@playwright/test');

test('pratice',async({browser})=>
{

const context = await browser.newContext();
const page = await context.newPage();

await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await page.locator('#userEmail').fill("kimigpgeorge@gmail.com");
await page.locator('#userPassword').fill("Kimjew@1993");
await page.locator('#login').click();
await page.locator(".card-body b").first().waitFor();
//await page.waitForLoadState("networkidle")
const titles = await page.locator(".card-body b").allTextContents();
console.log(titles);



}); 