import { getByLabelText, getByRole, getByText } from "@testing-library/testcafe";
import {Selector} from "testcafe";


/**
 * Login Page for gitHub
 */
export class AddingRepo {

    public newRepoButton = Selector('a').withAttribute('class', 'btn').withText('Start a project');
    public repositoryName = Selector('input').withAttribute('id','repository_name')
    public createRepoButton = Selector('button').withAttribute('type','submit').withText('Create repository') ;
}