import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {

//declare Account page members
    readonly page: Page;
    readonly logoutLink: Locator;
    readonly deleteAccountLink:Locator;
    readonly loggedInUser: Locator;


//initialize object
    constructor(page: Page) {
        this.page = page;
        this.logoutLink = page.getByRole("link",{name:' Logout'});
        this.deleteAccountLink = page.getByRole("link", {name:' Delete Account'});
        this.loggedInUser = page.locator("//a[contains(text(), 'Logged in as')]/b");

    }

    async navigateToHomePage() {
        await this.page.goto("https://www.automationexercise.com/");
    }

    async login(user:string){
        await expect(this.loggedInUser).toHaveText(`Logged in as ${user}`);
    }

}

