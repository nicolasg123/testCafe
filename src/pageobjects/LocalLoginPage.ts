import {Selector} from "testcafe";
import { getByText } from "@testing-library/testcafe";

/**
 * Login Page for apidesigner
 */
export class LocalLoginPage {

    public userNameInput = Selector('input').withAttribute('type','text')
    public passwordInput = Selector('input').withAttribute('type','password')
    public signInButton = getByText('Submit')
}