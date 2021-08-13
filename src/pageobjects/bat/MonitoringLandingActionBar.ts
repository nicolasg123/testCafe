import { Selector, t } from 'testcafe'
import { BasicPage } from '../commons/BasicPage'
import { WaitConfig } from '../../config/WaitConfig'


/**
 * Apitesting Page , pageobject for design center.
 */
export class MonitoringLandingAfterCreation {

  public functionalMonitoringLi = Selector('[data-test-id="/apitesting/ui"]')
  public divMonitors = Selector('div').withAttribute('class').withText('Monitors')
  public searchMonitors = Selector('input').withAttribute('data-test-id','sidebar-search-location-input')
  public manageLocations = Selector('span').withAttribute('data-test-id','manage-locations-link').withText('Manage Locations')
  public uploadButton = Selector('button').withAttribute('data-test-id','upload-button')
  public passingSuiteSummaries = Selector('div').withText('Passed')
  public failedAnchor = Selector('[data-test-id="failed-anchor"]')
  public passedAnchor = Selector('[data-test-id="passed-anchor"]')
  public noDataAnchor = Selector('[data-test-id="noData-anchor"]')
  public failingSuiteSummaries = Selector('[data-test-id="failingSuiteSummaries"]')
  public noDataSuiteSummaries = Selector('span').withText('No data')
  public containerDiv = Selector('[data-test-id="container-div"]')
  public runButton = Selector('div').withAttribute('data-test-id','run-button')  
  public editButton = Selector('div').withAttribute('data-test-id','edit-button')
  public deleteButton = Selector('div').withAttribute('data-test-id','delete-button')
  public passingDiv = Selector('div').withAttribute('id','passingSuiteSummaries')
  public cloneDiv = Selector('div').withAttribute('data-test-id','copy-monitor')
  public createButton = Selector('button').withAttribute('data-test-id','create-button')
      
}
