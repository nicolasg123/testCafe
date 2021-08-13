import { t, Selector } from 'testcafe'
import { WaitConfig } from '../config/WaitConfig'
import { ApiTestingPage } from './bat/ApiTestingPage'


const apiTestingPage = new ApiTestingPage()

/**
 * Navigator is used to navigate to and from pages in bat.
 *
 */
export class MonitorLandingButtons {

  public static async checkButtons(): Promise<boolean> {
    await t.expect(apiTestingPage.functionalMonitoringLi.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    await t.click(apiTestingPage.functionalMonitoringLi)
    await t.wait(WaitConfig.Waits.minWait)
    await t.switchToIframe(apiTestingPage.functionalMonitoringIframe)
    await t.click(Selector('span').withText('Dismiss'))
    await t.wait(WaitConfig.Waits.second)
    await t.expect(apiTestingPage.searchInput.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    await t.expect(apiTestingPage.searchInput.getAttribute('placeholder')).eql('Search', {timeout: WaitConfig.Waits.minWait})
    await t.expect(apiTestingPage.inputSidebarSearchMonitor.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    await t.expect(apiTestingPage.sidebarUploadMonitorButton.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    await t.expect(apiTestingPage.landingCreateMonitorButton.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    await t.click(apiTestingPage.landingMessageContainer)
    await t.expect(apiTestingPage.landingMessageImageContainer.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    await t.expect(apiTestingPage.scheduleLandingMessage.innerText).eql('Schedule tests to run against API endpoints at regular intervals')
    await t.expect(apiTestingPage.monitorPublicAPI.innerText).eql('Monitor your public and private APIs')
    await t.switchToMainWindow()
    await t.expect(apiTestingPage.functionalMonitoringLi.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    await t.click(apiTestingPage.functionalMonitoringLi)
    await t.wait(WaitConfig.Waits.minWait)
    return true
  }
  public static async checkSiderBar(): Promise<boolean> {
    await t.switchToIframe(apiTestingPage.functionalMonitoringIframe)
    await t.wait(WaitConfig.Waits.second)
    await t.expect(apiTestingPage.sidebarCreateMonitorButton.exists).ok('Create button sidebar not found', {timeout: WaitConfig.Waits.minWait})
    await t.click(apiTestingPage.sidebarCreateMonitorButton)
    await t.expect(apiTestingPage.createMonitorFromScratchMessage.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    return true
  }
}
