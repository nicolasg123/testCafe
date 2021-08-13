import { t } from 'testcafe'
import { WaitConfig } from '../config/WaitConfig'
import { ApiTestingPage } from './bat/ApiTestingPage'



const apiTestingPage = new ApiTestingPage()


/**
 * Navigator is used to navigate to and from pages in bat.
 *
 */
export class MonitorCreator {

  public static async createMonitorModifyScheduleHourly(testNameSchHourly: string,testUrl:string) : Promise<boolean> {
  await t.wait(WaitConfig.Waits.second)
  await t.click(apiTestingPage.sidebarCreateMonitorButton)
  await t.wait(WaitConfig.Waits.minWait)
  await t.typeText(apiTestingPage.monitorNameInput, testNameSchHourly)
  await t.click(apiTestingPage.stepperNextButton)
  await t.typeText(apiTestingPage.endpointUrlInput, testUrl)
  await t.click(apiTestingPage.monitorScheduleValue)
  await t.click(apiTestingPage.monitorScheduleSelectMenuHourly)
  await t.selectText(apiTestingPage.scheduleHourly, 0, 0)
  await t.typeText(apiTestingPage.scheduleHourly, "1")
  await t.click(apiTestingPage.stepperNextButton)
  await t.click(apiTestingPage.createMonitorButton)
  return true
  }

  public static async createADVHeadersReporterEmail(testNameAdv: string, testUrl: string, advancedRequestValueInput: string, reporterTypeMail: string,
     reporterEmailValue: string): Promise<boolean> {
    await t.wait(WaitConfig.Waits.minWait)
    await t.click(apiTestingPage.sidebarCreateMonitorButton)
    await t.typeText(apiTestingPage.monitorNameInput, testNameAdv)
    await t.expect(apiTestingPage.stepperNextButton.exists).ok('Next not found', {timeout: WaitConfig.Waits.minWait})
    await t.click(apiTestingPage.stepperNextButton)
    await t.click(apiTestingPage.monitorAdvancedOption)
    await t.typeText(apiTestingPage.monitorAdvancedInputText, testUrl)
    await t.click(apiTestingPage.monitorAddHeaderButton)
    await t.click(apiTestingPage.advRequestHeaderField(0, 0))
    await t.click(apiTestingPage.advRequestHeaderKey(0, 0))
    await t.typeText(apiTestingPage.advRequestValueInput, advancedRequestValueInput)
    await t.click(apiTestingPage.stepperNextButton)
    await t.click(apiTestingPage.locationLabel)
    await t.click(apiTestingPage.addReporterButton)
    await t.click(apiTestingPage.reporterKey(0))
    await t.click(apiTestingPage.reporterKeyValue(0, reporterTypeMail))
    await t.click(apiTestingPage.emailPlusButton)
    await t.typeText(apiTestingPage.emailReporterInput(0), reporterEmailValue)
    await t.pressKey('enter')
    await t.click(apiTestingPage.emailPlusButton)
    await t.typeText(apiTestingPage.emailReporterInput(0), reporterEmailValue)
    await t.pressKey('enter')
    await t.click(apiTestingPage.monitorCreateButton)
    return true
  }

