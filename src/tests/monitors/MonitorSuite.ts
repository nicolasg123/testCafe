import { IBasicTest, TestMeta, TestMetaSeverity } from '../IBasicTest'
import { BatNavigator } from '../../pageobjects'
import { RequestLogger, t } from 'testcafe'
import { ConsoleOutput } from '../../config/ConsoleOutput'
import { TestCaseRunner } from '../../config/TestCaseRunner'
import { Suites } from '../../config/Suites'
import { TestUtils } from '../../utils/TestUtils'
import { MonitorLandingButtons } from '../../pageobjects/MonitorLandingButtons'
import { MonitorCreator } from '../../pageobjects/MonitorCreator'
import { TabsChecker } from '../../pageobjects/TabsChecker'
import { MonitorEditor } from '../../pageobjects/MonitorEditor'
import { Scheduler } from '../../pageobjects/Scheduler'
import { MonitorRunner } from '../../pageobjects/MonitorRunner'
import { MonitorHistory } from '../../pageobjects/MonitorHistory'
import { MonitorDeletion } from '../../pageobjects/MonitorDeletion'
import { MonitorSearcher } from '../../pageobjects/MonitorSearcher'

export class MonitorSuite implements IBasicTest {
  public meta: TestMeta = {
    ID: 'MonitorSuite',
    SEVERITY: TestMetaSeverity.blocker,
    STORY: 'MonitorSuite',
    TEST_RUN: 0,
    SAUCE_JOB: 'MonitorSuite',
  }

  /**
   * Runs the test
   */

