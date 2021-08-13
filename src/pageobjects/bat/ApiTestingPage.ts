import { Selector, t } from 'testcafe'
import { BasicPage } from '../commons/BasicPage'
import { WaitConfig } from '../../config/WaitConfig'
import {mapAssetIdToSuiteName, nameToAssetId} from "../../utils/NameConvertions";

/**
 * Apitesting Page , pageobject for design center.
 */
export class ApiTestingPage implements BasicPage {

  public functionalMonitoringLi = Selector('[data-test-id="/apitesting/ui"]')
  public locationTextField = Selector('input').withAttribute('placeholder', 'Location name')
  public locationEditSaveButton = Selector('[data-test-id="save-button-tooltip-text"]')
  public testActionBarDeleteButton = Selector ('[data-test-id="delete-tooltip-bottom-children-wrapper"]')
  public testActionBarEditButton = Selector('[data-test-id="edit-tooltip-bottom-children-wrapper"]')
  public testActionBarDownloadButton = Selector('[data-test-id="download-tooltip-bottom-children-wrapper"]')
  public testActionBarHistoryButton = Selector ('[data-test-id="history-tooltip-bottom-children-wrapper"]')
  public testActionBarRunNowButton = Selector ('[data-test-id="run-now-tooltip-bottom-children-wrapper"]')
  public functionalMonitoringIframe = Selector('#functional-monitoring-iframe')
  public sidebarCreateMonitorButton = Selector('[data-test-id="sidebar-create-monitor"]')
  public landingCreateMonitorButton = Selector('[data-test-id="landing-message-create"]')
  public sidebarUploadMonitorButton = Selector('[data-test-id="sidebar-upload-monitor"]')
  public landingUpdateMonitorButton = Selector('[data-test-id="landing-message-upload"]')
  public deleteMonitorButton = Selector('[data-test-id="link-label"]')
  public deleteMonitorConfirmButton = Selector('[data-test-id="delete-monitor-confirm"]')
  public deleteMonitorCancelButton = Selector('[data-test-id="delete-monitor-cancel"]')
  public monitorNameInput = Selector('[data-test-id="monitor-name-input"]')
  public stepperNextButton = Selector('[data-test-id="Next-button"]')
  public endpointUrlInput = Selector('[data-test-id="endpoint-url"]')
  public createMonitorButton = Selector ('[data-test-id="Create-button"]')
  public landingMessageContainer = Selector('[data-test-id="landing-message-container"]')
  public landingMessageImageContainer = Selector('[data-test-id="landing-message-image"]')
  public scheduleLandingMessage = Selector('#root').find('div').withText('Schedule tests to run against API endpoints at reg').nth(11)
  public monitorPublicAPI = Selector('span').withText('Monitor your public and private APIs')
  public uploadButton = Selector('[data-test-id="upload-label-monitors-tab"]')
  public uploadHeader = Selector('h1').withText('Upload')
  public fileUploaderFileName = Selector('#file-uploader-file-name')
  public fileUploaderButton = Selector('#file-uploader-button')
  public fileUploaderCancelButton = Selector('button').withText('Cancel')
  public fileUploadButton = Selector('[data-test-id="upload"][data-anypoint-component="Button"]')
  public locationsTab = Selector('[data-test-id="test-locations-tab"]')
  public monitorTab = Selector('[data-test-id="test-monitors-tab"]')
  public locationsLandingMessageImage = Selector('[data-test-id="landing-targets-image"]')
  public landingTargetMessage = Selector('div').withText('Locations are where your monitors are')
  public landingTargetExecuted = Selector('div').withText('executed.')
  public landingTargetCloudHub = Selector('div').withText('To run monitors for APIs running on CloudHub,')
  public landingTargetSchedule = Selector('div').withText('set a schedule on a private location.')
  public landingCreateTargetButton = Selector('[data-test-id="landing-target-create-target"]')
  public searchInput = Selector('[data-test-id="sidebar-search-monitor-input"]')
  public inputSidebarSearchMonitor = Selector('[data-test-id="clear-text-field-input-sidebar-search-monitor"]')
  public monitoredEndpointsTab = Selector('[data-test-id="monitoringTab"]')
  public createPrivateLocationLandingButton = Selector('[data-test-id="landing-target-create-target"]')
  public privateLocationInput = Selector('input').withAttribute('placeholder', 'Location name')
  public monitoringButton = Selector('[data-test-id="management-center-monitoring_center"]')
  public loader = Selector('[data-anypoint-component="Spinner"]')
  public createMonitorFromScratchMessage = Selector('h1').withText('Create a Monitor from scratch')
  public scheduleTestMessage = Selector('#root').find('div').withText('Schedule tests to run against API endpoints at reg')
  public environmentSelect = Selector('[data-test-id="target-form-select-environment"]')
  public environmentValue = Selector('#react-select-2--option-0')
  public createLocationButton = Selector('[data-test-id="target-form-submit-button"]')
  public locationTabCreateButton = Selector('[data-test-id="locations-tab-create-button"]')
  public schedulingTab = Selector('[data-test-id="schedulingTab"]')
  public scheduleTable = Selector('[data-test-id="content-schedule-actions-context-menu"]')
  public scheduleNextRunLabel = Selector('div').withExactText('Next run')
  public scheduleTableModify = Selector('button').withText('Modify')
  public ScheduleScheduleLabel = Selector('div').withExactText('Schedule')
  public scheduleVersionLabel = Selector('div').withExactText('Version')
  public scheduleExecutionLocationLabel = Selector('div').withExactText('Execution location')
  public scheduleConfigurationLabel = Selector('div').withExactText('Configuration')
  public ScheduleAddScheduleButton = Selector('span').withExactText('Add Schedule')
  public testingTab = Selector('[data-test-id="testingTab"]')
  public scheduleAddScheduleAddButton = Selector('span').withExactText('Add')
  public scheduleDeleteButton = Selector('[data-test-id="schedule-actions-context-menu-delete"]')
  public scheduleActionContextMenu = Selector('[data-test-id="schedule-actions-context-menu"]')
  public testEditUpdateButton = Selector('[data-test-id="Update-button"]')
  public monitoredEndpointStatus = Selector('div').withExactText('Status')
  public monitoredEndpoint = Selector('div').withExactText('Endpoint')
  public monitoredEndpointExecutions = Selector('div').withExactText('Executions')
  public monitoredEndpointMinResponse = Selector('div').withExactText('Min response')
  public monitoredEndpointAvgResponse = Selector('div').withExactText('Avg response')
  public monitoredEndpointMaxResponse = Selector('div').withExactText('Max response')
  public messageScheduleTests = Selector('#root').find('div').withText('Schedule tests to run against API endpoints at regular intervals')
  public messageMonitorYourPublic = Selector('span').withText('Monitor your public and private APIs')
  public runVersionedTest = Selector('div').withExactText('Run versioned test')
  public runExecutionLocation = Selector('label').withText('Execution location')
  public runConfiguration = Selector('label').withText('Configuration')
  public cancelSpan = Selector('span').withExactText('Cancel')
  public hourlySpan = Selector('span').withExactText('Hourly')
  public historyDetailsButton = Selector('button').withText('Detail')
  public historyStatusColumn = Selector('div').withExactText('Status')
  public historyExecuted = Selector('div').withExactText('Executed')
  public historyTestDuration = Selector('div').withExactText('Test duration')
  public historyExecutionLocation = Selector('div').withExactText('Execution location')
  public historyConfiguration = Selector('div').withExactText('Configuration')
  public monitorAdvancedOption = Selector('span').withText('Advanced (multiple endpoints and assertions)')
  public monitorAdvancedInputText = Selector('[data-test-id="adv-request-field-0-endpoint-url-input"]')
  public monitorAddHeaderButton = Selector('span').withText('Add header')
  public advRequestValueInput = Selector('[data-test-id="adv-request-field-0-header-0-value-input"]')
  public monitorCreateButton = Selector('[data-test-id="Create-button"]')
  public deleteLocationButton = Selector('[data-test-id="delete-location-div"]')
  public deleteConfirmationButton = Selector('button').withText('Delete')
  public navBarPage = Selector('[data-test-id="navbar-page-name"]')
  public addReporterButton = Selector('span').withText('Add reporter')
  public emailPlusButton = Selector('span').withText('Add new email')
  public locationLabel = Selector('label').withText('Select Location')
  public monitorScheduleValue = Selector('[data-test-id="monitor-schedule-value"]')
  public monitorScheduleSelectValue = Selector('[data-test-id="monitor-schedule-select-menu"]').find('div').withText('Advanced')
  public monitorScheduleSelectMenuHourly = Selector('[data-test-id="monitor-schedule-menu-option"]').withExactText('Hourly')
  public cronExpresionField = Selector('[data-test-id="cronExpressionField-input"]')
  public scheduleFormAddButton = Selector('span').withExactText('Add')
  public locationDiv = Selector('[data-test-id="location-div"]')
  public scheduleHourly = Selector('input').withAttribute('type', 'number')
  public analyticsPlot =Selector('div').withAttribute('class','plottable')
  public reporterKey(reporterNumber: number) { return Selector(`[data-test-id="reporter-${reporterNumber}-type-value"]`) }
  public reporterKeyValue(reporterNumber: number, reporter: string) { return Selector(`[data-test-id="reporter-${reporterNumber}-type-menu-option"]`).withExactText(reporter) }
  public reporterSelect(reporterNumber: number) { return Selector(`[data-test-id="reporter-${reporterNumber}-type-value"]`) }
  public monitorSuiteCardContainer(name: string) { return Selector(`[data-test-id="${name}"]`)}
  public monitorSearchValue(monitorName: String ) {return Selector(`[data-test-id="${monitorName}"]`)}  
  public reporterInput(reporterNumber: number) { return Selector(`[data-test-id="reporter-${reporterNumber}-value-input"]`) }
  public emailReporterInput(reporterNumber: number) { return Selector(`[data-test-id="reporter-${reporterNumber}-email-pillbar-add-new-pill"]`) }
  public testSuiteCard(suiteName: String) { return Selector(`[data-test-id="${suiteName}"]`);}
  public versionCardDelete(version: String) { return Selector(`[data-test-id="${version}-delete-button"]`) }
  public versionCardEdit(version: String) { return Selector(`[data-test-id="${version}-edit-button"]`) }
  public versionCardDownload(version: String) { return Selector(`[data-test-id="${version}-download-button"]`) }
  public versionCardHistory(version: String) { return Selector(`[data-test-id="${version}-history-button"]`) }
  public versionCardRun() { return Selector(`[data-test-id="run-now-tooltip-bottom-children-wrapper"]`) }
  public advRequestHeaderField(endpointNumber: number, headerNumber: number)  { return Selector(`[data-test-id="adv-request-field-${endpointNumber}-header-${headerNumber}-key-value"]`) }
  public advRequestHeaderKey(endpointNumber: number, headerNumber: number)  { return Selector(`[data-test-id="adv-request-field-${endpointNumber}-header-${headerNumber}-key-menu-option"]`).withExactText('A-IM') }


