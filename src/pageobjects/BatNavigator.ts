import { t } from 'testcafe'
import { Main } from '../config/TestMain'
import { ConsoleOutput } from '../config/ConsoleOutput'
import { Credentials } from '../config/Credentials'
import { AnypointLandingPage } from './Github/AnypointLandingPage'
import { ApiTestingPage } from './Github/ApiTestingPage'
import { LoginPage } from './LoginPage'
import { LocalLoginPage } from './LocalLoginPage'
import { OptInOptOutDialog } from './Github/OptInOptOutDialog'

const localLoginPage = new LocalLoginPage()
const loginPage = new LoginPage()
const apitestingPage = new ApiTestingPage()
const anypointLanding = new AnypointLandingPage()
const optInOptOut = new OptInOptOutDialog()

/**
 * Navigator is used to navigate to and from pages in bat.
 *
 */
export class BatNavigator {

  /**
   * Logs in to the anypoint platform using the environment variables
   *
   */
  public static async loginAndGoToMonitoring(): Promise<boolean> {

    const username = Credentials.userName
    const password = Credentials.getPasswordForEnvironment(Main.env)
    

    ConsoleOutput.startedTestGlobal(`Logging in to anypoint platform... (User: ${username})`)
    await t.click(loginPage.userNameInput).typeText(loginPage.userNameInput, username)
    await t.click(loginPage.passwordInput)
    await t.typeText(loginPage.passwordInput, password, {caretPos: 0})
    await t.pressKey('enter')
    await anypointLanding.at()
    await anypointLanding.goToMonitoring()
    await apitestingPage.at()
    ConsoleOutput.successfulTestGlobal('Logged in')
    return true
  }
  
  public static async loginAndGoToMonitoringNewUI(): Promise<boolean> {

    const username = Credentials.userName
    const password = Credentials.getPasswordForEnvironment(Main.env)

    ConsoleOutput.startedTestGlobal(`Logging in to anypoint platform... (User: ${username})`)
    await t.click(loginPage.userNameInput).typeText(loginPage.userNameInput, username)
    await t.click(loginPage.passwordInput)
    await t.typeText(loginPage.passwordInput, password, {caretPos: 0})
    await t.pressKey('enter')
    await anypointLanding.at()   
    await anypointLanding.goToMonitoring()
    await apitestingPage.at()
    ConsoleOutput.successfulTestGlobal('Logged in')
    return true
  }
  public static async loginNewUILocally(): Promise<boolean> {

    const username = Credentials.userName
    const password = Credentials.getPasswordForEnvironment(Main.env)
    let domain  = 'http://localhost:3000' 

    ConsoleOutput.startedTestGlobal(`Logging in to anypoint platform... (User: ${username})`)
    await t.click(localLoginPage.userNameInput)
    await t.typeText(localLoginPage.userNameInput, username)
    await t.click(localLoginPage.passwordInput)
    await t.typeText(localLoginPage.passwordInput, password, {caretPos: 0})
    await t.click(localLoginPage.signInButton)
    await t.click(optInOptOut.tryNewLayout)
    ConsoleOutput.successfulTestGlobal('Logged in')
    return true
  }
}