  public async runTest(): Promise<any> {
    
    const id: string =  await TestUtils.makeId(20)
    const testNameAdv: string = `Adv${id}`.replace(/-/g, '')
    const testNameSchHourly: string = `SchHourly${id}`.replace(/-/g, '')
    const testName: string = `Test${id}`.replace(/-/g, '')
    const suiteName: string = testName
    const testUrl: string = 'http://www.google.com'
    const invalidCron: string = 'asdfasdfadsfads'
    const reporter:string = 'slack'
    const reporter2:string = 'pagerDutty'
    const reporter3:string = 'newRelic'
    const reporterSumoLogic:string = 'sl'
    const reporterEmailValue:string = 'bat.testing2019@gmail.com'
    const advancedRequestValueInput:string = '1'
    const reporterTypeMail:string = 'Email'
    const defaultVersion:string = '1.0.0'
    
    ConsoleOutput.startedTestGlobal(`Suite Name generated ${suiteName})`)
    ConsoleOutput.startedTestGlobal(`Suite Avd Name generated ${testNameAdv})`)
    
    await BatNavigator.loginAndGoToMonitoring()

    await this.testCaseRunner.when('Check Monitor Landing Buttons', async () => {
      await MonitorLandingButtons.checkButtons() 
    }).it('Landing Buttons are present')

    await this.testCaseRunner.when('I click the create button in the sidebar', async () => {
     await MonitorLandingButtons.checkSiderBar()
    }).it('it should open the create form')

    await this.testCaseRunner.when('I complete the form and hit create', async () => {
      await MonitorCreator.create(testName,testUrl,suiteName) 
    }).it('a new suite should be created')

    await this.testCaseRunner.when('TestTab Check', async () => {
      await TabsChecker.checkTestTab(suiteName,defaultVersion)   
    }).it('Test Tab section should end correctly')

    await this.testCaseRunner.when('Bar Area Graphic Check', async () => {
      await TabsChecker.checkBarArea(suiteName)   
      
    }).it('Test Tab bar area shuld end correctly')

    await this.testCaseRunner.when('ScheduleTab Button Check', async () => {
      await TabsChecker.ScheduleTabCheck(suiteName)
    }).it('Schedule Section should end correctly')

    await this.testCaseRunner.when('Monitored Endpoint Section Check', async () => {
      await TabsChecker.MonitoredEndpointsCheck()
    }).it('Monitored Endpoint Section should end correctly')

    await this.testCaseRunner.when('I click Edit Button', async () => {
     await MonitorEditor.edit(suiteName,defaultVersion)
    }).it('edit operation should end correctly')

    await this.testCaseRunner.when('Add Schedule - monitor name check', async () => {
      await Scheduler.add(suiteName,testName)
    }).it('Add Schedule Button and monitor value should end correctly')

    await this.testCaseRunner.when('Add Schedule - advance cron  - invalid check', async () => {
      await Scheduler.addAdvCron(suiteName,invalidCron)
      }).it('Add Schedule Button and invalid cron value should end correctly')

    await this.testCaseRunner.when('Add Schedule Button Check', async () => {
      await Scheduler.addButtonCheck(suiteName)
    }).it('Add Schedule Button should end correctly')

    await this.testCaseRunner.when('Delete Schedule Button Check', async () => {
       await Scheduler.deleteButtonCheck(suiteName)
    }).it('Delete Schedule Button should end correctly')

    await this.testCaseRunner.when('Click Run Now Button', async () => {
      await MonitorRunner.testsActionBarCheck()
    }).it('Run now should end correctly')

    await this.testCaseRunner.when('History Button Check', async () => {
      await MonitorHistory.buttonCheck(suiteName,defaultVersion)
    }).it('History Button Check')

    await this.testCaseRunner.when('I hit delete and confirm', async () => {
      await MonitorDeletion.deleteMonitor()
    }).it('the monitor should be deleted and redirected to landing')

    ConsoleOutput.startedTestGlobal(`Monitor to be created: ${testNameAdv}`)
    await this.testCaseRunner.when('I click the create button  / advanced  header ', async () => {
      await  MonitorCreator.createADVHeaders(testNameAdv,testUrl,advancedRequestValueInput)
    }).it('New Monitor with header should be created correctly')

    await this.testCaseRunner.when('I hit delete on Adv Monitor and Confirm', async () => {
      await MonitorDeletion.deleteMonitor()
    }).it('the monitor should be deleted and redirected to landing')

    ConsoleOutput.startedTestGlobal(`Monitor to be created: ${testNameAdv}`)
    await this.testCaseRunner.when('I click the create button  / advanced  header / reporter slack', async () => {
      await  MonitorCreator.createADVHeadersReporterSlack(testNameAdv,testUrl,advancedRequestValueInput,reporter)
    }).it('New Monitor with header should be created correctly')

    await this.testCaseRunner.when('I hit delete on Adv Monitor and Confirm', async () => {
      await MonitorDeletion.deleteMonitor()
    }).it('the monitor should be deleted and redirected to landing')

    await this.testCaseRunner.when('I click the create button  / advanced  header / reporter pd', async () => {
      await MonitorCreator.createADVHeadersReporterPD(testNameAdv,testUrl,advancedRequestValueInput,reporter2)
    }).it('New Monitor with header should be created correctly')

    await this.testCaseRunner.when('Perform monitor search', async () => {
      await MonitorSearcher.search(testNameAdv)
    }).it('Search ended correctly')  

    await this.testCaseRunner.when('I hit delete on Adv Monitor  pagger dutty and Confirm', async () => {
      await MonitorDeletion.deleteMonitor()
    }).it('the monitor should be deleted and redirected to landing')

    await this.testCaseRunner.when('I click the create button  / advanced  header / reporter new relic', async () => {
      await MonitorCreator.createADVHeadersReporterNR(testNameAdv,testUrl,advancedRequestValueInput,reporter3)
    }).it('the monitor should be deleted and redirected to landing')

    await this.testCaseRunner.when('I hit delete on Adv Monitor  pagger dutty and Confirm', async () => {
      await MonitorDeletion.deleteMonitor()
    }).it('the monitor should be deleted and redirected to landing')

    await this.testCaseRunner.when('I click the create button  / advanced  header / reporter sumo', async () => {
      await MonitorCreator.createADVHeadersReporterSL(testNameAdv,testUrl,advancedRequestValueInput,reporterSumoLogic)
    }).it('the monitor should be created with a sumologic reporter')

    await this.testCaseRunner.when('I hit delete on Adv Monitor  pagger dutty and Confirm', async () => {
      await MonitorDeletion.deleteMonitor()
    }).it('the monitor should be deleted and redirected to landing')

    await this.testCaseRunner.when('I click the create button  / advanced  header / reporter email', async () => {
      await MonitorCreator.createADVHeadersReporterEmail(testNameAdv,testUrl,advancedRequestValueInput,reporterTypeMail,reporterEmailValue)
    }).it('the monitor should be created with a email reporter')
    
    await this.testCaseRunner.when('I hit delete on Adv Monitor  pagger dutty and Confirm', async () => {
      await MonitorDeletion.deleteMonitor()
    }).it('the monitor should be deleted and redirected to landing')

    await this.testCaseRunner.when('create a monitor with schedule hourly - modify and check value', async () => {
       await MonitorCreator.createMonitorModifyScheduleHourly(testNameSchHourly,testUrl)
       await Scheduler.modifyScheduler()
    }).it('shedule hourly hour is correct')

    await this.testCaseRunner.when('I hit delete on Adv Monitor  pagger dutty and Confirm', async () => {
      await MonitorDeletion.deleteMonitor()
    }).it('the monitor should be deleted and redirected to landing')
   }

  consoleOutput: ConsoleOutput
  testCaseRunner: TestCaseRunner
  requestLogger: RequestLogger = RequestLogger()
}

const tn = new MonitorSuite()
Suites.runTest(tn)