import { IBasicTest, TestMeta, TestMetaSeverity } from '../IBasicTest'
import { GitHub } from '../../pageobjects'
import { RequestLogger, Selector, t } from 'testcafe'
import { ConsoleOutput } from '../../config/ConsoleOutput'
import { TestCaseRunner } from '../../config/TestCaseRunner'
import { Suites } from '../../config/Suites'




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

      await this.testCaseRunner.when('GitHubRepo creation', async () => {
        await GitHub.createRepo();
       }).it('Creation Successfull')

        await this.testCaseRunner.when('profile edition', async () => {
          await GitHub.profileEdit();
        }).it('edition done')    
        
        await this.testCaseRunner.when('GitHubRepo Watch', async () => {
          await GitHub.repoWatch();
         }).it('Creation Watch')
  
  }

  consoleOutput: ConsoleOutput
  testCaseRunner: TestCaseRunner
  requestLogger: RequestLogger = RequestLogger()
}

const tn = new Tests()
Suites.runTest(tn)
