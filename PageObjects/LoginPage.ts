import {Selector} from "testcafe";

export class LoginPage{

    userNameInput = Selector('[data-test-id="SignIn-Username"][name="username"]');
    passwordInput = Selector('[data-test-id="SignIn-Password"][name="password"]');
    signInButton = Selector('span').withText('Sign in');



}
