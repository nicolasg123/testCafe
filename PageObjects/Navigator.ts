import {LoginPage} from './LoginPage';
import {DesignCenterLandingPage} from "./DesignCenterLandingPage";
import {ProjectTypes} from "../Utils/Types/ProjectTypes";
import {EditorTypes} from "../Utils/Types/EditorTypes";
import {FragmentTypes} from "../Utils/Types/FragmentTypes";
import {Main} from "../TestMain";
import {DesignCenterPage} from "./DesignCenterPage";
import {TestUsers} from "../Utils/TestEnvironments";
import {ConsoleOutput} from '../Utils/ConsoleOutput';

const chalk = require('chalk');

const loginPage = new LoginPage();
const designCenterLandingPage = new DesignCenterLandingPage();
const designCenterPage = new DesignCenterPage();

export class Navigator {



    static async loginToAnypointPlatform() {
        let t = Main.t;

        const passKey = Main.env.toUpperCase()+"_PASSWORD";

        let username = TestUsers[Main.env];
        // @ts-ignore
        let password:string = process.env[passKey] ? process.env[passKey] : '';

        ConsoleOutput.startedTest('Logging in to anypoint platform...');
        await t
            .typeText(loginPage.passwordInput, password)
            .click(loginPage.userNameInput)
            .doubleClick(loginPage.userNameInput, {
                caretPos: 0
            })
            .typeText(loginPage.userNameInput, username, {
                caretPos: 0
            })
            .click(loginPage.signInButton)
        ConsoleOutput.successfullTest('Logged in');
        return true;
    }


    static async gotoDesignCenter() {
        let t = Main.t;
        await t.click(designCenterLandingPage.designCenterButton);
        return true;
    }


    static async createProject(testName: string, projectType: ProjectTypes, editorType: EditorTypes, fragmentType: FragmentTypes) {
        let t = Main.t;
        testName += Math.floor(Math.random() * 9999999999999 ).toString().padStart(10,"9");
        ConsoleOutput.startedTest('Creating project...');

        await t.click(designCenterPage.createButton);
        ConsoleOutput.startedTest('Selecting project type...');
        switch(projectType){
            case ProjectTypes.API_SPEC:
                await t.click(designCenterPage.createProjectModal.createApiSpecButton);
                break;
            case ProjectTypes.API_FRAGMENT:
                await t.click(designCenterPage.createProjectModal.createFragmentButton);
                if(fragmentType !== FragmentTypes.NONE){
                    await designCenterPage.createProjectModal.setFragmentType(fragmentType)
                }
                break;
        }

        switch (editorType){
            case EditorTypes.VISUAL:
                await t.click(designCenterPage.createProjectModal.checkBoxVisualEditor)
                break;
            case EditorTypes.CODE:
                await t.click(designCenterPage.createProjectModal.checkBoxCodeEditor);
                break;
        }


        await t.typeText(designCenterPage.createProjectModal.nameInput,testName)
        ConsoleOutput.startedTest('Setting project name...');

        if(projectType == ProjectTypes.API_SPEC){
            await t.click(designCenterPage.createProjectModal.confirmCreateSpecButton);
        }

        if(projectType == ProjectTypes.API_FRAGMENT){
            await t.click(designCenterPage.createProjectModal.confirmcreateFragmentButton);
        }
        ConsoleOutput.successfullTest('Project created : '+testName+' ! ');

        return;


    }
}

