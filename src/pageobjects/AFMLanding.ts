import { t } from 'testcafe'
import { MonitorLandingPage } from './Github/MonitorLandingPage'
import { WaitConfig } from '../config/WaitConfig'
import { AnypointLandingPage } from './Github/AnypointLandingPage';

const monitorLandingPage = new MonitorLandingPage()
const anypointLanding = new AnypointLandingPage()



/**
 * Navigator is used to navigate to and from pages in bat.
 *
 */

export class AFMLanding {

  
  
  public static async checkLandingPage() {
    
    await anypointLanding.goToAnypointFunctionalMonitoring()
    await t.wait(WaitConfig.Waits.minWait)
    await t.expect(monitorLandingPage.titleMonitorLanding.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    await t.expect(monitorLandingPage.titleScheduleLanding.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    await t.expect(monitorLandingPage.createButtonLanding.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    await t.expect(monitorLandingPage.uploadButtonLanding.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    return true
  }

  public static async checkLandingPageLocal() { 
    await t.expect(monitorLandingPage.titleMonitorLanding.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    await t.expect(monitorLandingPage.titleScheduleLanding.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    await t.expect(monitorLandingPage.createButtonLanding.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    await t.expect(monitorLandingPage.uploadButtonLanding.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    return true
  }
}
