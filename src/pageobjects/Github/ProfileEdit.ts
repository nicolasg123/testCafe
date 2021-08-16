import { getByLabelText, getByRole, getByText } from "@testing-library/testcafe";
import {Selector} from "testcafe";


/**
 * Login Page for gitHub
 */
export class ProfileEdit {

    public profile = Selector('a').withAttribute('role', 'menuitem');
    public  profileEditButton = Selector('summary').withAttribute('role','button')
}