  public static async createADVHeadersReporterSL(testNameAdv: string, testUrl: string, advancedRequestValueInput: string, reporterSumoLogic: string): Promise<boolean> {
    await t.wait(WaitConfig.Waits.minWait)
    await t.click(apiTestingPage.sidebarCreateMonitorButton)
    await t.typeText(apiTestingPage.monitorNameInput, testNameAdv)
    await t.expect(apiTestingPage.stepperNextButton.exists).ok('Next not found', {timeout: WaitConfig.Waits.minWait})
    await t.click(apiTestingPage.stepperNextButton)
    await t.click(apiTestingPage.monitorAdvancedOption)
    await t.typeText(apiTestingPage.monitorAdvancedInputText, testUrl)
    await t.click(apiTestingPage.monitorAddHeaderButton)
    await t.click(apiTestingPage.advRequestHeaderField(0, 0))
    await t.click(apiTestingPage.advRequestHeaderKey(0, 0))
    await t.typeText(apiTestingPage.advRequestValueInput, advancedRequestValueInput)
    await t.click(apiTestingPage.stepperNextButton)
    await t.click(apiTestingPage.addReporterButton)
    await t.click(apiTestingPage.reporterSelect(0))
    await t.click(apiTestingPage.reporterKey(0))
    await t.click(apiTestingPage.reporterKeyValue(0, 'Slack'))
    await t.typeText(apiTestingPage.reporterInput(0), 'someSlackWebHook')
    await t.click(apiTestingPage.addReporterButton)
    await t.click(apiTestingPage.reporterSelect(1))
    await t.click(apiTestingPage.reporterKey(1))
    await t.click(apiTestingPage.reporterKeyValue(1, 'SumoLogic'))
    await t.typeText(apiTestingPage.reporterInput(1), reporterSumoLogic)
    await t.click(apiTestingPage.monitorCreateButton)
    return true
  }
  public static async createADVHeadersReporterSlack(testNameAdv: string, testUrl: string, advancedRequestValueInput: string, reporter: string): Promise<boolean> {
      await t.wait(WaitConfig.Waits.minWait)
      await t.click(apiTestingPage.sidebarCreateMonitorButton)
      await t.typeText(apiTestingPage.monitorNameInput, testNameAdv)
      await t.expect(apiTestingPage.stepperNextButton.exists).ok('Next not found', {timeout: WaitConfig.Waits.minWait})
      await t.click(apiTestingPage.stepperNextButton)
      await t.click(apiTestingPage.monitorAdvancedOption)
      await t.typeText(apiTestingPage.monitorAdvancedInputText, testUrl)
      await t.click(apiTestingPage.monitorAddHeaderButton)
      await t.click(apiTestingPage.advRequestHeaderField(0, 0))
      await t.click(apiTestingPage.advRequestHeaderKey(0, 0))
      await t.typeText(apiTestingPage.advRequestValueInput, advancedRequestValueInput)
      await t.click(apiTestingPage.stepperNextButton)
      await t.click(apiTestingPage.addReporterButton)
      await t.typeText(apiTestingPage.reporterInput(0), reporter)
      await t.click(apiTestingPage.monitorCreateButton)
      return true
    }

  public static async createADVHeadersReporterPD(testNameAdv: string, testUrl: string, advancedRequestValueInput: string, reporter: string): Promise<boolean> {
    await t.wait(WaitConfig.Waits.minWait)
    await t.click(apiTestingPage.sidebarCreateMonitorButton)
    await t.typeText(apiTestingPage.monitorNameInput, testNameAdv)
    await t.expect(apiTestingPage.stepperNextButton.exists).ok('Next not found', {timeout: WaitConfig.Waits.minWait})
    await t.click(apiTestingPage.stepperNextButton)
    await t.click(apiTestingPage.monitorAdvancedOption)
    await t.typeText(apiTestingPage.monitorAdvancedInputText, testUrl)
    await t.click(apiTestingPage.monitorAddHeaderButton)
    await t.click(apiTestingPage.advRequestHeaderField(0, 0))
    await t.click(apiTestingPage.advRequestHeaderKey(0, 0))
    await t.typeText(apiTestingPage.advRequestValueInput, advancedRequestValueInput)
    await t.click(apiTestingPage.stepperNextButton)
    await t.click(apiTestingPage.addReporterButton)
    await t.click(apiTestingPage.reporterSelect(0))
    await t.click(apiTestingPage.reporterKeyValue(0, 'PagerDuty'))
    await t.typeText(apiTestingPage.reporterInput(0), reporter)
    await t.click(apiTestingPage.monitorCreateButton)
    return true
  }

