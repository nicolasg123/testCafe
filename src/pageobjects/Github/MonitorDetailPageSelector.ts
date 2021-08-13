import { Selector, t } from 'testcafe'
import { BasicPage } from '../commons/BasicPage'
import { WaitConfig } from '../../config/WaitConfig'
import { ApiTestingPage } from './ApiTestingPage'

/**
 * Apitesting Page , pageobject for design center.
 */
const apiTestingPage = new ApiTestingPage()
 
export class MonitorDetailPageSelector implements BasicPage {

  public functionalMonitoringLi = Selector('[data-test-id="/apitesting/ui"]')
  public runNowButton = Selector('[data-test-id="run-now-button"]')
  public historyButton = Selector('[data-test-id="view-history-button"]')
  public contentTest = Selector ('[data-test-id="content-test"]') // 3 puntitos
  public analyticsPlot = Selector('div').withAttribute('class','plottable')
  public nextRunHeader = Selector('div').withAttribute('data-test-id','next-run-header-cell')
  public scheduleHeader = Selector('div').withText('Schedule')
  public eLocationHeader = Selector('div').withText('Execution location')
  public simpleExecutionDiv = Selector('[data-test-id="simple-execution-div"]')
  public lastExecutionHeader = Selector('span').withText('last execution:')
  public statusPassed = Selector('div').withText('PASSED')
  public assertions = Selector('span').withExactText('Assertions:')
  public backToMonitorsButton = Selector('span').withText('Back to Monitors')
  public addScheduleButton = Selector('span').withText('Add Schedule')
  public equalsSection = Selector('span').withText('200 must equal 200')
  public downloadButton = Selector('button').withAttribute('data-test-id','test-download-monitor');
  public contextMenu = Selector('[data-test-id="test"]')
  public nextRunTable = Selector('#appContainer div').withText('Next run').nth(2)

  

  public async at(): Promise<void> {
    await t.expect(apiTestingPage.functionalMonitoringLi.exists)
      .ok('Functional monitoring button not present', {timeout: WaitConfig.Waits.shortWait})
  }  
}
