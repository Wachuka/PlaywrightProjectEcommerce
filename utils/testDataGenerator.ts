import { faker } from "@faker-js/faker";

//define the user data/model
interface UserData{
    name: string;
    email: string;
    title: 'Mr' | 'Mrs';
    password: string;
    dob: { 
        date: string; 
        month: string; 
        year: string 
    };
    newsletter: boolean;
    offers: boolean;
    addressInfo: {
        firstName: string;
        lastName: string;
        company: string;
        addressOne: string;
        addressTwo: string;
        country: string;
        state: string;
        city: string;
        zipcode: string;
        mobileNumber: string;
    }
}

//randomly generate user data
export const generateUserData = () : UserData => {

const first_name = faker.person.firstName();
const last_name = faker.person.lastName();
const fullname = `${first_name} ${last_name}`;
const country:string[] = ["United States","India", "Canada", "Australia", "Israel", "New Zealand", "Singapore"];
const months:string[] = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    return {
        name: fullname,
        email: faker.internet.email(),
        title: faker.helpers.arrayElement(["Mr","Mrs"]),
        password: faker.internet.password(),
        dob: {
            date: String(faker.number.int({ min: 1, max: 31 })),
            month: faker.helpers.arrayElement(months),
            year: String(faker.number.int({ min: 1990, max: 2021 })),
        },
        newsletter: faker.datatype.boolean(),
        offers: faker.datatype.boolean(),
        addressInfo:{
            firstName: first_name,
            lastName: last_name,
            company: faker.company.name(),
            addressOne: faker.location.streetAddress(),
            addressTwo: faker.location.secondaryAddress(),
            country: faker.helpers.arrayElement(country),
            state: faker.location.state(),
            city: faker.location.city(),
            zipcode: faker.location.zipCode(),
            mobileNumber:faker.phone.number({style:"international"}),
        }
    }
}




