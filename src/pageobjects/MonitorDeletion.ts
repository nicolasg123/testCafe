import { t, Selector } from 'testcafe'
import { WaitConfig } from '../config/WaitConfig'
import { ApiTestingPage } from './bat/ApiTestingPage'

const apiTestingPage = new ApiTestingPage()

/**
 * Navigator is used to navigate to and from pages in bat.
 *
 */
export class MonitorDeletion {
  
  
  public static async deleteMonitor() : Promise <Boolean> {
      await t.expect(apiTestingPage.deleteMonitorButton.exists).ok('Delete Monitor button not found', {timeout: WaitConfig.Waits.minWait})
      await t.click(apiTestingPage.deleteMonitorButton)
      await t.expect(apiTestingPage.deleteMonitorConfirmButton.exists).ok('Delete Monitor Confirm button not found', {timeout: WaitConfig.Waits.minWait})
      await t.expect(apiTestingPage.deleteMonitorCancelButton.exists).ok('Delete Monitor Cancel button not found', {timeout: WaitConfig.Waits.minWait})
      await t.click(Selector('div').withExactText('Delete monitor'))
      await t.click(apiTestingPage.deleteMonitorConfirmButton)
      await t.expect(apiTestingPage.scheduleTestMessage.exists).ok('Redirection after delete monitor failed', {timeout: WaitConfig.Waits.minWait})
      return true
  }
}
