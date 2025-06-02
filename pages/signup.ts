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

/*
ENTER ACCOUNT INFORMATION
*/

//select Title
async selectTitle(title: "Mr" | "Mrs"){
   if (title === "Mr"){
       await this.mrRadioBtn.check();
    }
    else{
       await this.mrsRadioBtn.check();
    }
}

//validate name has been captured from sign up form
async isNameCaptured(){
    await expect (this.name).not.toBeEmpty();
}

//validate name has been captured from sign up form
async isEmailCaptured(){
    await expect (this.email).not.toBeEmpty();
}

//input password
async enterPassword(password:string){
    await this.password.fill(password);
}

//select DOB
async selectDateOfBirth(date:string,month:string,year:string){
    await this.date.selectOption(date);
    await this.month.selectOption(month);
    await this.date.selectOption(year);
}

//Sign up for our newsletter!
async signUpNewsletter(){
    await this.newsletter.check();
}

//Receive special offers from our partners!
async receiveOffers(){
    await this.offers.check();
}

/*
ADDRESS INFORMATION
*/
async inputAddressInformation(
    firstName:string, 
    lastName:string, 
    company:string, 
    address:string, 
    addressTwo:string, 
    country:string,
    state:string,
    city:string,
    zipcode:string,
    mobileNumber:string){

    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.company.fill(company);
    await this.addressOne.fill(address);
    await this.addressTwo.fill(addressTwo);
    await this.country.selectOption(country);
    await this.state.fill(state);
    await this.city.fill(city);
    await this.zipCode.fill(zipcode);
    await this.mobileNumber.fill(mobileNumber);
}

async createAccount(page:Page){
    await this.createAccountBtn.click();
    await expect (page).toHaveURL("https://www.automationexercise.com/account_created");
    const account = page.locator("//*[contains(text(),'Account Created!')]")
    await expect (account).toContainText("Account Created!'");
}
}