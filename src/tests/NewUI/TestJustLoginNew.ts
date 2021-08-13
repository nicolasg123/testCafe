import { RequestLogger, Selector, t } from 'testcafe'
import { ConsoleOutput } from '../../config/ConsoleOutput'
import { BatNavigator } from '../../pageobjects/BatNavigator'
import { Suites } from '../../config/Suites'
import { IBasicTest, TestMeta, TestMetaSeverity } from '../IBasicTest'
import { TestCaseRunner } from '../../config/TestCaseRunner'
import { ApiTestingPage } from '../../pageobjects/bat/ApiTestingPage'


/**
 * Test used to just login with test cafe
 *
 */

const apitestingPage = new ApiTestingPage();

export class TestJustLoginNew implements IBasicTest {
  public meta: TestMeta = {
    ID: 'JustLoginNew',
    SEVERITY: TestMetaSeverity.blocker,
    STORY: 'JustLoginNew',
    TEST_RUN: 0,
    SAUCE_JOB: 'JustLoginNew',
  }


  public async runTest(): Promise<any> {
  await this.testCaseRunner.when('login on New UI', async () => {
    await BatNavigator.loginAndGoToMonitoringNewUI()
  }).it('login new successfully')
  }

  consoleOutput: ConsoleOutput
  testCaseRunner: TestCaseRunner
  requestLogger: RequestLogger = RequestLogger()

}

const tn = new TestJustLoginNew()
Suites.runTest(tn)
