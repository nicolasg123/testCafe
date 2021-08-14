import { t } from 'testcafe'
import { ConsoleOutput } from '../config/ConsoleOutput'
import { LoginPage } from './LoginPage'


const loginPage = new LoginPage()
/**
 * Login to Github.
 *
 */
export class GitHub {

  /**
   * Logs in to GitHub
   *
   */
  public static async login(): Promise<boolean> {

    const username = 'nicolas.grossi@gmail.com'
    const password = 'nico140778NCG'
    

    ConsoleOutput.startedTestGlobal(`Logging in to github... (User: ${username})`)
    await t.click(loginPage.signInButton)
    // await t.click(loginPage.passwordInput)
    // await t.typeText(loginPage.passwordInput, password, {caretPos: 0})
    // await t.pressKey('enter')
    // await anypointLanding.at()
    // await anypointLanding.goToMonitoring()
    // await apitestingPage.at()
    ConsoleOutput.successfulTestGlobal('Logged in')
    return true
  }  
}
