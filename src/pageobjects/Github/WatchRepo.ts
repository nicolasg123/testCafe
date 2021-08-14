import { getByLabelText, getByRole, getByText } from "@testing-library/testcafe";
import {Selector} from "testcafe";


/**
 * Login Page for gitHub
 */
export class WatchRepo {

    public repoName = Selector('span').withAttribute('title', 'testCafe').withText('testCafe')
    public watchButton = Selector('svg').withText('Unwatch')
}