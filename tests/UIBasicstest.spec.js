const {test, expect} = require('@playwright/test');



test('Browser context Playwright test',async ({browser})=>
{

    //chrome - plugins / cookies 
   
    const context =await  browser.newContext();
    const page = await context.newPage();
     const username = page.locator('#username');
    const SignIn = page.locator('#signInBtn');
    const Cardtitles = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title);
    username.fill("rahulshetty");
    page.locator('#password').fill("Learning@830$3mK2");
    SignIn.click();
    //wait until this locator shown up
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await username.fill('');
    await username.fill("rahulshettyacademy");
    SignIn.click();
    console.log(await Cardtitles.first().textContent());
    console.log(await Cardtitles.nth(1).textContent());
    const allTittles = await Cardtitles.allTextContents();
    console.log( allTittles);


});

test('page Playwright test',async ({page})=>
{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title());
    //await expect(page).toHaveTitle("")
    page.locator('#username').fill("rahulshetty")
    page.locator('#password').fill("learning")
    page.locator('#signInBtn').click
    //wait until this locator shown up
    console.log(await page.locator("[style*='block']").textContent());


});

test('UI controls',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const dropdown = page.locator('select.form-control');
    await dropdown.selectOption('consult');
    const documentLink = page.locator("[href*='documents-request']");
    await page.locator('.radiotextsty').last().click()
    await page.locator('#okayBtn').click()
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    //await page.pause();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText")

});


test('child windows hal',async({browser})=>
{

    const context =await  browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

     const [newPage]=await Promise.all(
   [
      context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
      documentLink.click(),
   
   ])//new page is opened
   
 
   const  text = await newPage.locator(".red").textContent();
   console.log(text);
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
 
});
    







