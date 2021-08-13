import { Selector, t } from 'testcafe'
import { BasicPage } from '../commons/BasicPage'
import { WaitConfig } from '../../config/WaitConfig'
import { getByText, getByPlaceholderText } from '@testing-library/testcafe'


/**
 * Apitesting Page , pageobject for design center.
 */
export class EditMonitorSelectors implements BasicPage {

  public functionalMonitoringLi = Selector('[data-test-id="/apitesting/ui"]')
  public nextButton = Selector('button').withAttribute('data-test-id','next-setup')
  public nextEndpoints = Selector('button').withAttribute('data-test-id','next-endpoints')
  public updateMonitorButton = Selector('#appContainer span').withText('Update Monitor')
  public codeEditorButton = Selector ('span').
                            withAttribute('data-test-id','switch-editor-type-button-label').
                            withText('Switch to code view')
  public createMonitorButton = Selector('button').withAttribute('data-test-id','create-monitor-reporters')
  
  
  public async at(): Promise<void> {
    await t.expect(this.functionalMonitoringLi.exists)
      .ok('Functional monitoring button not present', {timeout: WaitConfig.Waits.shortWait})
  }  
}
