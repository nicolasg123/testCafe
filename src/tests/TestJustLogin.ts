import { RequestLogger, Selector, t } from 'testcafe'
import { ConsoleOutput } from '../config/ConsoleOutput'
import { BatNavigator } from '../pageobjects/BatNavigator'
import { Suites } from '../config/Suites'
import { IBasicTest, TestMeta, TestMetaSeverity } from './IBasicTest'
import { TestCaseRunner } from '../config/TestCaseRunner'
import { WaitConfig } from '../config/WaitConfig'
import { ApiTestingPage } from '../pageobjects/Github/ApiTestingPage'

/**
 * Test used to just login with test cafe
 *
 */

const apiTestingPage = new ApiTestingPage();

export class TestJustLogin implements IBasicTest {
  public meta: TestMeta = {
    ID: 'JustLogin',
    SEVERITY: TestMetaSeverity.blocker,
    STORY: 'JustLogin',
    TEST_RUN: 0,
    SAUCE_JOB: 'JustLogin',
  }


  public async runTest(): Promise<any> {

    await BatNavigator.loginAndGoToMonitoring()
    await t.expect(apiTestingPage.functionalMonitoringLi.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    await t.click(apiTestingPage.functionalMonitoringLi)
    await t.wait(WaitConfig.Waits.shortWait)
    await t.switchToIframe(apiTestingPage.functionalMonitoringIframe)
    await t.wait(WaitConfig.Waits.second)
    await t.expect(apiTestingPage.messageScheduleTests.exists).ok("Wrong landing message or outdated test", {timeout: WaitConfig.Waits.minWait})
    await t.expect(apiTestingPage.messageMonitorYourPublic.exists).ok("Wrong landing message or outdated test", {timeout: WaitConfig.Waits.minWait})
  }

  consoleOutput: ConsoleOutput
  testCaseRunner: TestCaseRunner
  requestLogger: RequestLogger = RequestLogger()

}

const tn = new TestJustLogin()
Suites.runTest(tn)
