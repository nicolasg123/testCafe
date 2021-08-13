import { t } from 'testcafe'
import { WaitConfig } from '../config/WaitConfig'
import { ApiTestingPage } from './Github/ApiTestingPage'



const apiTestingPage = new ApiTestingPage()

/**
 * Navigator is used to navigate to and from pages in bat.
 *
 */
export class MonitorEditor {

  public static async edit(suiteName: string,defaultVersion: string): Promise<boolean> {
    await t.click(apiTestingPage.monitorSuiteCardContainer(suiteName))
    await t.expect(apiTestingPage.testingTab.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    await t.click(apiTestingPage.testingTab)
    await t.expect(apiTestingPage.testSuiteCard(suiteName).exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    await t.click(apiTestingPage.testSuiteCard(suiteName))
    await t.click(apiTestingPage.versionCardEdit(defaultVersion))
    await t.click(apiTestingPage.testEditUpdateButton)
    await t.expect(apiTestingPage.testingTab.exists).eql(true, {timeout: WaitConfig.Waits.mediumBaseWait})
    return true
  }
  
}
