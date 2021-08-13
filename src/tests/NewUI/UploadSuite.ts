import { RequestLogger, Selector, t } from 'testcafe'
import { ConsoleOutput } from '../../config/ConsoleOutput'
import { BatNavigator } from '../../pageobjects/BatNavigator'
import { Suites } from '../../config/Suites'
import { IBasicTest, TestMeta, TestMetaSeverity } from '../IBasicTest'
import { TestCaseRunner } from '../../config/TestCaseRunner'
import Upload from '../../pageobjects/Upload'
import { AnypointLandingPage } from '../../pageobjects/Github/AnypointLandingPage'


/**
 * Test used to just login with test cafe
 *
 */


const anypointLanding = new AnypointLandingPage()

export class UploadSuite implements IBasicTest {
  public meta: TestMeta = {
    ID: 'UploadSuite',
    SEVERITY: TestMetaSeverity.blocker,
    STORY: 'UploadSuite',
    TEST_RUN: 0,
    SAUCE_JOB: 'UploadSuite',
  }



  public async runTest(): Promise<any> {
    await this.testCaseRunner.when('Go to Upload Section', async () => {
      await BatNavigator.loginAndGoToMonitoringNewUI()
      await anypointLanding.goToAnypointFunctionalMonitoring()
      await Upload.performUpload()
    }).it('Upload section successfully loaded')

  }

  consoleOutput: ConsoleOutput
  testCaseRunner: TestCaseRunner
  requestLogger: RequestLogger = RequestLogger()

}

const tn = new UploadSuite()
Suites.runTest(tn)
