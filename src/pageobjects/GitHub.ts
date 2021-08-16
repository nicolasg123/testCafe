import { t } from 'testcafe'
import { ConsoleOutput } from '../config/ConsoleOutput'
import { AddingRepo } from './AddingRepo'
import { ProfileEdit } from './Github/ProfileEdit'
import { WatchRepo } from './Github/WatchRepo'
import { LoginPage } from './LoginPage'


const loginPage = new LoginPage()
const addingRepo = new AddingRepo()
const profileEdit = new ProfileEdit()
const watchRepo = new WatchRepo()

/**
 * Login to Github.
 *
 */
export class GitHub {
  
  public static async repoWatch() : Promise<boolean> {
    const nameRepo = 'Repo';
    await t.click(watchRepo.repoName)
    await t.click(watchRepo.watchButton)
    return true
  }
  
  public static async createRepo() : Promise<boolean> {
    const nameRepo = 'Repo';
    await t.click(addingRepo.newRepoButton)
    await t.click(addingRepo.repositoryName)
    await t.typeText(addingRepo.repositoryName, nameRepo, {caretPos: 0})
    await t.click(addingRepo.createRepoButton)
    return true
  }

  public static async profileEdit() : Promise<boolean> {
    await t.click(profileEdit.profileEdit)
    await t.click(profileEdit.yourProfile)
    return true
  }

  /**
   * Logs in to GitHub
   *
   */
  public static async login(): Promise<boolean> {

    const username = 'nicolas.grossi@gmail.com'
    const password = 'nico140778NCG'
    

    ConsoleOutput.startedTestGlobal(`Logging in to github... (User: ${username})`)
    await t.click(loginPage.signInButton)
    await t.click(loginPage.userNameInput)
    await t.typeText(loginPage.userNameInput, username, {caretPos: 0})
    await t.click(loginPage.passwordInput)
    await t.typeText(loginPage.passwordInput, password, {caretPos: 0})
    await t.click(loginPage.loginButton)
    ConsoleOutput.successfulTestGlobal('Logged in')
    return true
  }  
}
