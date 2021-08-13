import { t } from 'testcafe'
import { MonitorDetailPageSelector } from './Github/MonitorDetailPageSelector'
import { WaitConfig } from '../config/WaitConfig'
import { MonitorExecutionDetailPageSelectors } from './Github/MonitorExecutionDetailPageSelectors'


const monitorDetailPageSelector = new MonitorDetailPageSelector()
const monitorExecutionDetailPageSelectors = new MonitorExecutionDetailPageSelectors()


/**
 * Navigator is used to navigate to and from pages in bat.
 *
 */
export class MonitorExecutionDetailPage {

  public static async checkLanding() : Promise<boolean> {
   await t.wait(WaitConfig.Waits.minWait) 
   await t.click(monitorDetailPageSelector.simpleExecutionDiv)
   await t.wait(WaitConfig.Waits.minWait)
   await t.expect(monitorExecutionDetailPageSelectors.executionDetailContainer.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
   await t.expect(monitorExecutionDetailPageSelectors.arrowDown.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
   await t.click(monitorExecutionDetailPageSelectors.arrowDown)
   await t.expect(monitorExecutionDetailPageSelectors.spanAssertions.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
   await t.expect(monitorExecutionDetailPageSelectors.goBackButton.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
   await t.expect(monitorExecutionDetailPageSelectors.monitorHistoryHeader.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
   await t.expect(monitorExecutionDetailPageSelectors.executionDetails.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
   await t.expect(monitorExecutionDetailPageSelectors.executionDetails.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
   await t.expect(monitorExecutionDetailPageSelectors.passed.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
   return true
  }
  public static async returnToPreviousPage() : Promise<boolean> {
    await t.click(monitorExecutionDetailPageSelectors.goBackButton)
    return true
   }
}