import { Selector, t } from 'testcafe'
import { BasicPage } from '../commons/BasicPage'
import { WaitConfig } from '../../config/WaitConfig'
import { getByText } from "@testing-library/testcafe";


/**
 * Apitesting Page , pageobject for design center.
 */
export class MonitorLandingPage implements BasicPage {

  public searchLocationInput = Selector('[data-test-id="sidebar-search-location-input"]')
  public searchTestField = Selector('[data-test-id="search-text-field-input-sidebar-search-location"]')
  public locationEditButton = Selector('[data-test-id="edit-button-tooltip-children-wrapper"]')
  public clearSearchButton = Selector('[data-test-id="clear-text-field-input-sidebar-search-location]')
  public functionalMonitoringLi = Selector('[data-test-id="/apitesting/ui"]')
  public manageLocatiomLink = Selector ('[data-test-id="manage-locations-link"]').withExactText('Manage Locations')
  public uploadButton = Selector('button').withExactText('Upload Monitor')
  public createButton = Selector('button').withExactText('Create Monitor')
  public functionalMonitoringIframe = Selector('#functional-monitoring-iframe')
  public titleMonitorLanding = Selector('span').withExactText("Monitor your public and private APIs")
  public titleScheduleLanding = Selector('span').withText("Schedule tests to run against your APIs, which can be publicly available to anyone with an internet connection or available only on your private network. You can create a monitor here or upload one.")
  public createButtonLanding = getByText("Create a Monitor")
  public uploadButtonLanding = getByText("Upload an existing one")


  public async at(): Promise<void> {
    await t.expect(this.functionalMonitoringLi.exists)
      .ok('Functional monitoring button not present', {timeout: WaitConfig.Waits.shortWait})
  }
}
