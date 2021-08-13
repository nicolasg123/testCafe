import { t } from 'testcafe'
import { WaitConfig } from '../config/WaitConfig'
import { ApiTestingPage } from './Github/ApiTestingPage'

const apiTestingPage = new ApiTestingPage()

/**
 * Navigator is used to navigate to and from pages in bat.
 *
 */
export class TabsChecker {
  public static async MonitoredEndpointsCheck() : Promise<Boolean> {
      await t.click(apiTestingPage.monitoredEndpointsTab)
      await t.expect(apiTestingPage.monitoredEndpointStatus.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
      await t.expect(apiTestingPage.monitoredEndpoint.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
      await t.expect(apiTestingPage.monitoredEndpointExecutions.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
      await t.expect(apiTestingPage.monitoredEndpointMinResponse.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
      await t.expect(apiTestingPage.monitoredEndpointAvgResponse.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
      await t.expect(apiTestingPage.monitoredEndpointMaxResponse.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
      return true
  }
  public static async ScheduleTabCheck(suiteName : string) : Promise<Boolean> {
      await t.click(apiTestingPage.monitorSuiteCardContainer(suiteName))
      await t.expect(apiTestingPage.schedulingTab.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
      await t.click(apiTestingPage.schedulingTab)
      await t.expect(apiTestingPage.scheduleNextRunLabel.innerText).eql('Next run')
      await t.expect(apiTestingPage.ScheduleScheduleLabel.innerText).eql('Schedule')
      await t.expect(apiTestingPage.scheduleVersionLabel.innerText).eql('Version')
      await t.expect(apiTestingPage.scheduleExecutionLocationLabel.innerText).eql('Execution location')
      await t.expect(apiTestingPage.scheduleConfigurationLabel.innerText).eql('Configuration')
      await t.expect(apiTestingPage.ScheduleAddScheduleButton.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    return true
  }
  public static async checkBarArea(suiteName: string): Promise<Boolean> {
      await t.click(apiTestingPage.monitorSuiteCardContainer(suiteName))
      await t.expect(apiTestingPage.testingTab.exists).eql(true, {timeout: WaitConfig.Waits.shortWait})
      await t.click(apiTestingPage.testingTab)
      await t.click(apiTestingPage.analyticsPlot)
      return true
  }

  public static async checkTestTab(suiteName: string, defaultVersion: string): Promise<boolean> {
    await t.click(apiTestingPage.monitorSuiteCardContainer(suiteName))
    await t.expect(apiTestingPage.testingTab.exists).eql(true, {timeout: WaitConfig.Waits.shortWait})
    await t.click(apiTestingPage.testingTab)
    await t.expect(apiTestingPage.testSuiteCard(suiteName).exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    await t.click(apiTestingPage.testSuiteCard(suiteName))
    await t.expect(apiTestingPage.versionCardDelete(defaultVersion).exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    await t.expect(apiTestingPage.versionCardEdit(defaultVersion).exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    await t.expect(apiTestingPage.versionCardDownload(defaultVersion).exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    await t.expect(apiTestingPage.versionCardHistory(defaultVersion).exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    await t.click(apiTestingPage.monitoredEndpointsTab)
    await t.click(apiTestingPage.testingTab)
    await t.wait(WaitConfig.Waits.shortWait)
    await t.click(apiTestingPage.monitoredEndpointsTab)
    await t.click(apiTestingPage.testingTab)
    return true
  }

  
  
}
