import { Selector, t } from 'testcafe'
import { BasicPage } from '../commons/BasicPage'
import { WaitConfig } from '../../config/WaitConfig'



/**
 * Apitesting Page , pageobject for design center.
 */
export class CopyMonitorDialogSelectors implements BasicPage {

  public functionalMonitoringLi = Selector('[data-test-id="/apitesting/ui"]')
  public NextButton = Selector('button').withAttribute('data-test-id','copy-button')
  

  public async at(): Promise<void> {
    await t.expect(this.functionalMonitoringLi.exists)
      .ok('Functional monitoring button not present', {timeout: WaitConfig.Waits.shortWait})
  }  
}
