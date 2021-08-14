import { getByLabelText, getByRole, getByText } from "@testing-library/testcafe";
import {Selector} from "testcafe";


/**
 * Login Page for gitHub
 */
export class ProfileEdit {

    public profileEdit = Selector('img').withAttribute('alt', '@nicolasg123');
    public yourProfile = Selector('a').withAttribute('role','menuitem').withText('Your profile')
}