import { t } from 'testcafe'
import { WaitConfig } from '../config/WaitConfig'
import { ApiTestingPage } from './Github/ApiTestingPage'

const apiTestingPage = new ApiTestingPage()

/**
 * Navigator is used to navigate to and from pages in bat.
 *
 */
export class MonitorHistory {

  public static async buttonCheck(suiteName: string,defaultVersion:string) : Promise<boolean> {
      await t.click(apiTestingPage.monitorSuiteCardContainer(suiteName))
      await t.expect(apiTestingPage.testingTab.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
      await t.click(apiTestingPage.testingTab)
      await t.click(apiTestingPage.monitorSuiteCardContainer(suiteName))
      await t.expect(apiTestingPage.testingTab.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
      await t.click(apiTestingPage.testingTab)
      await t.expect(apiTestingPage.versionCardHistory(defaultVersion).exists).eql(true, {timeout: WaitConfig.Waits.longShortWait})
      await t.click(apiTestingPage.versionCardHistory(defaultVersion))
      await t.expect(apiTestingPage.historyDetailsButton.exists).eql(true, {timeout: WaitConfig.Waits.longShortWait})
      await t.expect(apiTestingPage.historyStatusColumn.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
      await t.expect(apiTestingPage.historyExecuted.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
      await t.expect(apiTestingPage.historyTestDuration.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
      await t.expect(apiTestingPage.historyExecutionLocation.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
      await t.expect(apiTestingPage.historyConfiguration.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    return true
  }
  
}
