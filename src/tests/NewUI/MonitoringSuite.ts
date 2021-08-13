import { RequestLogger, t } from 'testcafe'
import { ConsoleOutput } from '../../config/ConsoleOutput'
import { BatNavigator } from '../../pageobjects/BatNavigator'
import { Suites } from '../../config/Suites'
import { IBasicTest, TestMeta, TestMetaSeverity } from '../IBasicTest'
import { TestCaseRunner } from '../../config/TestCaseRunner'
import { AnypointLandingPage } from '../../pageobjects/Github/AnypointLandingPage'
import { MonitoringLanding } from '../../pageobjects/MonitoringLanding'
import { SimpleMonitorCreator } from '../../pageobjects/SimpleMonitorCreator'
import { MonitorDetailPage } from '../../pageobjects/MonitorDetailPage'
import { TestUtils } from '../../utils/TestUtils'
import { MonitorExecutionDetailPage } from '../../pageobjects/MonitorExecutionDetailPage'
import { WaitConfig } from '../../config/WaitConfig'


/**
 * Test used to just login with test cafe
 *
 */

const anypointLanding = new AnypointLandingPage()

export class MonitoringSuite implements IBasicTest {
  
  public meta: TestMeta = {
    ID: 'MonitoringSuite',
    SEVERITY: TestMetaSeverity.blocker,
    STORY: 'MonitoringSuite',
    TEST_RUN: 0,
    SAUCE_JOB: 'MonitoringSuite',
  }
 
  public async runTest(): Promise<any> {

    const id: string =  await TestUtils.makeId(20)
    const testNameAdv: string = `Adv${id}`.replace(/-/g, '')
    //const monitorName = 'Simple' //there is an issue with the same name several times https://www.mulesoft.org/jira/browse/APITEST-1692
    const endpointURL = 'http://www.google.com'
    const testNameRep: string = `Rep${id}`.replace(/-/g, '')
    const testNameRep1: string = `Rep1${id}`.replace(/-/g, '')
    const testNameRep2: string = `Rep2${id}`.replace(/-/g, '')
    const bodyName: string = `RepBdy${id}`.replace(/-/g, '')
    const responseName : string = `RespName${id}`.replace(/-/g, '')
   
    await this.testCaseRunner.when('Select NEW UI - 20', async () => {
    await BatNavigator.loginAndGoToMonitoringNewUI()
    await anypointLanding.goToAnypointFunctionalMonitoring()
    }).it('UI 20 is available')
    
    await this.testCaseRunner.when('Create Simple Monitor', async () => {
      await SimpleMonitorCreator.create(testNameAdv,endpointURL)  
    }).it('Landing and actions should be Monitor Creation should end successfully')

    await this.testCaseRunner.when('Landing Afiter Monitor Creation', async () => {
      await MonitoringLanding.checkLanding()
    }).it('Landing and actions should be available')

    await this.testCaseRunner.when('Go to Monitor Detail Page', async () => {
        await MonitorDetailPage.checkLanding()
    }).it('Monitor detail page is loaded properly')

    await this.testCaseRunner.when('Go to Execution Detail Page', async () => {
      await MonitorExecutionDetailPage.checkLanding()
    }).it('Execution detail page should load properly')
    
    await this.testCaseRunner.when('hit back button', async () => {
      await MonitorExecutionDetailPage.returnToPreviousPage()
    }).it('user should go back to previos page')
    
    await this.testCaseRunner.when('hit back button', async () => {
      await MonitorDetailPage.backToMonitorSection()
    }).it('user should go back to monitor section')

    await this.testCaseRunner.when('delete monitor from landing', async () => {
      await MonitoringLanding.deleteMonitor(testNameAdv)
    }).it('delete should end sucessfully')

    await this.testCaseRunner.when('Create Simple Monitor', async () => {
      await SimpleMonitorCreator.create2(testNameAdv,endpointURL)  
    }).it('Landing and actions should be Monitor Creation should end successfully')

    await this.testCaseRunner.when('hit Run Now on landing', async () => {
      await MonitoringLanding.runNow(testNameAdv)
    }).it('Run now should end successfully')

    await this.testCaseRunner.when('hit Run now in Monitor Details', async () => {
      await MonitorDetailPage.runNow()
    }).it('Run Now end successfully')

    await this.testCaseRunner.when('Hit add Schedule Hourly', async () => {
      await MonitorDetailPage.addSchedule()
    }).it('Schedule should be added sucessfully')

    await this.testCaseRunner.when('Edit monitor and switch code editor', async () => {
      await MonitorDetailPage.backToMonitorSection()
      await MonitoringLanding.editCodeEditor(testNameAdv)
    }).it('edit/switch should end sucessfully')

    await this.testCaseRunner.when('edit monitor from landing', async () => {
      await MonitorDetailPage.backToMonitorSection()
      await MonitoringLanding.editMonitor(testNameAdv)
    }).it('edit should end sucessfully')

    await this.testCaseRunner.when('hit back button', async () => {
      await MonitorDetailPage.backToMonitorSection()
    }).it('user should go back to monitor section')

    await this.testCaseRunner.when('hit download option', async () => {
      await MonitorDetailPage.DownloadMonitor()
      await t.wait(WaitConfig.Waits.minWait)
      const response = await MonitorDetailPage.folderHasZipFile(testNameAdv)
      if (!response) {
          throw Error ("Test Failed - no file found")
      }
    }).it('Download option is selected successfully')

    await this.testCaseRunner.when('hit back button', async () => {
      await MonitorDetailPage.backToMonitorSection()
    }).it('user should go back to monitor section')

    await this.testCaseRunner.when('hit clone button', async () => {
      await MonitoringLanding.copy(testNameAdv)
    }).it('monitor should be cloned successfully')

    await this.testCaseRunner.when('go to manage locations', async () => {
      await MonitoringLanding.manageLocations()
    }).it('Manage Locations is loaded sucessfully')

    await this.testCaseRunner.when('Create monitor with reporters', async () => {
      await MonitoringLanding.createMonitorReporters(testNameRep,endpointURL,'Slack','webhook')
    }).it('New monitor with reporter slack added')

    await this.testCaseRunner.when('Create monitor with reporters', async () => {
      await MonitoringLanding.createMonitorReporters(testNameRep1,endpointURL,'PagerDuty','Routing key')
    }).it('New monitor with reporter pd added')

    await this.testCaseRunner.when('Create monitor with reporters', async () => {
      await MonitoringLanding.createMonitorReporters(testNameRep2,endpointURL,'NewRelic','License key')
    }).it('New monitor with reporter nr added')

    await this.testCaseRunner.when('Create new Schedule', async () => {
      await MonitorDetailPage.addAdvSchedule()
    }).it('New Schedule every 15 minutes')

    await this.testCaseRunner.when('hit back button', async () => {
      await MonitorDetailPage.backToMonitorSection()
    }).it('user should go back to monitor section')

    await this.testCaseRunner.when('Create new monitor', async () => {
      await MonitoringLanding.addMonitorWithBodyAssertion(bodyName,endpointURL,'Response body','body','assertion')
      await MonitorDetailPage.checkAssertionsSection(bodyName)
    }).it('with body assertion that fails')

    await this.testCaseRunner.when('Create new monitor', async () => {
      await MonitoringLanding.addMonitorWithResponseHeader(responseName,endpointURL,'Response header','headers','assertion')
    }).it('with response header assertion that fails')
    
  }

  consoleOutput: ConsoleOutput
  testCaseRunner: TestCaseRunner
  requestLogger: RequestLogger = RequestLogger()

}

const tn = new MonitoringSuite()
Suites.runTest(tn)
