import { RequestLogger, Selector, t } from 'testcafe'
import { ConsoleOutput } from '../../config/ConsoleOutput'
import { BatNavigator } from '../../pageobjects/GitHub'
import { Suites } from '../../config/Suites'
import { IBasicTest, TestMeta, TestMetaSeverity } from '../IBasicTest'
import { TestCaseRunner } from '../../config/TestCaseRunner'
import { AFMLanding } from '../../pageobjects/AFMLanding'
import { ApiTestingPage } from '../../pageobjects/Github/ApiTestingPage'


/**
 * Test used to just login with test cafe
 *
 */

const apitestingPage = new ApiTestingPage();

export class LandingSuite implements IBasicTest {
  public meta: TestMeta = {
    ID: 'LandingSuite',
    SEVERITY: TestMetaSeverity.blocker,
    STORY: 'LandingSuite',
    TEST_RUN: 0,
    SAUCE_JOB: 'LandingSuite',
  }


  public async runTest(): Promise<any> { 
    await this.testCaseRunner.when('got not monitoring UI landing', async () => {
      await BatNavigator.loginAndGoToMonitoringNewUI()
    }).it('the monitor should be deleted and redirected to landing')
    
    await this.testCaseRunner.when('Check Landing', async () => {
      await AFMLanding.checkLandingPage()
    }).it(' Landing successfully checked')
  }

  consoleOutput: ConsoleOutput
  testCaseRunner: TestCaseRunner
  requestLogger: RequestLogger = RequestLogger()

}

const tn = new LandingSuite()
Suites.runTest(tn)
