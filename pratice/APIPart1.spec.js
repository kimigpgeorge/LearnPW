const{test , expect,request} = require('@playwright/test');

const loginPayLoad = {userEmail: "kimigpgeorge@gmail.com", userPassword: "Kimjew@1993"}
const orderPayLoad = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
let orderId;
let token;

test.beforeAll(async ()=>
{
    //login API 
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {data:loginPayLoad})

    expect(loginResponse.ok()).toBeTruthy(); 
    const loginResponseJson = await loginResponse.json();
     token = loginResponseJson.token;  
    console.log(token);

    //order API

    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data:orderPayLoad,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    })

    
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderId = orderResponseJson.orders[0];

});

test.beforeEach(()=>
{

});


test('Place the order',async({page})=>
{	
    const orderID = creatOrder();
    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value);


    },token);

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    


    const email = "kimigpgeorge@gmail.com";
   
//     const products = page.locator(".card-body");

//     await page.locator(".card-body b").first().waitFor();
//    const titles = await page.locator(".card-body b").allTextContents();
// //    console.log(titles);
   
//    //****adding product to cart***
//    const count = await products.count();
//    for (let i = 0; i < count; ++i) {
//       if (await products.nth(i).locator("b").textContent() === productName) {
//          //add to cart
//          await products.nth(i).locator("text= Add To Cart").click();
//          break;
//       }
//    }

   //****go to cart***
//     await page.locator("[routerlink*='cart']").click();
//     await page.locator("div li").first().waitFor();

//     const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
//     expect(bool).toBeTruthy();

//     //****go to checkout***

//     await page.locator("text= Checkout").click();

//    //****select country from dropdown/ sugesstion dropdown***
//     await page.locator("[placeholder*='Country']").pressSequentially("ind");
//     const dropdown = page.locator(".ta-results");
//     await dropdown.waitFor();

//     const  optionsCount = await dropdown.locator("button").count();

//    for (let i=0;i<optionsCount;++i)
//    {
//         const text = await dropdown.locator("button").nth(i).textContent();
//         if(text === " India")
//         {
//             await dropdown.locator("button").nth(i).click();
//             break;
//         }
    
//    }
//    //checking email in checkout page

//    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

//    await page.locator(".action__submit").click();
    
//    //****verifying order confirmation message and order id****

//    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
//    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
//    console.log(orderId);

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
   await page.pause();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();




}); 