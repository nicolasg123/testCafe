import {Selector} from "testcafe";

/**
 * Login Page for apidesigner
 */
export class LoginPage {

    public userNameInput = Selector("[data-test-id=\"SignIn-Username\"]");
    public passwordInput = Selector("[data-test-id=\"SignIn-Password\"]");
    public signInButton = Selector("span").withText("Sign in");

}