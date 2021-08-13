import { Selector, t } from 'testcafe'
import { BasicPage } from '../commons/BasicPage'
import { WaitConfig } from '../../config/WaitConfig'

/**
 * Apitesting Page , pageobject for design center.
 */
export class OptInOptOutDialog implements BasicPage {

  public functionalMonitoringLi = Selector('[data-test-id="/apitesting/ui"]')
  public tryNewLayout = Selector('span').withText('Try new layout').nth(1)
  

  public async at(): Promise<void> {
    await t.expect(this.functionalMonitoringLi.exists)
      .ok('Functional monitoring button not present', {timeout: WaitConfig.Waits.shortWait})
  }
}


