import { getByLabelText, getByRole, getByText } from "@testing-library/testcafe";
import {Selector} from "testcafe";


/**
 * Login Page for gitHub
 */
export class WatchRepo {

    public repoName = Selector('span').withText('Seleniume2e')
    public watchButton = Selector('span').withAttribute('data-target','notifications-list-subscription-form.unwatchButtonCopy')
}