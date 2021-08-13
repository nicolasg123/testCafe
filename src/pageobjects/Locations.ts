import { t, Selector } from 'testcafe'
import { ApiTestingPage } from './Github/ApiTestingPage'
import { WaitConfig } from '../config/WaitConfig'



const apiTestingPage = new ApiTestingPage()


/**
 * Navigator is used to navigate to and from pages in bat.
 *
 */
export class Locations {
  public static async DeleteLocation() {
    await t.wait(WaitConfig.Waits.second)
    await t.expect(apiTestingPage.locationsTab.exists).eql(true,{timeout: WaitConfig.Waits.shortWait})
    await t.click(apiTestingPage.locationsTab)
    await t.click(apiTestingPage.deleteLocationButton)
    await t.click(apiTestingPage.deleteConfirmationButton)  
    return true   
  }
  public static async editPrivateLocation(locationName:string) {
    await t.wait(WaitConfig.Waits.shortWait);
    await t.click(apiTestingPage.monitorTab)
    await t.wait(WaitConfig.Waits.shortWait)
    await t.click(apiTestingPage.locationsTab)
    await t.wait(WaitConfig.Waits.shortWait)
    await t.click(apiTestingPage.monitorTab)
    await t.wait(WaitConfig.Waits.locationsWait)
    await t.click(apiTestingPage.locationsTab)
    await t.click(apiTestingPage.locationDiv)
    await t.click(Selector('[data-test-id="target-name-div"]'))
    await t.click(Selector('[data-test-id="edit-button-tooltip-children-wrapper"]').find('span').find('svg'))
    await t.typeText(apiTestingPage.locationTextField,locationName)
    await t.click(apiTestingPage.locationEditSaveButton)
    await t.wait(WaitConfig.Waits.minWait)
    return true
  }
  public static async createLocations(locationName:string) {
    await t.wait(WaitConfig.Waits.minWait)
    await t.click(apiTestingPage.createPrivateLocationLandingButton)
    await t.typeText(apiTestingPage.privateLocationInput, locationName)
    await t.click(apiTestingPage.environmentSelect)
    await t.click(apiTestingPage.environmentValue)
    await t.wait(WaitConfig.Waits.minWait)
    await t.click(apiTestingPage.createLocationButton)
    await t.wait(WaitConfig.Waits.second)
    return true
  }

  public static async checkLanding() : Promise<boolean> {
    await t.expect(apiTestingPage.functionalMonitoringLi.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    await t.click(apiTestingPage.functionalMonitoringLi)
    await t.wait(WaitConfig.Waits.minWait)
    await t.switchToIframe(apiTestingPage.functionalMonitoringIframe)
    await t.wait(WaitConfig.Waits.second)
    await t.expect(apiTestingPage.locationsTab.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.click(apiTestingPage.locationsTab)
    await t.expect(apiTestingPage.locationsLandingMessageImage.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.expect(apiTestingPage.landingTargetMessage.visible).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.expect(apiTestingPage.landingTargetExecuted.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.expect(apiTestingPage.landingTargetCloudHub.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.expect(apiTestingPage.landingTargetSchedule.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.expect(apiTestingPage.landingCreateTargetButton.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.expect(apiTestingPage.locationTabCreateButton.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    return true
  }

}