  public async at(): Promise<void> {
    await t.expect(this.functionalMonitoringLi.exists)
      .ok('Functional monitoring button not present', {timeout: WaitConfig.Waits.shortWait})
  }

  public async createMonitor(testName: string, testUrl: string): Promise<string> {
    const testId = nameToAssetId(testName)
    const suiteName = testName
    const secondTimeout =  {timeout: WaitConfig.Waits.shortWait}
    await t.expect(this.monitorNameInput.exists,).ok('Monitor name input not found', secondTimeout)
    await t.typeText(this.monitorNameInput, testName)
    await t.expect(this.stepperNextButton.exists).ok('Next not found', secondTimeout)
    await t.click(this.stepperNextButton)
    await t.expect(this.endpointUrlInput.exists).ok('Endpoint URL input not found', secondTimeout)
    await t.typeText(this.endpointUrlInput, testUrl)
    await t.expect(this.stepperNextButton.exists).ok('Next not found', secondTimeout)
    await t.click(this.stepperNextButton)
    await t.expect(this.createMonitorButton.exists).ok('Create button not found', secondTimeout)
    await t.click(this.createMonitorButton)
    await t.wait(WaitConfig.Waits.minWait)
    let suiteNameExist = await (Selector('h1').withText(suiteName).exists);
    if(!suiteNameExist){
      await t.expect(Selector('h1').withText(mapAssetIdToSuiteName(testName)).exists).ok('Suite Name not found', {timeout: WaitConfig.Waits.loadingBaseWait})
      return mapAssetIdToSuiteName(testName);
    }
    else
    {
      await t.expect(Selector('h1').withText(suiteName).exists).ok('Suite Name not found', {timeout: WaitConfig.Waits.loadingBaseWait})
    }
    return suiteName;
  }

  public scheduleFormTestLabel(testName: string) {
    return Selector('label').withText(testName);
  }

  public monitorNameHeader(suiteName: string) {
    return Selector('h1').withText(suiteName);
  }
}