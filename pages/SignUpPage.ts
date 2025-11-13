import { expect, type Locator, type Page } from '@playwright/test';

export class Signup {


    //New Signup Form
    readonly page: Page;
    readonly signUpLabel: Locator;
    readonly signUpName: Locator;
    readonly signUpEmail: Locator;
    readonly signUpBtn: Locator;

    //Account Info section in the sign up page
    readonly accountInfoLabel: Locator;
    readonly mrRadioBtn: Locator;
    readonly mrsRadioBtn: Locator;
    readonly name: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly date: Locator;
    readonly month: Locator;
    readonly year: Locator;
    readonly newsletter: Locator;
    readonly offers: Locator;

    //Address Info sesction in the sign up page
    readonly addressInfoLabel: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly company: Locator;
    readonly addressOne: Locator;
    readonly addressTwo: Locator;
    readonly country: Locator;
    readonly state: Locator;
    readonly city: Locator;
    readonly zipCode: Locator;
    readonly mobileNumber: Locator;
    readonly createAccountBtn: Locator;

    //initialize object 
    constructor(page: Page) {
        this.page = page;
        this.signUpLabel = page.getByText("New User Signup!");
        this.signUpName = page.locator("//*[contains(text(),'New User Signup!')]//following::input[@placeholder='Name']");
        this.signUpEmail = page.locator("//*[contains(text(),'New User Signup!')]//following::input[@placeholder='Email Address']")
        this.signUpBtn = page.getByRole("button", { name: "Signup" });
        this.accountInfoLabel = page.getByText("Enter Account Information");
        this.addressInfoLabel = page.getByText("Address Information");
        this.mrRadioBtn = page.getByRole("radio", { name: "Mr." });
        this.mrsRadioBtn = page.getByRole("radio", { name: "Mrs." });
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
        this.createAccountBtn = page.getByRole("button", { name: "Create Account" });
    }

    /*New Sign Up Form*/
    async navigateToSignUpPage() {
        await this.page.goto("https://www.automationexercise.com/signup");
        
    }

    async enterSignUpDetails(name: string, email: string) {
        await this.signUpName.fill(name);
        await this.signUpEmail.fill(email);
        await this.signUpBtn.click();
    }

    /*
    ENTER ACCOUNT INFORMATION
    */

    async inputAccountInfo(
        title: "Mr" | "Mrs",
        password:string,
        date: string, 
        month: string, 
        year: string,
        newsletter: boolean,
        offers: boolean,
    ) {

        //select Title
        if (title === "Mr") {
            await this.mrRadioBtn.check();
        }
        else {
            await this.mrsRadioBtn.check();
        }

        //verify name captured
        await expect(this.name).not.toBeEmpty();

        //verify name captured
        await expect(this.email).not.toBeEmpty();

        //enter password
        await this.password.fill(password);

        //select DOB
        await this.date.selectOption(date);
        await this.month.selectOption(month);
        await this.year.selectOption(year);

        //Sign up for our newsletter
        if(newsletter){
            await this.newsletter.check();
        }
        else{
            await this.newsletter.uncheck();
        }

        //Receive special offers from our partners!
        if(offers){
            await this.offers.check();
        }
        else{
            await this.offers.uncheck();
        }
    }

    /*
    ENTER ADDRESS INFORMATION
    */
    async inputAddressInfo(
        firstName: string,
        lastName: string,
        company: string,
        address: string,
        addressTwo: string,
        country: string,
        state: string,
        city: string,
        zipcode: string,
        mobileNumber: string) {

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

    async createAccount(page: Page) {
        await this.createAccountBtn.click();
        await expect(page).toHaveURL("https://www.automationexercise.com/account_created");
        const account = page.locator("//*[contains(text(),'Account Created!')]");
        await expect(account).toContainText("Account Created!");
    }
}