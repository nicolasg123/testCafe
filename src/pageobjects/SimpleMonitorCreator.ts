import { t } from 'testcafe'
import { CreateMonitorLandingPage } from './bat/CreateMonitorLandingPage'
import { WaitConfig } from '../config/WaitConfig'

  

const createMonitorLandingPage = new CreateMonitorLandingPage()

/**
 * Navigator is used to navigate to and from pages in bat.
 *
 */
export class SimpleMonitorCreator {
  public static async create2(testNameAdv: string, endpointURL: string) : Promise<Boolean> {
    await t.click(createMonitorLandingPage.createMonitorButton)
    await t.expect(createMonitorLandingPage.breadCrumbBackToMonitors.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.expect(createMonitorLandingPage.createMessage.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.click(createMonitorLandingPage.monitorNameInput)
    await t.typeText(createMonitorLandingPage.monitorNameInput, testNameAdv)
    await t.click(createMonitorLandingPage.nextButton)
    await t.click(createMonitorLandingPage.endpointURL)
    await t.typeText(createMonitorLandingPage.endpointURL, endpointURL)
    await t.click(createMonitorLandingPage.nextEndpointsButton)
    await t.click(createMonitorLandingPage.createMonitorButtonWizard)
    return true
  }

  public static async create(monitorName: string,endpointURL:string) : Promise<boolean> {
    await t.click(createMonitorLandingPage.createMonitorButton)
    await t.expect(createMonitorLandingPage.breadCrumbBackToMonitors.exists).eql(true)
    await t.expect(createMonitorLandingPage.createMessage.exists).eql(true)
    await t.click(createMonitorLandingPage.monitorNameInput)
    await t.typeText(createMonitorLandingPage.monitorNameInput, monitorName)
    await t.click(createMonitorLandingPage.nextButton)
    await t.click(createMonitorLandingPage.endpointURL)
    await t.typeText(createMonitorLandingPage.endpointURL, endpointURL)
    await t.click(createMonitorLandingPage.nextEndpointsButton)
    await t.click(createMonitorLandingPage.createMonitorButtonWizard)
    return true
  }
  public static async createLocal(monitorName: string,endpointURL:string) : Promise<boolean> {
    await t.click(createMonitorLandingPage.createMonitorButton)
    await t.expect(createMonitorLandingPage.breadCrumbBackToMonitors.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.click(createMonitorLandingPage.monitorNameInput)
    await t.expect(createMonitorLandingPage.createMessage.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.click(createMonitorLandingPage.monitorNameInput)
    await t.click(createMonitorLandingPage.monitorNameInput)
    await t.typeText(createMonitorLandingPage.monitorNameInput, monitorName)
    await t.click(createMonitorLandingPage.nextButton)
    await t.click(createMonitorLandingPage.endpointURL)
    await t.typeText(createMonitorLandingPage.endpointURL, endpointURL)
    await t.click(createMonitorLandingPage.nextEndpointsButton)
    await t.click(createMonitorLandingPage.createMonitorButtonWizard)
    return true
  }

}