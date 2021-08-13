import  {t, Selector} from 'testcafe'
import  {WaitConfig}  from '../config/WaitConfig'
import { MonitoringLandingAfterCreation } from './bat/MonitoringLandingActionBar'
import { EditMonitorSelectors } from './bat/EditMonitorSelectors'
import { DeleteMonitorSelectors } from './bat/DeleteMonitorSelectors'
import { RunMonitorDialogSelectors } from './bat/RunMonitorDialogSelectors'
import { UploadingPage } from './bat/UploadingPage'
import { CopyMonitorDialogSelectors } from './bat/CopyMonitorDialogSelectors'
import { ManageLocationsDialogSelectors } from './bat/ManageLocationsDialogSelectors'
import { CreateMonitorLandingPage } from './bat/CreateMonitorLandingPage'

const monitoringLandingAfterCreation = new MonitoringLandingAfterCreation()
const editMonitorSelectors = new EditMonitorSelectors()
const deleteMonitorSelectors = new DeleteMonitorSelectors()
const runMonitorDialogSelectors = new RunMonitorDialogSelectors()
const copyMonitorDialogSelectors = new CopyMonitorDialogSelectors()
const uploadingPage = new UploadingPage()
const manageLocationDialogSelectors = new ManageLocationsDialogSelectors()
const createMonitorLandingPage = new CreateMonitorLandingPage()

/**
 * Navigator is used to navigate to and from pages in bat.
 *
 */
export class MonitoringLanding {
  public static async addMonitorWithResponseHeader(bodyName: string, endpointURL: string, responseHeader: string, 
    headerValue: string, assertion: string)  : Promise<boolean> {
    await t.click(monitoringLandingAfterCreation.createButton)
    await t.click(createMonitorLandingPage.monitorNameInput)
    await t.typeText(createMonitorLandingPage.monitorNameInput, bodyName)
    await t.click(createMonitorLandingPage.nextButton)
    await t.click(createMonitorLandingPage.endpointURL)
    await t.typeText(createMonitorLandingPage.endpointURL, endpointURL)
    await t.click(createMonitorLandingPage.assertionField)
    await t.typeText(createMonitorLandingPage.assertionField,responseHeader)
    await t.pressKey('tab')
    await t.click(createMonitorLandingPage.inputHeaders)
    await t.typeText(createMonitorLandingPage.inputHeaders,headerValue)
    await t.click(createMonitorLandingPage.assertionValueInput)
    await t.typeText(createMonitorLandingPage.assertionValueInput,assertion)
    await t.click(createMonitorLandingPage.nextEndpointsButton)
    await t.click(createMonitorLandingPage.createMonitorButtonWizard)
  return true 
  }

  public static async addMonitorWithBodyAssertion(bodyName: string, endpoint: string, 
    assertionField: string,inputValue:string,assertionValue:string)  : Promise<boolean> {
    await t.click(monitoringLandingAfterCreation.createButton)
    await t.click(createMonitorLandingPage.monitorNameInput)
    await t.typeText(createMonitorLandingPage.monitorNameInput, bodyName)
    await t.click(createMonitorLandingPage.nextButton)
    await t.click(createMonitorLandingPage.endpointURL)
    await t.typeText(createMonitorLandingPage.endpointURL, endpoint)
    await t.click(createMonitorLandingPage.assertionField)
    await t.typeText(createMonitorLandingPage.assertionField,assertionField)
    await t.pressKey('tab')
    await t.click(createMonitorLandingPage.bodyInputValue)
    await t.typeText(createMonitorLandingPage.bodyInputValue,inputValue)
    await t.click(createMonitorLandingPage.assertionValueInput)
    await t.typeText(createMonitorLandingPage.assertionValueInput,assertionValue)
    await t.click(createMonitorLandingPage.nextEndpointsButton)
    await t.click(createMonitorLandingPage.createMonitorButtonWizard)
    await t.wait(WaitConfig.Waits.minWait)
    return true
  }

  public static async createMonitorReporters(name:string,endpoint:string,select:string,reporterValue:string) : Promise<boolean>  {
    await t.click(monitoringLandingAfterCreation.createButton)
    await t.click(createMonitorLandingPage.monitorNameInput)
    await t.typeText(createMonitorLandingPage.monitorNameInput, name)
    await t.click(createMonitorLandingPage.nextButton)
    await t.click(createMonitorLandingPage.endpointURL)
    await t.typeText(createMonitorLandingPage.endpointURL, endpoint)
    await t.click(createMonitorLandingPage.nextEndpointsButton)
    await t.click(createMonitorLandingPage.reportersSelect)
    await t.typeText(createMonitorLandingPage.reportersSelect,select)
    await t.pressKey('tab')
    await t.click(createMonitorLandingPage.reporterValue) 
    await t.typeText(createMonitorLandingPage.reporterValue,reporterValue)
    await t.click(createMonitorLandingPage.createMonitorButtonWizard)
    await t.wait(WaitConfig.Waits.minWait)
    return true
  }
  
