import {Selector} from "testcafe";
import {FragmentTypes} from "../Utils/Types/FragmentTypes";
import {Main} from "../TestMain";

export class DesignCenterPage{

    createProjectModal = new CreateProjectModal();
    createButton = Selector('#projects-create-configuration');

}

export class CreateProjectModal{
    createApiSpecButton = Selector('[data-test-id="create-button-api-specification"]');
    createFragmentButton = Selector('[data-test-id="create-button-api-fragment"]');
    nameInput = Selector('[data-test-id="project-name-input"]').filterVisible();
    checkBoxCodeEditor = Selector('label').withText('Code editor');
    checkBoxVisualEditor = Selector('label').withText('Visual editor');

    confirmCreateSpecButton = Selector('span').withText('Create Specification');
    confirmcreateFragmentButton = Selector('span').withText('Create Fragment');

    async setFragmentType(fragmentType: FragmentTypes) {
        let t = Main.t;

    }
}