  public static async createADVHeadersReporterNR(testNameAdv: string, testUrl: string, advancedRequestValueInput: string, reporter: string): Promise<boolean> {
      await t.wait(WaitConfig.Waits.minWait)
      await t.click(apiTestingPage.sidebarCreateMonitorButton)
      await t.typeText(apiTestingPage.monitorNameInput, testNameAdv)
      await t.expect(apiTestingPage.stepperNextButton.exists).ok('Next not found', {timeout: WaitConfig.Waits.minWait})
      await t.click(apiTestingPage.stepperNextButton)
      await t.click(apiTestingPage.monitorAdvancedOption)
      await t.typeText(apiTestingPage.monitorAdvancedInputText, testUrl)
      await t.click(apiTestingPage.monitorAddHeaderButton)
      await t.click(apiTestingPage.advRequestHeaderField(0, 0))
      await t.click(apiTestingPage.advRequestHeaderKey(0, 0))
      await t.typeText(apiTestingPage.advRequestValueInput, advancedRequestValueInput)
      await t.click(apiTestingPage.stepperNextButton)
      await t.click(apiTestingPage.addReporterButton)
      await t.click(apiTestingPage.reporterSelect(0))
      await t.click(apiTestingPage.reporterKeyValue(0, 'NewRelic'))
      await t.typeText(apiTestingPage.reporterInput(0), reporter)
      await t.click(apiTestingPage.monitorCreateButton)
    return true
}

  public static async create(name: string,testUrl: string, suiteName: string): Promise<boolean> {

      await t.expect(apiTestingPage.monitorNameInput.exists).ok('Monitor name input not found', {timeout: WaitConfig.Waits.minWait})
      await t.typeText(apiTestingPage.monitorNameInput, name)
      await t.expect(apiTestingPage.stepperNextButton.exists).ok('Next not found', {timeout: WaitConfig.Waits.minWait})
      await t.click(apiTestingPage.stepperNextButton)
      await t.expect(apiTestingPage.endpointUrlInput.exists).ok('Endpoint URL input not found', {timeout: WaitConfig.Waits.minWait})
      await t.typeText(apiTestingPage.endpointUrlInput, testUrl)
      await t.expect(apiTestingPage.stepperNextButton.exists).ok('Next not found', {timeout: WaitConfig.Waits.minWait})
      await t.click(apiTestingPage.stepperNextButton)
      await t.expect(apiTestingPage.createMonitorButton.exists).ok('Create button not found', {timeout: WaitConfig.Waits.minWait})
      await t.click(apiTestingPage.createMonitorButton)
      await t.wait(WaitConfig.Waits.longShortWait)
      await t.expect(apiTestingPage.monitorSuiteCardContainer(suiteName).exists).ok('Suite Card not found', {timeout: WaitConfig.Waits.minWait})
      await t.click(apiTestingPage.monitorSuiteCardContainer(suiteName))
      await t.wait(WaitConfig.Waits.longShortWait)
      await t.expect(apiTestingPage.monitorNameHeader(suiteName).exists).ok('Suite Name not found', {timeout: WaitConfig.Waits.minWait})
      return true
  }

    public static async createADVHeaders(testNameAdv: string,testUrl:string,advancedRequestValueInput:string) : Promise <Boolean> {
      await t.wait(WaitConfig.Waits.minWait)
      await t.click(apiTestingPage.sidebarCreateMonitorButton)
      await t.typeText(apiTestingPage.monitorNameInput, testNameAdv)
      await t.expect(apiTestingPage.stepperNextButton.exists).ok('Next not found', {timeout: WaitConfig.Waits.minWait})
      await t.click(apiTestingPage.stepperNextButton)
      await t.click(apiTestingPage.monitorAdvancedOption)
      await t.typeText(apiTestingPage.monitorAdvancedInputText, testUrl)
      await t.click(apiTestingPage.monitorAddHeaderButton)
      await t.click(apiTestingPage.advRequestHeaderField(0, 0))
      await t.click(apiTestingPage.advRequestHeaderKey(0, 0))
      await t.typeText(apiTestingPage.advRequestValueInput, advancedRequestValueInput)
      await t.click(apiTestingPage.stepperNextButton)
      await t.click(apiTestingPage.monitorCreateButton)
      return true
    }
}
  

