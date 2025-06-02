import { expect, type Locator, type Page } from '@playwright/test';

export class Signup{

//New Signup Form
readonly page:Page;
readonly signUpName:Locator;
readonly signUpEmail:Locator;
readonly signUpBtn:Locator;

//Account Info section in the sign up page
readonly accountInfoLabel:Locator;
readonly mrRadioBtn:Locator;
readonly mrsRadioBtn:Locator;
readonly name:Locator;
readonly email:Locator;
readonly password:Locator;
readonly date:Locator;
readonly month:Locator;
readonly year:Locator;
readonly newsletter:Locator;
readonly offers:Locator;

//Address Info sesction in the sign up page
readonly addressInfoLabel:Locator;
readonly firstName:Locator;
readonly lastName:Locator;
readonly company:Locator;
readonly addressOne:Locator;
readonly addressTwo:Locator;
readonly country:Locator;
readonly state:Locator;
readonly city:Locator;
readonly zipCode:Locator;
readonly mobileNumber:Locator;
readonly createAccountBtn:Locator;

//initialize object 
constructor (page:Page){
    this.page = page;
    this.signUpName = page.locator("//*[contains(text(),'New User Signup!')]//following::input[@placeholder='Name']");
    this.signUpEmail = page.locator("//*[contains(text(),'New User Signup!')]//following::input[@placeholder='Email Address']")
    this.signUpBtn = page.getByRole("button",{name:"Signup"});
    this.accountInfoLabel = page.getByText("Enter Account Information");
    this.addressInfoLabel = page.getByText("Address Information");
    this.mrRadioBtn = page.getByRole("radio",{name:"Mr."});
    this.mrsRadioBtn = page.getByRole("radio",{name:"Mrs."});
    this.name = page.locator('//*[@id="name"]');
    this.email = page.locator('//*[@id="email"]');
    this.password = page.locator('//*[@id="password"]');
    this.date = page.locator('//*[@id="days"]');
    this.month = page.locator('//*[@id="months"]');
    this.year = page.locator('//*[@id="years"]');
    this.newsletter = page.locator('//*[@id="newsletter"]');
    this.offers = page.locator('//*[@id="optin"]');
    this.firstName = page.locator('//*[@id="first_name"]');
    this.lastName = page.locator('//*[@id="last_name"]');
    this.company = page.locator('//*[@id="company"]');
    this.addressOne = page.locator('//*[@id="address1"]');
    this.addressTwo = page.locator('//*[@id="address2"]');
    this.country = page.locator('//*[@id="country"]');
    this.state = page.locator("#state");
    this.city = page.locator("#city");
    this.zipCode = page.locator("#zipcode");
    this.mobileNumber = page.locator("#mobile_number");
    this.createAccountBtn = page.getByRole("button",{name:"Create Account"});
}

/*New Sign Up Form*/
async navigateToPage(){
    await this.page.goto("https://www.automationexercise.com/login");
}

async enterSignUpDetails(name:string,email:string){
    await this.signUpName.fill(name);
    await this.signUpEmail.fill(email);
    await this.signUpBtn.click();
}

async navigateToSignUpForm(){
    await this.page.goto("https://www.automationexercise.com/signup");
    await expect (this.page).toHaveURL("https://www.automationexercise.com/signup");
    await expect (this.accountInfoLabel).toContainText("Enter Account Information");
    await expect (this.addressInfoLabel).toContainText("Address Information");
}

//Sign up form after navigating to the sign up page
//check the gender has been selected
async selectTitle(title: "Mr" | "Mrs"){
   if (title === "Mr"){
       await this.mrRadioBtn.check();
    }
    else{
       await this.mrsRadioBtn.check();
    }
}

async selectDateOfBirth(date:string,month:string,year:string){
    await this.date.selectOption(date);
    await this.month.selectOption(month);
    await this.date.selectOption(year);
}



}