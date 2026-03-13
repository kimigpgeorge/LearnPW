
const{test,expect} = require('@playwright/test');

test('practice2',async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    const ProductName = 'iphone 13 pro';
    const prod = page.locator(".card-body");
    

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")

    await page.locator('#userEmail').fill("kimigpgeorge@gmail.com");
    await page.locator('#userPassword').fill("Kimjew@1993");
    await page.locator('#login').click();
    await page.locator('.card-body b').first().waitFor();

    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);

    const count = await prod.count();
    console.log(count);

    for(let i=0;i<count ;i++ )
    {
       if  (await prod.nth(i).locator("b").textContent()===ProductName)
       {
            await prod.nth(i).locator("text =  Add To Cart").click();
            break;
       }


    }


  await page.locator('[routerlink*=cart]').click()

  await page.locator('div li').first().waitFor();

  const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
  expect(bool).toBeTruthy();

  await page.locator('text=Checkout').click();

  await page.locator('[placeholder*=Country]').pressSequentially("ind");
  const dropdown = await page.locator('.ta-results');
  await dropdown.waitFor();

  const b = dropdown.locator("button");
  const optionsCount = await b.count();
  
  for(let i = 0 ;i<optionsCount;i++)
  {
      const text = await b.nth(i).textContent();
      if (text===" India")
      {
          await b.nth(i).click();
          break;

      }


  }

  await page.pause()






  



});

