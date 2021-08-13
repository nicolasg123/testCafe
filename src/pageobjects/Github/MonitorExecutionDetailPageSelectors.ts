import { Selector, t } from 'testcafe'
import { BasicPage } from '../commons/BasicPage'
import { WaitConfig } from '../../config/WaitConfig'
import { ApiTestingPage } from './ApiTestingPage'

/**
 * Apitesting Page , pageobject for design center.
 */
const apiTestingPage = new ApiTestingPage()
 
export class MonitorExecutionDetailPageSelectors implements BasicPage {

  public functionalMonitoringLi = Selector('[data-test-id="/apitesting/ui"]')
  public executionDetailContainer = Selector('[data-test-id="execution-detail-container"]')
  public arrowDown = Selector('[data-test-id="arrow-down-small-div"]')
  public spanAssertions = Selector('span').withExactText('Assertions')
  public goBackButton = Selector('[data-test-id="go-back-button"]')
  public monitorHistoryHeader = Selector ('span').withText('Monitor History:')
  public executionDetails = Selector('span').withText('Execution Detail')
  public locationNameContainer = Selector ('[data-test-id="location-name-container"]')
  public passed = Selector ('div').withText('PASSED')

  public async at(): Promise<void> {
    await t.expect(apiTestingPage.functionalMonitoringLi.exists)
      .ok('Functional monitoring button not present', {timeout: WaitConfig.Waits.shortWait})
  }  
}
