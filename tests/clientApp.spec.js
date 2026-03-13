const{test , expect} = require('@playwright/test');

test('pratice',async({browser})=>
{	
	const context = await browser.newContext();
	const page = await context.newPage();

	const email = "kimigpgeorge@gmail.com";

	const productName = 'ZARA COAT 3';
	

	await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
	await page.locator('#userEmail').fill(email);
	await page.locator('#userPassword').fill("Kimjew@1993");
	await page.locator('#login').click();
	await page.waitForLoadState('networkidle');
   	await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles);
   
   //****adding product to cart***
   const count = await products.count();
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }

   //****go to cart***
 	await page.locator("[routerlink*='cart']").click();
	await page.locator("div li").first().waitFor();

 	const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
 	expect(bool).toBeTruthy();

	//****go to checkout***

	await page.locator("text= Checkout").click();

   //****select country from dropdown/ sugesstion dropdown***
	await page.locator("[placeholder*='Country']").pressSequentially("ind");
	const dropdown = page.locator(".ta-results");
	await dropdown.waitFor();

	const  optionsCount = await dropdown.locator("button").count();

   for (let i=0;i<optionsCount;++i)
   {
		const text = await dropdown.locator("button").nth(i).textContent();
		if(text === " India")
		{
			await dropdown.locator("button").nth(i).click();
			break;
		}
	
   }
   //checking email in checkout page

   expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

   await page.locator(".action__submit").click();
   	
   //****verifying order confirmation message and order id****

   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);

   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows =await page.locator('tbody tr');

   for(let i =0 ; i<await rows.count(); i++)
   {

	const rowOrderId = await rows.nth(i).locator("th").textContent();
	if(orderId.includes(rowOrderId))
	{

		await rows.nth(i).locator("button").first().click();
		break;
	}

   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();




}); 