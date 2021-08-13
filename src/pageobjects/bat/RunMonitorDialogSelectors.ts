import { Selector, t } from 'testcafe'
import { BasicPage } from '../commons/BasicPage'
import { WaitConfig } from '../../config/WaitConfig'
import { getByText } from '@testing-library/testcafe'



export class RunMonitorDialogSelectors implements BasicPage {

  public functionalMonitoringLi = Selector('[data-test-id="/apitesting/ui"]')
  public headerTitle = Selector('h1').withText('Run versioned test')
  public executionLocation = Selector('label').withText('Execution location')
  public configuration = Selector('label').withText('Configuration')
  public runNow = Selector('button').withAttribute('data-test-id','run-now-bottom')
  public locationSelect = Selector('div').withAttribute('data-anypoint-component','Select')
  public locationOption = Selector('[data-anypoint-component="Option"]').nth(0)

  
  public async at(): Promise<void> {
    await t.expect(this.functionalMonitoringLi.exists)
      .ok('Functional monitoring button not present', {timeout: WaitConfig.Waits.shortWait})
  }  
}
