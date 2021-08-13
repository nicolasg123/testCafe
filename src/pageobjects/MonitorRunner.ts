import { t } from 'testcafe'
import { WaitConfig } from '../config/WaitConfig'
import { ApiTestingPage } from './bat/ApiTestingPage'



const apiTestingPage = new ApiTestingPage()

/**
 * Navigator is used to navigate to and from pages in bat.
 *
 */
export class MonitorRunner {

  public static async testsActionBarCheck(): Promise<boolean> {
      await t.expect(apiTestingPage.testingTab.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
      await t.click(apiTestingPage.testingTab)
      await t.expect(apiTestingPage.testActionBarDeleteButton.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
      await t.expect(apiTestingPage.testActionBarEditButton.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
      await t.expect(apiTestingPage.testActionBarDownloadButton.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
      await t.expect(apiTestingPage.testActionBarHistoryButton.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
      await t.expect(apiTestingPage.testActionBarRunNowButton.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    return true
  }
  
}
