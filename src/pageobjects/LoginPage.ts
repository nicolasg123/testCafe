import {Selector} from "testcafe";

/**
 * Login Page for apidesigner
 */
export class LoginPage {

    public userNameInput = Selector('input').withAttribute('type','text');
    public passwordInput = Selector('input').withAttribute('type','password');
    public loginButton = Selector('input').withAttribute('type','submit');
    public signInButton = Selector("a").withText("Sign in");

}