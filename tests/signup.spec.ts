import { test, expect } from '@playwright/test';
import { Signup } from '../pages/SignUpPage';
import { generateUserData } from '../utils/testDataGenerator';

test("verify new user sign up",async({page})=>{
    const signUpPage = new Signup(page);
    const user = generateUserData();
    await signUpPage.navigateToSignUpPage();
    await signUpPage.enterSignUpDetails(user.name,user.email);
    await expect(signUpPage.page).toHaveURL("https://www.automationexercise.com/signup");
    await expect(signUpPage.accountInfoLabel).toBeVisible();
    await expect(signUpPage.addressInfoLabel).toBeVisible();
    await signUpPage.inputAccountInfo(user.title,user.password,user.dob.date,user.dob.month,user.dob.year,user.newsletter,user.offers);
    await signUpPage.inputAddressInfo(user.addressInfo.firstName,user.addressInfo.lastName,user.addressInfo.company,user.addressInfo.addressOne,user.addressInfo.addressTwo,user.addressInfo.country,user.addressInfo.state,user.addressInfo.city,user.addressInfo.zipcode,user.addressInfo.mobileNumber)
    await signUpPage.createAccount(page);
});


