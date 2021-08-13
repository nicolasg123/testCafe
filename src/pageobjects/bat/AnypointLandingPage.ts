import { Selector, t } from 'testcafe'
import { BasicPage } from '../commons/BasicPage'
import { WaitConfig } from '../../config/WaitConfig'
import { ClientFunction } from 'testcafe';
import { ApiTestingPage } from './ApiTestingPage';
import { OptInOptOutDialog } from './OptInOptOutDialog';

/**
 * Apitesting Page , pageobject for design center.
 */

const apiTestingPage = new ApiTestingPage()
const optInOptOut = new OptInOptOutDialog()
 
export class AnypointLandingPage implements BasicPage {
  
  public async setCookie(value: string, domain: string): Promise<void> {
  
    const _setCookie = ClientFunction((value: string, domain: string) => {
        const uiVersionCookie = `bat-ui-version=${value};domain=${domain};path=/;expires=Session`;
        console.log('Will set cookie: ' + uiVersionCookie)
        document.cookie = uiVersionCookie;
        console.log('Cookie setted: ' + document.cookie)
        return true;
    });  
    
    await _setCookie(value,domain)
  }
  
  /**
   * Waits for page to load
   */

  public async at(): Promise<void> {
     await t.expect(Selector(apiTestingPage.navBarPage).exists)
      .ok('Did not load Anypoing Landing page', {timeout: WaitConfig.Waits.mediumBaseWait})
  }

  public async goToMonitoring(): Promise<void> {
    await t.expect(apiTestingPage.monitoringButton.exists)
      .ok('Missing monitoring button in landing page', {timeout: WaitConfig.Waits.mediumBaseWait})
    await t.click(apiTestingPage.monitoringButton)
    await t.wait(WaitConfig.Waits.loadingBaseWait)
    await t.expect(apiTestingPage.loader.exists).notOk('Spinner still visible and should not', {timeout: WaitConfig.Waits.mediumBaseWait})
  }

  public async goToAnypointFunctionalMonitoring(): Promise<void> {
  await t.expect(apiTestingPage.functionalMonitoringLi.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
  await t.click(apiTestingPage.functionalMonitoringLi)
  await t.wait(WaitConfig.Waits.minWait)
  await t.switchToIframe(apiTestingPage.functionalMonitoringIframe)
  await t.click(optInOptOut.tryNewLayout)
  }
}