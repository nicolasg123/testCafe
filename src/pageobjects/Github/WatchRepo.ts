import { getByLabelText, getByRole, getByText } from "@testing-library/testcafe";
import {Selector} from "testcafe";


/**
 * Login Page for gitHub
 */
export class WatchRepo {

    public repoName = Selector('span').withAttribute('title', 'Seleniume2e').withText('Seleniume2e')
    public watchButton = Selector('span').withAttribute('data-target','notifications-list-subscription-form.unwatchButtonCopy')
}