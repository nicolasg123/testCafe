import { IBasicTest, TestMeta, TestMetaSeverity } from '../IBasicTest'
import { GitHub } from '../../pageobjects'
import { RequestLogger, Selector, t } from 'testcafe'
import { ConsoleOutput } from '../../config/ConsoleOutput'
import { TestCaseRunner } from '../../config/TestCaseRunner'
import { Suites } from '../../config/Suites'
import { ApiTestingPage } from '../../pageobjects/Github/ApiTestingPage'
import { Locations } from '../../pageobjects/Locations'


const apitestingPage = new ApiTestingPage()


export class Tests implements IBasicTest {
  public meta: TestMeta = {
    ID: 'Test',
    SEVERITY: TestMetaSeverity.blocker,
    STORY: 'Login',
    TEST_RUN: 0,
    SAUCE_JOB: 'Login',
  }

  /**
   * Runs the test
   */

  public async runTest(): Promise<any> {
      await this.testCaseRunner.when('GitHubLogin', async () => {
      await GitHub.login()
      }).it('logged SucessFull')

      await this.testCaseRunner.when('Create private Location ', async () => {
        await Locations.createLocations(locationName)    
    }).it('Location should be created correctly')

    await this.testCaseRunner.when('Delete location', async () => {  
      await Locations.DeleteLocation()    
    }).it('Location should be removed correctly')
  }

  consoleOutput: ConsoleOutput
  testCaseRunner: TestCaseRunner
  requestLogger: RequestLogger = RequestLogger()
}

const tn = new Tests()
Suites.runTest(tn)
