import { expect, type Locator, type Page } from '@playwright/test';


export class AccountPage {

//declare Account page members
    readonly page: Page;
    readonly accountCreated: Locator;
    readonly continueBtn: Locator;
    

//initialize object
    constructor(page: Page) {
        this.page = page;
        this.accountCreated = page.locator("//*[contains(text(),'Account Created!')]");
        this.continueBtn = page.getByRole("link",{name:'Continue'});

    }

//Question1:Is this necessary since the appearance of this page is dependent on successful signup
    async navigateToAccountPage() {
        await this.page.goto("https://www.automationexercise.com/login");
    }

//Question2: Do we need to store assertions?
    async assertAccountCreatedMsg() {
        await expect(this.page).toHaveURL("https://www.automationexercise.com/account_created");
        await expect(this.accountCreated).toBeVisible();
    }

async completeLogin() {
        await this.continueBtn.click();
        await expect(this.page).toHaveURL("https://www.automationexercise.com");
    }
}