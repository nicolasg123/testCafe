import { Selector, t } from 'testcafe'
import { BasicPage } from '../commons/BasicPage'
import { WaitConfig } from '../../config/WaitConfig'



/**
 * Apitesting Page , pageobject for design center.
 */
export class ManageLocationsDialogSelectors implements BasicPage {

  public functionalMonitoringLi = Selector('[data-test-id="/apitesting/ui"]')
  public locationsSpan = Selector('span').withText('Locations')
  public locationsExecutedSpan = Selector('span').
                                withText('Locations are where your monitors are executed.')
  public goToRuntimeManagerLink = Selector('a').withText('Go to Runtime Manager')
  public locationsNamePublicLocations = Selector('span').withText('Location Name:')
  public locationsNamePublicLocationsValue = Selector ('span').withText('us-east-1')
  public locationsNamePublicLocationsValue2 = Selector ('span').withText('us-east-2')
  public locationStatus = Selector('span').withText('Location status:')
  public onlineStatus = Selector('div').find('div').withText('ONLINE')
  public privateLocationTab = Selector('li').withAttribute('role','tab').withText('Private Locations')
  public deleteButton = Selector('div').withAttribute('data-test-id','delete-button') 
  public goBackButton = Selector('button').withAttribute('data-test-id','go-back-button')

  public async at(): Promise<void> {
    await t.expect(this.functionalMonitoringLi.exists)
      .ok('Functional monitoring button not present', {timeout: WaitConfig.Waits.shortWait})
  }  
}
