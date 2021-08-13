import { t } from 'testcafe'
import { WaitConfig } from '../config/WaitConfig'
import { ApiTestingPage } from './bat/ApiTestingPage'



const apiTestingPage = new ApiTestingPage()


/**
 * Navigator is used to navigate to and from pages in bat.
 *
 */
export class MonitorSearcher {
  
  public static async search(testNameAdv:string): Promise<boolean>{
      await t.wait(WaitConfig.Waits.mediumBaseWait)
      await t.click(apiTestingPage.searchInput)
      await t.typeText(apiTestingPage.searchInput, testNameAdv)
      await t.wait(WaitConfig.Waits.minWait)
      await t.expect(apiTestingPage.monitorSearchValue(testNameAdv).exists).ok('Monitor found after search', {timeout: WaitConfig.Waits.minWait})
    return true
  } 
}
  

