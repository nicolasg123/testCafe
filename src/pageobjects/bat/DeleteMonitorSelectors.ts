import { Selector, t } from 'testcafe'
import { BasicPage } from '../commons/BasicPage'
import { WaitConfig } from '../../config/WaitConfig'
import { getByText, getByPlaceholderText } from '@testing-library/testcafe'


/**
 * Apitesting Page , pageobject for design center.
 */
export class DeleteMonitorSelectors implements BasicPage {

  public functionalMonitoringLi = Selector('[data-test-id="/apitesting/ui"]')
  public deleteButton = Selector('button').withAttribute('data-test-id','delete-monitor-confirm')
  public updateMonitorButton = Selector('#appContainer span').withText('Update Monitor')
  
  public async at(): Promise<void> {
    await t.expect(this.functionalMonitoringLi.exists)
      .ok('Functional monitoring button not present', {timeout: WaitConfig.Waits.shortWait})
  }  
}