  public static async manageLocations() : Promise<boolean>  {
    await t.click(monitoringLandingAfterCreation.manageLocations)
    await t.wait(WaitConfig.Waits.minWait)
    await t.expect(manageLocationDialogSelectors.locationsExecutedSpan.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.expect(manageLocationDialogSelectors.locationsSpan.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.expect(manageLocationDialogSelectors.goToRuntimeManagerLink.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.expect(manageLocationDialogSelectors.locationsNamePublicLocations.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.expect(manageLocationDialogSelectors.locationsNamePublicLocationsValue.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.expect(manageLocationDialogSelectors.locationsNamePublicLocationsValue2.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.expect(manageLocationDialogSelectors.locationStatus.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.expect(manageLocationDialogSelectors.onlineStatus.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.click(manageLocationDialogSelectors.privateLocationTab)
    await t.expect(manageLocationDialogSelectors.deleteButton.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.expect(manageLocationDialogSelectors.goBackButton.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.click(manageLocationDialogSelectors.goBackButton)
    return true    
  }
  public static async copy(testNameAdv: string) : Promise<boolean> {
    await t.wait(WaitConfig.Waits.second)
    await t.hover(Selector('#noDataSuiteSummaries').find('div').withText(testNameAdv).nth(3), {
      speed: 0.5
    })
    await t.click(monitoringLandingAfterCreation.cloneDiv)
    await t.click(copyMonitorDialogSelectors.NextButton)
    await t.wait(WaitConfig.Waits.second)
    await t.click(editMonitorSelectors.nextButton)
    await t.click(editMonitorSelectors.nextEndpoints)
    await t.click(editMonitorSelectors.createMonitorButton)
    return true
  }
  
  public static async runNow(testNameAdv: string) : Promise<boolean> {
      await t.wait(WaitConfig.Waits.mediumBaseWait) 
      await t.click(monitoringLandingAfterCreation.uploadButton)
      await t.click(uploadingPage.uploadCancelButton)
      await t.wait(WaitConfig.Waits.shortWait) 
      await t.click(monitoringLandingAfterCreation.passingDiv)
      await t.hover(Selector('#passingSuiteSummaries').find('div').withText(testNameAdv).nth(3), {
        speed: 0.5
      })
      await t.click(monitoringLandingAfterCreation.runButton)
      await t.click(runMonitorDialogSelectors.locationSelect)
      await t.click(runMonitorDialogSelectors.locationOption)
      await t.click(runMonitorDialogSelectors.runNow)
      return true
  }
  
  /**
   * Logs in to the anypoint platform using the environment variables
   *
   */

  public static async checkLanding(): Promise<boolean> {
    await t.wait(WaitConfig.Waits.minWait)
    await t.expect(monitoringLandingAfterCreation.divMonitors.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.expect(monitoringLandingAfterCreation.searchMonitors.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.expect(monitoringLandingAfterCreation.passingSuiteSummaries.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.expect(monitoringLandingAfterCreation.uploadButton.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.expect(monitoringLandingAfterCreation.manageLocations.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.expect(monitoringLandingAfterCreation.failedAnchor.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.expect(monitoringLandingAfterCreation.passedAnchor.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.expect(monitoringLandingAfterCreation.noDataAnchor.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.expect(monitoringLandingAfterCreation.failingSuiteSummaries.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.expect(monitoringLandingAfterCreation.noDataSuiteSummaries.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    return true
  }

  public static async editMonitor(testNameAdv: string): Promise<boolean> {
    await t.hover(Selector('#passingSuiteSummaries').find('div').withText(testNameAdv).nth(3), {
      speed: 0.5
    })
    await t.click(monitoringLandingAfterCreation.editButton)
    await t.wait(WaitConfig.Waits.minWait)
    await t.click(editMonitorSelectors.nextButton)
    await t.click(editMonitorSelectors.updateMonitorButton)
    return true
  }

  public static async deleteMonitor(testNameAdv: string): Promise<boolean> {
    await t.wait(WaitConfig.Waits.second)
    await t.click(monitoringLandingAfterCreation.passingDiv)
    await t.hover(Selector('#passingSuiteSummaries').find('div').withText(testNameAdv).nth(3), {
      speed: 0.5
    })
    await t.click(monitoringLandingAfterCreation.deleteButton)
    await t.click(deleteMonitorSelectors.deleteButton)
    return true
  }

  public static async editCodeEditor(testNameAdv: string): Promise<boolean> {
    await t.hover(Selector('#passingSuiteSummaries').find('div').withText(testNameAdv).nth(3), {
      speed: 0.5
    })
    await t.click(monitoringLandingAfterCreation.editButton)
    await t.click(editMonitorSelectors.codeEditorButton)
    return true
  }
} 